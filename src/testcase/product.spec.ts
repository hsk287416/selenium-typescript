import webdriver from 'selenium-webdriver'
import { By, until } from 'selenium-webdriver'
import { getScreenshot } from '../utils/screenshot.util'
import { initWebDriver } from '../utils/driver.util'

describe('Product', () => {
  let driver: webdriver.ThenableWebDriver

  beforeEach(() => {
    driver = initWebDriver()
  })

  test('商品一覧_全部', async () => {
    // 1. 商品一覧に遷移する
    driver.get('http://localhost:3000/product')
    await driver.wait(until.elementLocated(By.className('el-table__row')))

    // 2. 商品コードG0001～G0010の商品を表示されることを確認する
    const rows = await driver.findElements(
      By.xpath('//*[@id="__layout"]/div/div[2]/div/div/div[3]/div[3]/table/tbody/tr')
    )
    expect(rows.length).toBe(10)

    // 3. 商品一覧のスクリーンショットを撮る

    await getScreenshotFromProductList(driver, 'Product\\商品一覧_全部', '01_商品一覧_scroll_')
  })

  test('商品一覧_商品分類_花', async () => {
    const dir = 'Product\\商品一覧_商品分類_花'
    // 1. 商品一覧に遷移する
    driver.get('http://localhost:3000/product')
    await driver.wait(until.elementLocated(By.className('el-table__row')))
    await getScreenshot(dir, '01_初期画面', driver)

    // 2. 商品分類のプルダウンリストから「花」を選択する
    const select = await driver.findElement(
      By.xpath('//*[@id="__layout"]/div/div[2]/div/div/form/div[2]/div/div/div')
    )
    select.click()
    await driver.sleep(500)
    await getScreenshot(dir, '02_商品分類プルダウンリスト', driver)
    const hanaItem = await driver.findElement(By.xpath('/html/body/div[2]/div[1]/div[1]/ul/li[2]'))
    await hanaItem.click()
    await driver.sleep(500)
    await getScreenshot(dir, '03_花を選択', driver)
    const searchBtn = await driver.findElement(By.id('select'))
    await searchBtn.click()
    await driver.sleep(2000)
    const rows = await driver.findElements(
      By.xpath('//*[@id="__layout"]/div/div[2]/div/div/div[3]/div[3]/table/tbody/tr')
    )
    expect(rows.length).toBe(4)

    // 3. 商品一覧のスクリーンショットを撮る
    await getScreenshot(dir, '04_商品一覧', driver)
  })

  test('商品作成＆削除', async () => {
    const dir = 'Product\\商品一覧_商品分類_花'
    const goodCd = 'G0011'
    const goodName = 'G0011_名前'
    const goodNotes = 'G0011_商品説明'
    const goodPrice = 1234

    driver.get('http://localhost:3000/product')
    await driver.wait(until.elementLocated(By.className('el-table__row')))
    await getScreenshot(dir, '01_初期画面', driver)

    let goodCdInput = await driver.findElement(By.id('goodCd'))
    await goodCdInput.sendKeys(goodCd)
    await getScreenshot(dir, '02_商品コード入力', driver)
    const searchBtn = await driver.findElement(By.id('select'))
    await searchBtn.click()
    await driver.sleep(1000)
    await getScreenshot(dir, '03_検索結果', driver)

    let newBtn = await driver.findElement(
      By.xpath('//*[@id="__layout"]/div/div[2]/div/div/form/div[5]/div/a')
    )
    newBtn.click()
    await driver.wait(until.elementLocated(By.className('avatar-uploader')))
    await getScreenshot(dir, '04_新規ボタン押下して画面遷移', driver)

    goodCdInput = await driver.findElement(By.id('goodCd'))
    goodCdInput.sendKeys(goodCd)
    let goodClassSelect = await driver.findElement(By.id('goodClass'))
    goodClassSelect.click()
    await driver.sleep(200)
    let hanaItem = await driver.findElement(By.xpath('/html/body/div[2]/div[1]/div[1]/ul/li[1]'))
    hanaItem.click()
    await driver.sleep(200)
    let goodNameInput = await driver.findElement(By.id('goodName'))
    goodNameInput.sendKeys(goodName)
    let goodNotesInput = await driver.findElement(By.id('goodNotes'))
    goodNotesInput.sendKeys(goodNotes)
    let goodPriceInput = await driver.findElement(By.id('goodPrice'))
    goodPriceInput.sendKeys(goodPrice)
    let pictureInput = await driver.findElement(By.className('el-upload__input'))
    pictureInput.sendKeys('C:\\Users\\HUSHUKANG\\Desktop\\data\\imgs\\G0003.jpg')
    await driver.sleep(1000)

    await driver.executeScript(`window.scrollTo(0, 0)`)
    await driver.sleep(200)
    await getScreenshot(dir, '05_値入力_1', driver)
    await driver.executeScript(`window.scrollTo(0, 300)`)
    await driver.sleep(200)
    await getScreenshot(dir, '05_値入力_2', driver)

    newBtn = await driver.findElement(By.className('el-button--primary'))
    newBtn.click()
    await driver.wait(until.elementLocated(By.className('el-table__row')))
    await getScreenshot(dir, '06_新規登録ボタンを押下して商品挿入', driver)

    let deleteBtn = await driver.findElement(
      By.xpath(
        '//*[@id="__layout"]/div/div[2]/div/div/div[3]/div[5]/div[2]/table/tbody/tr/td[5]/div/button[3]/span'
      )
    )
    await deleteBtn.click()
    await driver.sleep(1000)
    await getScreenshot(dir, '07_削除確認', driver)

    let confirmBtn = await driver.findElement(By.xpath('/html/body/div[2]/div/div[3]/button[2]'))
    await confirmBtn.click()
    await driver.sleep(1000)
    await getScreenshot(dir, '08_削除結果', driver)
  })

  afterEach(() => {
    driver.close()
  })
})

const getScreenshotFromProductList = async (
  driver: webdriver.ThenableWebDriver,
  dir: string,
  fileName: string
) => {
  const { scrollHeight, height } = await driver.executeScript(`
    const tableWrapper = document.getElementsByClassName('el-table__body-wrapper')[0];
    return {
      scrollHeight: tableWrapper.scrollHeight,
      height: Number.parseInt(tableWrapper.style.height)
    };
  `)
  let imgIndex = 1
  let residueHeight = 0
  while (residueHeight <= scrollHeight) {
    await driver.executeScript(`
      const tableWrapper = document.getElementsByClassName('el-table__body-wrapper')[0];
      tableWrapper.scrollTop = ${residueHeight}
    `)
    await driver.sleep(500)
    await getScreenshot(dir, `${fileName}${imgIndex++}`, driver)
    residueHeight = residueHeight + height
  }
}
