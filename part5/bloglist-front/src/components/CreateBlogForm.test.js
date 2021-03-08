import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import CreateBlogForm from "./CreateBlogForm";

describe("Blog form ", () => {
  test("Should call its event handler with the proper details when a blog is created", () => {
    const mockSubmit = jest.fn();

    const component = render(
      <CreateBlogForm
        handleSubmit={mockSubmit}
        titleValue="test title"
        authorValue="test author"
        urlValue="test url"
      />
    );

    const form = component.container.querySelector("#form");
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");

    fireEvent.submit(form);

    expect(title.value).toBe("test title");
    expect(author.value).toBe("test author");
    expect(url.value).toBe("test url");

    expect(mockSubmit.mock.calls).toHaveLength(1);
  });
});
