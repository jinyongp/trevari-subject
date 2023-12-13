import { test, expect } from "@playwright/test";

test("사용자가 검색창을 통해 키워드를 입력할 수 있는지 확인합니다.", async ({ page }) => {
  await page.goto("/");
  await page.locator("#pw-search").pressSequentially("mongodb");
  await page.locator("#pw-search").press("Enter");
});

test("입력한 키워드에 대응하는 결과를 불러와 표시하는지 확인합니다.", async ({ page }) => {
  await page.goto("/");
  await page.fill("#pw-search", "mongodb");
  await page.click("#pw-search-submit-button");
  await page.waitForResponse("https://api.itbook.store/1.0/search/mongodb");
  await page.waitForSelector("#pw-search-result");

  const result = await page.locator("#pw-search-result").innerText();
  expect(result).toContain("mongodb");
});

test("입력한 키워드에 대응하는 결과가 없을 때 이를 표시하는지 확인합니다.", async ({ page }) => {
  await page.goto("/");
  await page.fill("#pw-search", "mongodb");
  await page.click("#pw-search-submit-button");
  await page.waitForResponse("https://api.itbook.store/1.0/search/mongodb");
  await page.waitForSelector("#pw-search-result");

  const result = await page.locator("#pw-search-result").innerText();
  expect(result).toContain("검색 결과가 없습니다.");
});

test("빈 문자열로 검색했을 때 이를 무시하는지 확인합니다.", async ({ page }) => {
  await page.goto("/");
  await page.fill("#pw-search", "");
  await page.click("#pw-search-submit-button");
  const request = await page.waitForRequest("https://api.itbook.store/1.0/search/", { timeout: 1000 });
  expect(request).toBe(null);
});
