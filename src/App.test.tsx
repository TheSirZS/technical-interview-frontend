import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { useProductContext } from "./contexts/ProductContext";

jest.mock("./contexts/ProductContext");

describe("App Component", () => {
  test("renders product list and submits a review", async () => {
    const mockGetProducts = jest.fn();
    const mockHandleSubmitReview = jest.fn();

    (useProductContext as jest.Mock).mockReturnValue({
      products: [
        {
          id: "1",
          name: "Test Product",
          image: "image.jpg",
          reviews: [{ reviewer: "Alice", rating: 5, comment: "Great!" }],
        },
      ],
      error: null,
      loading: false,
      clearError: jest.fn(),
      getProducts: mockGetProducts,
      handleSubmitReview: mockHandleSubmitReview,
    });

    render(<App />);

    expect(mockGetProducts).toHaveBeenCalled();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Great!")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Who reviews?"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Add your comment"), {
      target: { value: "Nice product!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));
  });

  test("shows loading spinner", () => {
    (useProductContext as jest.Mock).mockReturnValue({
      products: [],
      error: null,
      loading: true,
      clearError: jest.fn(),
      getProducts: jest.fn(),
      handleSubmitReview: jest.fn(),
    });

    render(<App />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows error message", () => {
    (useProductContext as jest.Mock).mockReturnValue({
      products: [],
      error: "Something went wrong",
      loading: false,
      clearError: jest.fn(),
      getProducts: jest.fn(),
      handleSubmitReview: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
