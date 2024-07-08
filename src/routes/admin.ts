import { Router } from "express";
import { prismaClient } from "../prisma";
import { Service, User } from "@prisma/client";
import { verifyJWT } from "../middlewares/authentication";


const adminRoutes = Router();

adminRoutes.use("/admin/*", verifyJWT);

adminRoutes.get("/admin/users", async (_, res) => {
  const users = await prismaClient.user.findMany();
  res.send(users);
});

adminRoutes.post("/admin/user", async (req, res) => {
  const user = req.body as User;
  
  const createdUser = await prismaClient.user.create({
    data: user,
  });

  res.send(createdUser);
});

adminRoutes.post("/admin/service", async (req, res) => {
  const service = req.body as Service;
  
  const createdService = await prismaClient.service.create({
    data: service,
  });

  res.send(createdService);
});

export default adminRoutes;
