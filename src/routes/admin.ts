import bcrypt from "bcrypt";
import { Router } from "express";
import { prismaClient } from "../prisma";
import { Service, User } from "@prisma/client";
import { verifyJWT } from "../middlewares/authentication";


const adminRoutes = Router();

adminRoutes.use("/api/admin/*", verifyJWT);

adminRoutes.get("/api/admin/users", async (_, res) => {
  const users = await prismaClient.user.findMany();
  res.send(users);
});

adminRoutes.post("/api/admin/user", async (req, res) => {
  const user = req.body as User;
  
  const createdUser = await prismaClient.user.create({
    data: {
      username: user.username,
      password: bcrypt.hashSync(user.password, 10)
    },
  });

  res.send(createdUser);
});

adminRoutes.post("/api/admin/service", async (req, res) => {
  const service = req.body as Service;
  
  const createdService = await prismaClient.service.create({
    data: service,
  });

  res.send(createdService);
});

export default adminRoutes;
