import { By, Key } from 'selenium-webdriver'
import { getScreenshot } from '../utils/screenshot.util'
import { BaseCase } from './base.case'

export class GoogleCase extends BaseCase {
  public async run(): Promise<void> {
    this.driver.get('https://www.google.co.jp/?gws_rd=ssl')
    const searchInput = await this.driver.findElement(
      By.xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input')
    )
    const keyword = 'selenium'
    const dir = 'Google'
    await searchInput.sendKeys(keyword)
    await getScreenshot(dir, '01_search', this.driver)

    await searchInput.sendKeys(Key.ENTER)
    await this.driver.sleep(1000)
    await getScreenshot(dir, '02_result', this.driver)
  }
}
