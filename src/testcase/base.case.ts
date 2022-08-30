import webdriver from 'selenium-webdriver'

export abstract class BaseCase {
  protected driver: webdriver.ThenableWebDriver

  constructor(driver: webdriver.ThenableWebDriver) {
    this.driver = driver
  }

  public abstract run(): Promise<void>
}
