import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders movie reviews navigation", () => {
  window.history.pushState({}, "Login", "/login");
  render(<App />);
  expect(screen.getByText(/movie reviews/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /movies/i })).toBeInTheDocument();
});
