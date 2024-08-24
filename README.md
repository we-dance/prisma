# WeDance Next Generation

Based on [sidebase merino](https://sidebase.io/)

## Setup

    ```
    make build
    ```

## Usage

Start development server

    ```
    pnpm dev
    ```

### Troubleshooting

-   Error 500: Invalid `prisma.$queryRaw()` invocation: Raw query failed. Code: `42883`. Message: `ERROR: function ll_to_earth(numeric, numeric) does not exist HINT: No function matches the given name and argument types. You might need to add explicit type casts.`
    -   install db extensions, repeat setup
-   `bun cli import` - Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
    -   uncomment `tsconfig.json`
