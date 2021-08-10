import { By, until } from 'selenium-webdriver'
import { getScreenshot } from '../utils/screenshot.util'
import { BaseController } from './base.controller'

export default class BaiduController extends BaseController {
  async action(): Promise<void> {
    this.driver.get('https://www.baidu.com')
    const kw = this.driver.findElement(By.id('kw'))
    const su = this.driver.findElement(By.id('su'))
    await kw.sendKeys('Java')
    await getScreenshot('baidu', 'baidu_home_01', this.driver)
    await su.click()
    await this.driver.wait(until.elementLocated(By.id('content_left')))
    await getScreenshot('baidu', 'baidu_home_02', this.driver)
  }
}
