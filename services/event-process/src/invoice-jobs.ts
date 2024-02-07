import { db } from '../utils/db'
import { uploadFilesToS3 } from '../../../packages/helpers/src/s3'
import { InvoiceGenerateMedia } from '../../../packages/generate-media/src/index'

export class InvoiceJobsProcessor {
  static async processInvoiceDataToMedia(value: any) {
    const payload = value.data ?? null
    if (!payload || !payload?.id || !payload?.invoiceNumber) {
      return
    }
    const bufferImage = await InvoiceGenerateMedia.generateImage({
      ...payload,
      customerInfo: payload?.customerInfo
        ? JSON.parse(String(payload?.customerInfo))
        : null // Todo: customerInfo type will change later
    })

    const fileUrl = await uploadFilesToS3(
      'ence-invoice',
      `INV-${payload?.invoiceNumber}`,
      bufferImage
    )
    if (fileUrl) {
      await db.invoiceRelatedDocument.create({
        data: {
          documentLink: fileUrl,
          name: 'MAIN_IMAGE',
          invoiceId: payload?.id
        }
      })
    }
  }

  static async processSendInvoiceToWhatsapp(value: any) {}

  static async processSendInvoiceLinkOnWhatsapp(value: any) {}
}
