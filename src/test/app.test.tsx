import { render, screen } from "@testing-library/react";
import App from "../App";

it("should render location search input and use your location button", async () => {
  render(<App />);

  const button = await screen.findByText<HTMLButtonElement>(
    /use your location/i
  );
  const input = await screen.findByPlaceholderText<HTMLInputElement>(
    /enter your city/i
  );

  expect(button).toBeVisible();
  expect(input).toBeVisible();
});

it("should render units switch buttons", async () => {
  render(<App />);

  const metricButton = await screen.findByRole("button", { name: /metric/i });
  const imperialButton = await screen.findByRole("button", {
    name: /imperial/i,
  });

  expect(metricButton).toBeVisible();
  expect(imperialButton).toBeVisible();
});
