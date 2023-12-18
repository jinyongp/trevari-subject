import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://api.itbook.store/1.0/search/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        error: "0",
        page: "1",
        books: [
          {
            title: "Mongo Title 1",
            subtitle: "Mongo Subtitle 1",
            isbn13: "9781449344689",
            price: "$10.10",
            image: "https://itbook.store/img/books/123.png",
            url: "https://itbook.store/books/123",
          },
          {
            title: "Mongo Title 2",
            subtitle: "Mongo Subtitle 2",
            isbn13: "456",
            price: "$20.20",
            image: "https://itbook.store/img/books/456.png",
            url: "https://itbook.store/books/456",
          },
        ],
      }),
    }),
  );

  await page.route("https://api.itbook.store/1.0/books/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        error: "0",
        title: "MongoDB Title",
        subtitle: "MongoDB Subtitle",
        authors: "Author 1, Author 2",
        publisher: "Publisher",
        isbn10: "1234567890",
        isbn13: "1234567890123",
        pages: "123",
        year: "2021",
        rating: "4",
        desc: "Description",
        price: "$30.30",
        image: "https://itbook.store/img/books/1234567890123.png",
        url: "https://itbook.store/books/1234567890123",
      }),
    }),
  );

  await page.goto("/");
});

test("사용자가 검색창을 통해 키워드를 입력할 수 있는지 확인합니다.", async ({ page }) => {
  await page.locator("#pw-search").pressSequentially("mongodb");
  await page.locator("#pw-search").press("Enter");
});

test("입력한 키워드에 대응하는 결과를 불러와 표시하는지 확인합니다.", async ({ page }) => {
  await page.fill("#pw-search", "mongodb");
  await page.click("#pw-search-submit-button");
  const result = await page.waitForSelector("#pw-search-result");
  expect(await result.$$(".pw-card")).toHaveLength(2);

  const innerText = await result.innerText();
  expect(innerText).toContain("Mongo Title 1");
  expect(innerText).toContain("Mongo Subtitle 1");
  expect(innerText).toContain("Mongo Title 2");
  expect(innerText).toContain("Mongo Subtitle 2");
});

test("입력한 키워드에 대응하는 결과가 없을 때 이를 표시하는지 확인합니다.", async ({ page }) => {
  await page.route("https://api.itbook.store/1.0/search/nothing/", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        error: "0",
        page: "1",
        books: [],
      }),
    }),
  );

  await page.goto("/");
  await page.fill("#pw-search", "nothing");
  await page.click("#pw-search-submit-button");
  expect(await page.waitForSelector("#pw-search-result-empty")).toBeTruthy();
});

test("검색 결과를 클릭했을 때 상세 화면으로 이동하는지 확인합니다.", async ({ page }) => {
  await page.fill("#pw-search", "mongodb");
  await page.click("#pw-search-submit-button");
  await page.waitForSelector("#pw-search-result");
  await page.click("#pw-search-result .pw-card:first-child");
  expect(await page.waitForSelector("#pw-book-detail")).toBeTruthy();
});

test("쿼리가 있을 때 이를 통해 검색 결과를 불러오는지 확인합니다.", async ({ page }) => {
  await page.goto("/?q=mongodb");
  expect(await page.waitForSelector("#pw-search-result")).toBeTruthy();
});

test.skip("빈 문자열로 검색했을 때 이를 무시하는지 확인합니다.", async ({ page }) => {
  await page.goto("/");
  await page.fill("#pw-search", "");
  await page.click("#pw-search-submit-button");
  // TODO: 네트워크 요청을 보내지 않는지 확인하는 방법을 찾아야 합니다.
});
