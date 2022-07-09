import puppeteer from 'puppeteer'

export async function generatePdfFromUrl(url: string) {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/bin/google-chrome',
    })
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
  } catch (error) {
    console.error(error)
  }
}
