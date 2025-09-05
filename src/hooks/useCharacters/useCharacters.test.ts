import { CHARACTER_API, RICKANDMORTY_API } from "@/constants/api";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { QueryClientWrapper } from "@/test/utils";
import { renderHook, waitFor } from "@testing-library/react";
import nock from "nock";
import { afterEach, describe, expect, it } from "vitest";
import { useCharacters } from "./useCharacters";

describe("useCharacters tests", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should fetch characters", async () => {
    const response = { results: [] };
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}?page=1&size=${DEFAULT_PAGE_SIZE}`)
      .reply(200, response);

    const { result } = renderHook(() => useCharacters(), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(response);
    expectation.done();
  });

  it("should throw error on fetch failure", async () => {
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}?page=1&size=${DEFAULT_PAGE_SIZE}`)
      .reply(500);

    const { result } = renderHook(() => useCharacters(), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expectation.done();
  });

  it("should fetch characters for specific page", async () => {
    const response = { results: [] };
    const page = 2;
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}?page=${page}&size=${DEFAULT_PAGE_SIZE}`)
      .reply(200, response);

    const { result } = renderHook(() => useCharacters(page), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(response);
    expectation.done();
  });

  it("should fetch characters with page size", async () => {
    const response = { results: [] };
    const size = 5;
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}?page=1&size=${size}`)
      .reply(200, response);

    const { result } = renderHook(() => useCharacters(1, size), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(response);
    expectation.done();
  });

  it("should fetch characters with name filter", async () => {
    const response = { results: [] };
    const name = "Rick";
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}?page=1&size=${DEFAULT_PAGE_SIZE}&name=${name}`)
      .reply(200, response);

    const { result } = renderHook(() => useCharacters(1, undefined, name), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(response);
    expectation.done();
  });

  it("should fetch characters with status filter", async () => {
    const response = { results: [] };
    const status = "alive";
    const expectation = nock(RICKANDMORTY_API)
      .get(`${CHARACTER_API}?page=1&size=${DEFAULT_PAGE_SIZE}&status=${status}`)
      .reply(200, response);

    const { result } = renderHook(
      () => useCharacters(1, undefined, undefined, status),
      {
        wrapper: QueryClientWrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(response);
    expectation.done();
  });
});
