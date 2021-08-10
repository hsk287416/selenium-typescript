import webdriver, { By, until } from 'selenium-webdriver'
import fs from 'fs'
import appRoot from 'app-root-path'
import path from 'path'
import mkdirp from 'mkdirp'

export const getScreenshot = async (dir: string, fileName: string, driver: webdriver.ThenableWebDriver) => {
  const directory = path.join(appRoot.path, 'images', dir)
  mkdirp.nativeSync(directory)
  const filePath = path.join(appRoot.path, 'images', dir, fileName + '.jpg')
  const base64 = await driver.takeScreenshot()
  const buffer = Buffer.from(base64, 'base64')
  fs.writeFileSync(filePath, buffer)
}
