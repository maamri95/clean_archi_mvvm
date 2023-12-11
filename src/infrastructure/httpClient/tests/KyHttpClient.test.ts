import { KyHttpClient } from "../ky/KyHttpClient";
import ky, { HTTPError, NormalizedOptions, TimeoutError } from "ky";
import { expect, describe, beforeEach, it, vi } from "vitest";
import { ServerError, ClientError, NetworkError } from "#contracts/HttpClient";
import { JsonParser } from "#infrastructure/parser/JsonParser.ts";
describe("KyHttpClient", () => {
  let mockKy: typeof ky;
  let client: KyHttpClient;

  beforeEach(() => {
    mockKy = ky.create({});
    client = new KyHttpClient(mockKy, new JsonParser());
  });

  describe("GET method", () => {
    it("should execute GET requests correctly", async () => {
      const mockData = { data: "test" };
      mockKy.get = vi.fn().mockReturnValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockData),
      });

      const result = await client.get<typeof mockData>({ url: "/test" });
      expect(result).toEqual(mockData);
    });

    it("should throw NetworkError on timeout", async () => {
      mockKy.get = vi.fn().mockImplementationOnce(() => {
        throw new TimeoutError({} as Request);
      });

      await expect(client.get({ url: "/test" })).rejects.toThrow(NetworkError);
    });

    it("should throw ClientError on client error", async () => {
      const fakeResponse = new Response(null, { status: 400 });
      mockKy.get = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.get({ url: "/test" })).rejects.toThrow(ClientError);
    });

    it("should throw ServerError on server error", async () => {
      const fakeResponse = new Response(null, { status: 500 });
      mockKy.get = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.get({ url: "/test" })).rejects.toThrow(ServerError);
    });
  });

  describe("POST method", () => {
    it("should execute POST requests correctly", async () => {
      const mockData = { result: "post success" };
      const postData = { myData: "data" };

      mockKy.post = vi.fn().mockReturnValue({
        json: vi.fn().mockResolvedValue(mockData),
      });

      const result = await client.post<typeof mockData>({
        url: "/test",
        body: postData,
      });
      expect(result).toEqual(mockData);
    });

    it("should throw NetworkError on timeout during POST", async () => {
      mockKy.post = vi.fn().mockImplementationOnce(() => {
        throw new TimeoutError({} as Request);
      });

      await expect(client.post({ url: "/test", body: {} })).rejects.toThrow(
        NetworkError,
      );
    });

    it("should throw ClientError on client error during POST", async () => {
      const fakeResponse = new Response(null, { status: 400 });
      mockKy.post = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.post({ url: "/test", body: {} })).rejects.toThrow(
        ClientError,
      );
    });

    it("should throw ServerError on server error during POST", async () => {
      const fakeResponse = new Response(null, { status: 500 });
      mockKy.post = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.post({ url: "/test", body: {} })).rejects.toThrow(
        ServerError,
      );
    });
  });

  describe("PUT method", () => {
    it("should execute PUT requests correctly", async () => {
      const mockData = { result: "put success" };
      const putData = { updatedData: "newData" };

      mockKy.put = vi.fn().mockReturnValue({
        json: vi.fn().mockResolvedValue(mockData),
      });

      const result = await client.put<typeof mockData>({
        url: "/test",
        body: putData,
      });
      expect(result).toEqual(mockData);
    });

    it("should throw NetworkError on timeout during PUT", async () => {
      mockKy.put = vi.fn().mockImplementationOnce(() => {
        throw new TimeoutError({} as Request);
      });

      await expect(client.put({ url: "/test", body: {} })).rejects.toThrow(
        NetworkError,
      );
    });

    it("should throw ClientError on client error during PUT", async () => {
      const fakeResponse = new Response(null, { status: 400 });
      mockKy.put = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.put({ url: "/test", body: {} })).rejects.toThrow(
        ClientError,
      );
    });

    it("should throw ServerError on server error during PUT", async () => {
      const fakeResponse = new Response(null, { status: 500 });
      mockKy.put = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.put({ url: "/test", body: {} })).rejects.toThrow(
        ServerError,
      );
    });
  });

  describe("DELETE method", () => {
    it("should execute DELETE requests correctly", async () => {
      const mockData = { result: "delete success" };

      mockKy.delete = vi.fn().mockReturnValue({
        json: vi.fn().mockResolvedValue(mockData),
      });

      const result = await client.delete<typeof mockData>({ url: "/test" });
      expect(result).toEqual(mockData);
    });

    it("should throw NetworkError on timeout during DELETE", async () => {
      mockKy.delete = vi.fn().mockImplementationOnce(() => {
        throw new TimeoutError({} as Request);
      });

      await expect(client.delete({ url: "/test" })).rejects.toThrow(
        NetworkError,
      );
    });

    it("should throw ClientError on client error during DELETE", async () => {
      const fakeResponse = new Response(null, { status: 400 });
      mockKy.delete = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.delete({ url: "/test" })).rejects.toThrow(
        ClientError,
      );
    });

    it("should throw ServerError on server error during DELETE", async () => {
      const fakeResponse = new Response(null, { status: 500 });
      mockKy.delete = vi.fn().mockImplementationOnce(() => {
        throw new HTTPError(
          fakeResponse,
          {} as Request,
          {} as NormalizedOptions,
        );
      });

      await expect(client.delete({ url: "/test" })).rejects.toThrow(
        ServerError,
      );
    });
  });
});
