import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"
import crypto from "crypto"
import sharp from "sharp"
import { r2 } from "./r2"

export async function uploadImageToR2(buffer: Buffer) {
  // ضغط وتحويل WebP
  const optimized = await sharp(buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  // إنشاء Hash
  const hash = crypto.createHash("sha1").update(optimized).digest("hex")
  const key = `posts/${hash}.webp`

  // تحقق لو الملف موجود
  try {
    await r2.send(
      new HeadObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
      })
    )

    return `${process.env.R2_PUBLIC_URL}/${key}`
  } catch {}

  // رفع لو غير موجود
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: optimized,
      ContentType: "image/webp",
    })
  )

  return `${process.env.R2_PUBLIC_URL}/${key}`
}
