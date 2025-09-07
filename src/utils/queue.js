import { generatePDFFromHTML } from 'src/utils/pdf'
import { uploadFileToS3 } from 'src/utils/s3'

export const initiateProcessingForGeneratingPDF = async (params) => {
  try {
    const { html } = params || {}

    if (!html) {
      console.log('🚀 [PDF-GENERATOR] No HTML content provided ✨')
      return false
    }

    console.log('🚀 [PDF-GENERATOR] Converting HTML to PDF... ✨')

    const pdf = await generatePDFFromHTML(html)

    if (!pdf?.byteLength) {
      console.log('🚀 [PDF-GENERATOR] No PDF buffer generated ✨')
      return false
    }

    console.log('🚀 [PDF-GENERATOR] PDF buffer generated successfully. ✨')

    const fileKey = `files/pdf/${new Date().toLocaleDateString('en-CA')}-${new Date().getTime()}.pdf`

    console.log(`🚀 [PDF-GENERATOR] Uploading PDF to AWS S3 at ${fileKey}... ✨`)

    const response = await uploadFileToS3(pdf, fileKey)
    if (!response?.success) {
      console.log('🚀 [PDF-GENERATOR] Failed to upload file to AWS S3 ✨')
      return false
    }

    console.log(`🚀 [PDF-GENERATOR] File uploaded to AWS S3 successfully at ${fileKey}. ✨`)

    return true
  } catch (err) {
    console.error('❌ [PDF-GENERATOR] Error happened in initiateProcessingForGeneratingPDF 💥', err)
    throw err
  }
}
