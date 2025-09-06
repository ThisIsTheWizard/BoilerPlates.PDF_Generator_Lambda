import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

export const generatePDFFromHTML = async (htmlContent) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath('/opt/node_modules/@sparticuz/chromium/bin'),
    headless: chromium.headless
  })

  const page = await browser.newPage()
  await page.setContent(htmlContent)

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true
  })

  await browser.close()

  return pdfBuffer
}
