const plugin = require("./index");

beforeEach(() => {
  jest.resetModules();
});

describe("plugin", () => {
  it("adds runtime configuration to the Next config", () => {
    jest.doMock(
      "config",
      () => ({
        serverRuntimeConfig: { foo: "bar" },
        publicRuntimeConfig: { value: 5 }
      }),
      { virtual: true }
    );
    const nextConfig = plugin({});
    expect(nextConfig.serverRuntimeConfig).toEqual({ foo: "bar" });
    expect(nextConfig.publicRuntimeConfig).toEqual({ value: 5 });
  });

  it("extends runtime configuration if some already exists", () => {
    jest.doMock(
      "config",
      () => ({
        publicRuntimeConfig: { value: 5 },
        serverRuntimeConfig: { foo: "bar" }
      }),
      { virtual: true }
    );
    const nextConfig = plugin({
      serverRuntimeConfig: { secret: "entropy9" },
      publicRuntimeConfig: { public: "house" }
    });
    expect(nextConfig.serverRuntimeConfig).toEqual({
      secret: "entropy9",
      foo: "bar"
    });
    expect(nextConfig.publicRuntimeConfig).toEqual({
      public: "house",
      value: 5
    });
  });

  it("allows customizing which keys contain the runtime config", () => {
    jest.doMock(
      "config",
      () => ({
        server: { foo: "bar" },
        public: { value: 5 }
      }),
      { virtual: true }
    );
    const nextConfig = plugin({
      nodeConfigServerKey: "server",
      nodeConfigPublicKey: "public"
    });
    expect(nextConfig.serverRuntimeConfig).toEqual({ foo: "bar" });
    expect(nextConfig.publicRuntimeConfig).toEqual({
      value: 5,
      nodeConfigServerKey: "server",
      nodeConfigPublicKey: "public"
    });
  });

  it("adds an alias for config to the webpack config", () => {
    jest.doMock("config", () => ({}), { virtual: true });
    const nextConfig = plugin({});
    expect(nextConfig.webpack({})).toEqual({
      resolve: {
        alias: {
          config$: require.resolve("./config")
        }
      }
    });
  });
});
