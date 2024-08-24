build:
	pnpm install
	prisma db push --force-reset
	echo "CREATE EXTENSION cube CASCADE;" | PGPASSWORD=password psql -U user -d db -h 127.0.0.1
	echo "CREATE EXTENSION earthdistance CASCADE;" | PGPASSWORD=password psql -U user -d db -h 127.0.0.1
	prisma generate
	cd cli
	cp -r ../prisma ./prisma
	pnpm i
	prisma generate
	pnpm cli import --all
