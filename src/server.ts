import express from "express";
import bcrypt from "bcrypt";
import frontendRoutes from "./routes/frontend";
import publicRoutes from "./routes/public";
import adminRoutes from "./routes/admin";
import { prismaClient } from "./prisma";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(publicRoutes);
app.use(adminRoutes);
app.use(frontendRoutes);

app.listen(80, () => {
  const userToCreate = {
    username: "admin",
    password: bcrypt.hashSync("admin", 10),
  };
  prismaClient.user.upsert({
    create: userToCreate,
    update: userToCreate,
    where: {
      username: userToCreate.username,
    },
  });
  console.log("✅ Server started at port 80");
});
