export async function generatePdfFromUrl(url: string) {
  let browser

  if (process.env.NODE_ENV !== 'production') {
    const puppeteer = require('puppeteer')

    browser = await puppeteer.launch()
  } else {
    const chromium = require('chrome-aws-lambda')

    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })
  }

  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'networkidle0' })

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen')

  // Get just article from page
  const element = await page.$('[data-article]')
  await page.evaluate((el) => {
    document.body.innerHTML = `
    <div>
      ${el.outerHTML}
    </div>
  `
  }, element)

  const pdf = await page.pdf({
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  // Close the browser instance
  await browser.close()

  return pdf
}
