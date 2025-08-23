import crypto from "crypto";

export const KEY_TYPE = {
  LIVE: "live",
} as const;

export type KeyType = (typeof KEY_TYPE)[keyof typeof KEY_TYPE];

export function generateAPIKey(type: KeyType = KEY_TYPE.LIVE) {
  const secret = crypto.randomBytes(24).toString("hex");

  const rawKey = `sk_${type}_${secret}`;
  const displayKey = `sk_${type}_${secret.slice(0, 4)}...`;

  const hashedKey = crypto.createHash("sha256").update(rawKey).digest("hex");

  return {
    rawKey,
    hashedKey,
    displayKey,
  };
}
