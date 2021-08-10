import webdriver from 'selenium-webdriver'

export abstract class BaseController {
  protected driver: webdriver.ThenableWebDriver

  constructor(driver: webdriver.ThenableWebDriver) {
    this.driver = driver
  }

  abstract action(): Promise<void>
}
