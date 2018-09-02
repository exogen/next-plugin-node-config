# next-plugin-node-config

Next.js and [node-config][], together at last.

## Why?

Next.js already has [built-in support for runtime configuration][next-config]
(in fact, this plugin is implemented using that) –  so why involve node-config
as well?

node-config provides some features that are nicer for large applications:

1.  Merging of (potentially many) different [configuration files][files]
    (including multiple supported formats) depending on the environment. This is
    useful for managing different configurations in staging, production, etc.
2.  Nice error messages with [`config.get()`][get]. Instead of an unhelpful
    message about accessing a property of `undefined`, or silent bugs caused by
    using missing values, `config.get()` will throw an error with the full key
    path being requested.
3.  It works in places where `next/config` doesn’t – for example, server files
    that have not been built by Next.js. In these situations, `next/config` will
    supply an undefined configuration because it has not performed its setup
    phase that populates these values – but `config` will still work.

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
