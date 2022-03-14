import React from "react";
import { render, wait, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createHashHistory } from "history";
import App from "../App";

describe("AppRouter component", () => {
  afterEach(jest.resetAllMocks);

  it("Navigates correctly - Home", async () => {
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/home");
    const { container, getByText, debug } = render(<App />);
    await waitFor(() => getByText(/Lorem/i));
  });

  it("Navigates correctly - Login", async () => {
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/login");
    const { container, getByText, debug } = render(<App />);
    await waitFor(() => getByText(/Company Login/i));
  });

  it("Navigates correctly - Logout", async () => {
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/logout");
    const { container, getByText, debug } = render(<App />);
  });

  it("Navigates correctly - Signup", async () => {
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/signup");
    const { container, getByText, debug } = render(<App />);
    await waitFor(() => getByText(/Account Creation/i));
  });

  it("Navigates correctly - Profile", async () => {
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/profile");
    const { container, getByText, debug } = render(<App />);
  });

  it("Navigates correctly - Quote", async () => {
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/quote");
    const { container, getByText, debug } = render(<App />);
  });

  it("Navigates correctly - History", async () => {
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/history");
    const { container, getByText, debug } = render(<App />);
  });

});
