# next-plugin-node-config

Next.js and [node-config][], together at last.

## Why?

Next.js already has [built-in support for runtime configuration][next-config]
(in fact, this plugin is implemented using that) –  so why involve
[node-config][] as well?

node-config provides some features that are nice for larger applications:

1.  Merging of (potentially many) different [configuration files][files]
    (including multiple formats) depending on the environment. This is useful
    for managing different configurations in staging, production, etc.
2.  Nicer error messages with [`config.get()`][get]. Instead of an unhelpful
    message about accessing a property of `undefined`, or silent bugs caused by
    using undefined values, `config.get()` will provide an error with the full
    config key path being requested.
3.  It works in places where `next/config` doesn’t – for example, server files
    that have not been built by Next.js. In these situations, `next/config` will
    supply an undefined configuration because it has not performed its setup
    phase.

## How?

When called, this plugin imports `config` and defines `serverRuntimeConfig`
and `publicRuntimeConfig` in the output Next.js config.

- `serverRuntimeConfig` will come from `config.serverRuntimeConfig` or a key of
  your choosing defined by `nodeConfigServerKey` (for example, a value of
  `server` will select `config.server`). If any existing `serverRuntimeConfig`
  value exists, it will be merged.
- `publicRuntimeConfig` will come from `config.publicRuntimeConfig` or a key of
  your choosing defined by `nodeConfigPublicKey` (for example, a value of
  `public` will select `config.public`). If any existing `publicRuntimeConfig`
  value exists, it will be merged.
- A webpack alias is added for the `config` module that points to a browser shim
  provided by this plugin. It exports an object containing the configuration
  values retrieved from `next/config`, and compatible `get()` and `has()`
  methods.

[node-config]: https://github.com/lorenwest/node-config
[next-config]: https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side
[files]: https://github.com/lorenwest/node-config/wiki/Configuration-Files
[get]: https://github.com/lorenwest/node-config/wiki/Common-Usage#using-config-values
