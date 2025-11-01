import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login screen inputs", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  expect(emailInput).toBeInTheDocument();
});
