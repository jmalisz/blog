import { S3, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const BUCKET_NAME = 'blog-bucket'
const ENDPOINT = 'https://gateway.storjshare.io'
const REGION = 'eu1'

const s3 = new S3({
  endpoint: ENDPOINT,
  region: REGION,
  credentials: {
    accessKeyId: process.env.STORJ_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORJ_BUCKET_ACCESS_KEY_SECRET,
  },
})

interface createTemporaryFileDownloadProps {
  file: Buffer
  fileName: string
  contentType?: string
  contentDisposition?: string
}

export async function createTemporaryFileDownload({
  file,
  fileName,
  contentType,
  contentDisposition,
}: createTemporaryFileDownloadProps) {
  await s3.putObject({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ContentDisposition: contentDisposition,
    Metadata: {
      'Storj-Expires': '+10m',
    },
  })

  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: fileName })
  const url = await getSignedUrl(s3, command, { expiresIn: 10 * 60 })

  return url
}
