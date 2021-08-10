import webdriver, { By, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import fs from 'fs'

const driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .setChromeOptions(new chrome.Options().excludeSwitches('enable-automation'))
  .setChromeService(new chrome.ServiceBuilder("D:\\app\\chromedriver_win32\\chromedriver.exe"))
  .build()

const test = async () => {
  driver.get('https://www.baidu.com')
  const kw = driver.findElement(By.id('kw'))
  const su = driver.findElement(By.id('su'))
  await kw.sendKeys('Java')
  await getScreenshot('baidu_home_01.jpg', driver)
  await su.click()
  await driver.wait(until.elementLocated(By.id('content_left')))
  await getScreenshot('baidu_home_02.jpg', driver)

  driver.close()
}

const getScreenshot = async (filePath: string, driver: webdriver.ThenableWebDriver) => {
  const base64 = await driver.takeScreenshot()
  const buffer = Buffer.from(base64, 'base64')
  fs.writeFileSync(filePath, buffer)
}

test()

