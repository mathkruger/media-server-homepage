export DATABASE_URL=file:database.db
export SECRET=oloquinhoomeuessaferaaibicho

npm install
npx prisma migrate deploy

npm start