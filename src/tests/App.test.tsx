import { afterEach, describe, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen,within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";

afterEach(cleanup);

describe("App", () => {
    test("アプリのタイトルが表示されている", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", { name: "やることリスト" }),
        ).toBeInTheDocument();
    });

    test("やることリストを追加することができる", () => {
        render(<App />);

        const input = screen.getByRole("textbox", {
            name: "追加するTodo"
        });

        const addButton = screen.getByRole("button", { name: "追加する" });

        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.click(addButton);

       const list = screen.getByRole("list")
        expect(within(list).getByText("list)"))
        expect(screen.getByText("テストタスク")).toBeInTheDocument();
    });
});
