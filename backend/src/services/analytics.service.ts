import mongoose, { PipelineStage, Types } from "mongoose";
import FileModel from "../models/file.model";
import StorageModel from "../models/storage.model";
import { formatBytes } from "../utils/format-byte";

export const getUserAnalyticsWithChartService = async (
  userId: string,
  filter: {
    dateFrom?: Date;
    dateTo?: Date;
  }
) => {
  const { dateFrom, dateTo } = filter;
  const pipline: PipelineStage[] = [
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        ...(dateFrom && { createdAt: { $gte: dateFrom } }),
        ...(dateTo && { createdAt: { $lte: dateTo } }),
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        uploadedFiles: { $sum: 1 },
        usages: {
          $sum: {
            $ifNull: ["$size", 0],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        uploadedFiles: 1,
        usages: 1,
      },
    },
    {
      $facet: {
        chartData: [
          {
            $project: {
              date: 1,
              uploadedFiles: 1,
              usages: 1,
            },
          },
        ],

        totals: [
          {
            $group: {
              _id: null,
              totaluploadFilesForPeriod: { $sum: "$uploadedFiles" },
              totalUsageForPeriod: { $sum: "$usages" },
            },
          },
        ],
      },
    },

    {
      $project: {
        _id: 0,
        chartData: 1,
        totaluploadFilesForPeriod: {
          $ifNull: [
            {
              $arrayElemAt: ["$totals.totaluploadFilesForPeriod", 0],
            },
            0,
          ],
        },
        totalUsageForPeriod: {
          $ifNull: [
            {
              $arrayElemAt: ["$totals.totalUsageForPeriod", 0],
            },
            0,
          ],
        },
      },
    },
  ];

  const result = await FileModel.aggregate(pipline);
  const [
    {
      chartData = [],
      totaluploadFilesForPeriod = 0,
      totalUsageForPeriod = 0,
    } = {},
  ] = result;

  const formattedChartData = chartData?.map(
    (item: { date: string; uploadedFiles: number; usages: number }) => ({
      ...item,
      usages: item.usages,
      formattedUsages: formatBytes(item.usages),
    })
  );

  const storageMetrics = await StorageModel.getStorageMetrics(
    new Types.ObjectId(userId)
  );

  return {
    chart: formattedChartData,
    totaluploadFilesForPeriod,
    totalUsageForPeriod: formatBytes(totalUsageForPeriod),

    storageUsageSummary: {
      totalUsage: storageMetrics.usage,
      quota: storageMetrics.quota,
      formattedTotalUsage: formatBytes(storageMetrics.usage),
      formattedQuota: formatBytes(storageMetrics.quota),
    },
  };
};
