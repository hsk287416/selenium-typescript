import { By, until } from 'selenium-webdriver'
import { getScreenshot } from '../utils/screenshot.util'
import { BaseController } from './base.controller'

/**
 * 商品一覧　テスト
 */
export default class ProductController extends BaseController {
  async action(): Promise<void> {
    // 1. 商品一覧に遷移する
    this.driver.get('http://localhost:3000/product')
    await this.driver.wait(until.elementLocated(By.className('el-table__row')))

    // 2. 商品コードG0001～G0010の商品を表示されることを確認する
    const rows = await this.driver.findElements(By.className('el-table__row'))

    const kw = this.driver.findElement(By.id('kw'))
    const su = this.driver.findElement(By.id('su'))
    await kw.sendKeys('Java')
    await getScreenshot('baidu', 'baidu_home_01', this.driver)
    await su.click()
    await getScreenshot('baidu', 'baidu_home_02', this.driver)
  }
}
