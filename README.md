# WeDance Next Generation

Based on [sidebase merino](https://sidebase.io/)

```
# reset database
npx prisma db push --force-reset

# import data
yarn cli import

# install extensions
# ERROR: function ll_to_earth(numeric, numeric) does not exist
PGPASSWORD=password  psql -U user -d db -h 127.0.0.1 -c "CREATE EXTENSION earthdistance;"
PGPASSWORD=password  psql -U user -d db -h 127.0.0.1 -c "CREATE EXTENSION cube;"
```
