import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";

test("renders Home Page", async () => {
  const { findByText } = render(<App />);
  const element = await findByText("Home Page");
  expect(element).toBeInTheDocument();
});

