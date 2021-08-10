import webdriver, { By, until } from 'selenium-webdriver'
import { getScreenshot } from '../utils/screenshot.util'

export const action = async (driver: webdriver.ThenableWebDriver) => {
  driver.get('https://www.baidu.com')
  const kw = driver.findElement(By.id('kw'))
  const su = driver.findElement(By.id('su'))
  await kw.sendKeys('Java')
  await getScreenshot('baidu', 'baidu_home_01', driver)
  await su.click()
  await driver.wait(until.elementLocated(By.id('content_left')))
  await getScreenshot('baidu', 'baidu_home_02', driver)
}
