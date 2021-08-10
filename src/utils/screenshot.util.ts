import webdriver from 'selenium-webdriver'
import fs from 'fs'
import appRoot from 'app-root-path'
import path from 'path'
import mkdirp from 'mkdirp'

/**
 * スクリーンショットを撮る
 *
 * @param dir 格納フォルダ
 * @param fileName イメージファイル名（拡張子省略）
 * @param driver WebDriver
 */
export const getScreenshot = async (dir: string, fileName: string, driver: webdriver.ThenableWebDriver) => {
  const directory = path.join(appRoot.path, 'images', dir)
  mkdirp.nativeSync(directory)
  const filePath = path.join(directory, fileName + '.jpg')
  const base64 = await driver.takeScreenshot()
  const buffer = Buffer.from(base64, 'base64')
  fs.writeFileSync(filePath, buffer)
}
