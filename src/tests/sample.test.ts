import { test,expect } from "vitest";

function SUM(a: number, b:number) {
    return a+b;
}
test("足し算のテスト", () => {
    expect(SUM(1,2)).toBe(3);
});