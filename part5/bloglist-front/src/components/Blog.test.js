import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component", () => {
  const testBlog = {
    title: "this is a test title",
    author: "Tester Jester",
    url: "example.com",
    likes: 3,
    id: "testingid",
    user: {
      blogs: [],
      username: "tester",
      id: "testinguserid",
      name: "Tester User",
    },
  };
  let component;
  beforeEach(() => {
    component = render(<Blog blog={testBlog} />);
  });

  test("should render correctly default state", () => {
    const div = component.container.querySelector(".defaultState");
    expect(div).toHaveTextContent("this is a test title Tester Jester");

    expect(component.container).not.toHaveTextContent("example.com testingid");
  });

  test("should should url and likes when the details button is pressed", () => {
    const btn = component.getByText("Details");
    fireEvent.click(btn);

    const like = component.container.querySelector(".details-like");
    const url = component.container.querySelector(".details-url");

    expect(like).toHaveTextContent("likes 3");
    expect(url).toHaveTextContent("example.com");
  });
});

