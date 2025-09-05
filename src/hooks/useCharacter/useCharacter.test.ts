import { CHARACTER_API, RICKANDMORTY_API } from "@/constants/api";
import { QueryClientWrapper } from "@/test/utils";
import { renderHook, waitFor } from "@testing-library/react";
import nock from "nock";
import { afterEach, describe, expect, it } from "vitest";
import { useCharacter } from "./useCharacter";

describe("useCharacter tests", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should fetch character", async () => {
    const response = { id: 1, name: "Rick Sanchez" };
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}/1`)
      .reply(200, response);

    const { result } = renderHook(() => useCharacter(1), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(response);
    expectation.done();
  });

  it("should throw error on fetch failure", async () => {
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}/1`)
      .reply(500);

    const { result } = renderHook(() => useCharacter(1), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expectation.done();
  });
});
