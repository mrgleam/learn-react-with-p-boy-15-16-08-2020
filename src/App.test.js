import React from "react";
import { render, screen, fireEvent, userEvent } from "@testing-library/react";
import App from "./App";

class App2 extends React.Component {
  state = {
    search: "",
  };

  onChange = (event) => {
    this.setState({ search: event.target.value });
  };
  render() {
    return (
      <div>
        Search:{" "}
        <input type="text" onChange={this.onChange} value={this.state.search} />
      </div>
    );
  }
}

test("render app2", async () => {
  render(<App2 />);
  screen.debug();
  expect(screen.queryByDisplayValue("JS")).toBeNull();
  expect(screen.getByText("Search:")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  screen.queryByRole("");

  setTimeout(() => {
    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "JS",
      },
    });
  }, 1000);

  screen.debug();
  // expect(screen.queryByDisplayValue("JS").value).toBe("JS");
  expect(await screen.findByDisplayValue("JS")).toBeInTheDocument();
});

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("adds 1 + 1 to equal 2", () => {
  expect(1 + 1).toBe(2);
});

test("object", () => {
  const data = { a: "a", b: "b" };
  expect(data).toEqual({ a: "a", b: "b" });
});

test("Array", () => {
  const v = [1, 2, 3, 4, 5, 9];
  expect(v).toContain(1 && 9);
});
