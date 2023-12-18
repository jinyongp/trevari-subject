import { test, expect } from "vitest";
import { parseQuery, processNotOperator, processOrOperator } from "./fetch";

test("or 연산자를 확인합니다.", () => {
  expect(processOrOperator("a|b|c")).toEqual([{ include: "a" }, { include: "b" }, { include: "c" }]);
});

test("not 연산자를 확인합니다.", () => {
  expect(processNotOperator("a-b")).toEqual({ include: "a", exclude: "b" });
});

test("쿼리 파싱을 확인합니다.", () => {
  expect(parseQuery("a|b|c")).toEqual([{ include: "a" }, { include: "b" }, { include: "c" }]);
  expect(parseQuery("a-b")).toEqual([{ include: "a", exclude: "b" }]);
  expect(parseQuery("a-b|c")).toEqual([{ include: "a", exclude: "b" }, { include: "c" }]);
  expect(parseQuery("a|b-c")).toEqual([{ include: "a" }, { include: "b", exclude: "c" }]);
});
