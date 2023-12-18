import { test, expect } from "@playwright/test";

test.describe("상세 화면", () => {
  // TODO: 서버 사이드에서 발생하는 네트워크 요청은 mock 처리할 수 없습니다.
  // test.beforeEach(async ({ page }) => {
  //   await page.route("https://api.itbook.store/1.0/books/**", (route) =>
  //     route.fulfill({
  //       status: 200,
  //       contentType: "application/json",
  //       body: JSON.stringify({
  //         error: "0",
  //         title: "MongoDB Title",
  //         subtitle: "MongoDB Subtitle",
  //         authors: "Author 1, Author 2",
  //         publisher: "Publisher",
  //         isbn10: "1234567890",
  //         isbn13: "1234567890123",
  //         pages: "123",
  //         year: "2021",
  //         rating: "4",
  //         desc: "Description",
  //         price: "$30.30",
  //         image: "https://itbook.store/img/books/1234567890123.png",
  //         url: "https://itbook.store/books/1234567890123",
  //       }),
  //     }),
  //   );

  //   await page.goto("/");
  // });

  test("상세 정보를 불러오지 못했을 때 이를 Not Found 화면을 표시하는지 확인합니다.", async ({ page }) => {
    await page.goto("/books/0");
    expect(await page.waitForSelector("#pw-book-not-found")).toBeTruthy();
  });

  test("상세 정보를 불러왔을 때 이를 표시하는지 확인합니다.", async ({ page }) => {
    await page.goto("/books/9781449344689");
    expect(await page.waitForSelector("#pw-book-detail")).toBeTruthy();
  });

  test("상세 화면이 모든 정보를 표시하는지 확인합니다.", async ({ page }) => {
    await page.goto("/books/9781449344689");
    await page.waitForSelector("#pw-book-detail");
    const innerText = await page.innerText("#pw-book-detail");
    expect(innerText).toContain("MongoDB: The Definitive Guide");
    expect(innerText).toContain("Powerful and Scalable Data Storage");
    expect(innerText).toContain("Kristina Chodorow");
    expect(innerText).toContain("O'Reilly Media");
    expect(innerText).toContain("432");
    // expect(innerText).toContain("4");
    expect(innerText).toContain(
      "Manage the huMONGOus amount of data collected through your web application with MongoDB.",
    );
    // expect(innerText).toContain("$10");
  });
});
