# Known Development Issues

## Graphql types code generation

Fail during code generation of graphql types.
Example:

```bash
Cannot use GraphQLScalarType "BigDecimal" from another module or realm.
Ensure that there is only one instance of "graphql" in the node_modules
```

Remove `nohoist` from the root `package.json`, delete node_modules in root and all packages, and run `yarn` again. Be aware, removing `nohoist` can cause failures in contracts package.

## Jest is not working properly with ESM modules

Jest is not working properly with ESM modules. It fails to run tests by using the normal `jest` command in the web package.

### Solution

Add a command which enables ESM modules for node and then run jest. For web package it is `yarn jest`
