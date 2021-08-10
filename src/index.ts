import webdriver from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import appRoot from 'app-root-path'
import path from 'path'
import BaiduController from './controllers/baidu.controller'
import { BaseController } from './controllers/base.controller'

const main = async () => {
  // download site: https://chromedriver.chromium.org/downloads
  const driverPath = path.join(appRoot.path, 'chromedriver.exe')

  const options = new chrome.Options()
  options.excludeSwitches('enable-automation')

  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(options)
    .setChromeService(new chrome.ServiceBuilder(driverPath))
    .build()

  const controllers: BaseController[] = [new BaiduController(driver)]

  for (let controller of controllers) {
    await controller.action()
  }

  driver.close()
}

main()
