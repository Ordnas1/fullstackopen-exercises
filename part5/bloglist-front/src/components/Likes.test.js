import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import Like from "./Like";

describe("Like button on Blog component", () => {
  test("should call its event handle twice if it's clicked twice", () => {
    const mockLike = jest.fn();
    const component = render(<Like likes={3} handleLike={mockLike} />);

    const likeBtn = component.getByText("like");
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);

    expect(mockLike.mock.calls).toHaveLength(2);
  });
});
