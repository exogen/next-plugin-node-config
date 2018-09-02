jest.mock(
  "next/config",
  () =>
    function getConfig() {
      return {
        serverRuntimeConfig: { secret: 12345 },
        publicRuntimeConfig: { api: "/graphql" }
      };
    },
  { virtual: true }
);

const config = require("./config");

describe("config", () => {
  it("is populated with the runtime config", () => {
    expect(config).toEqual({
      serverRuntimeConfig: { secret: 12345 },
      publicRuntimeConfig: { api: "/graphql" },
      get: expect.any(Function),
      has: expect.any(Function)
    });
  });

  it("supports get()", () => {
    expect(config.get("serverRuntimeConfig.secret")).toBe(12345);
    expect(() => config.get("serverRuntimeConfig.other")).toThrow(
      'Configuration property "serverRuntimeConfig.other" is not defined'
    );
    expect(config.get("publicRuntimeConfig.api")).toBe("/graphql");
    expect(() => config.get("publicRuntimeConfig.other")).toThrow(
      'Configuration property "publicRuntimeConfig.other" is not defined'
    );
  });

  it("supports has()", () => {
    expect(config.has("serverRuntimeConfig.secret")).toBe(true);
    expect(config.has("serverRuntimeConfig.other")).toBe(false);
    expect(config.has("publicRuntimeConfig.api")).toBe(true);
    expect(config.has("publicRuntimeConfig.other")).toBe(false);
  });
});
