import "@testing-library/jest-dom";
import React from "react";
import { beforeEach, vi } from "vitest";

// Mock the TanStack Router Link component globally
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});
