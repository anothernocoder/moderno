---
"@moderno-ui/registry": minor
---

Adds a `moderno-ui init` command (ADR-0006): it detects the consumer's framework from
`package.json` `dependencies`/`devDependencies` (`react`, `vue`, `svelte`, or `solid-js`) and,
when exactly one is found, writes it to `moderno.config.json` in the current directory. When
none or more than one is found, it prints guidance to run `npm create moderno-ui@latest` instead
and writes no config file.

`moderno-ui add`'s `--framework`/`-f` flag is now optional: when omitted, it falls back to the
`framework` saved in `moderno.config.json`. An explicit `--framework` still overrides a saved
config. Behavior with neither the flag nor a config file present is unchanged.
