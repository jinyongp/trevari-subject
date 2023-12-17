import { test, expect } from "@playwright/test";

test("상세 정보를 불러오지 못했을 때 이를 Not Found 화면을 표시하는지 확인합니다.", async ({ page }) => {
  await page.goto("/books/0");
  expect(await page.waitForSelector("#pw-book-not-found")).toBeTruthy();
});

test("상세 정보를 불러왔을 때 이를 표시하는지 확인합니다.", async ({ page }) => {
  await page.goto("/books/9781617294136");
  expect(await page.waitForSelector("#pw-book-detail")).toBeTruthy();
});
