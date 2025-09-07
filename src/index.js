import { head } from 'lodash'

import { initiateProcessingForGeneratingPDF } from 'src/utils/queue'

export const handler = async (event, context, callback) => {
  try {
    console.log('🚀 [PDF-GENERATOR] Lambda process is started with event ✨', event)

    const body = JSON.parse(head(event?.Records)?.body || '{}')

    return initiateProcessingForGeneratingPDF(body)
  } catch (error) {
    console.error('❌ [PDF-GENERATOR] Error happened in handler 💥', error)
  } finally {
    callback(null, 'Lambda process is completed')
  }
}
