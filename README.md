# WeDance Next Generation

Based on [sidebase merino](https://sidebase.io/)

## Setup

1. Install dependencies

    ```
    bun install
    ```

2. Reset database

    ```
    bunx prisma db push --force-reset
    ```

3. Install db extensions

    ```
    PGPASSWORD=password psql -U user -d db -h 127.0.0.1
    CREATE EXTENSION earthdistance;
    CREATE EXTENSION cube;
    ```

4. Generate the Prisma client

    ```
    bunx prisma generate
    ```

5. Import data
    ```
    bun cli import
    ```

## Usage

1. Start development server
    ```
    bun dev
    ```

### Troubleshooting

-   Error 500: Invalid `prisma.$queryRaw()` invocation: Raw query failed. Code: `42883`. Message: `ERROR: function ll_to_earth(numeric, numeric) does not exist HINT: No function matches the given name and argument types. You might need to add explicit type casts.`
    -   install db extensions, repeat setup
-   `bun cli import` - Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
    -   uncomment `tsconfig.json`
