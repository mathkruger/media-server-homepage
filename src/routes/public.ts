import { Router } from "express";
import { prismaClient } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const publicRoutes = Router();

publicRoutes.get("/api/services", async (req, res) => {
  const data = await prismaClient.service.findMany();
  res.send(data);
});

publicRoutes.post("/api/login", async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const user = await prismaClient.user.findUnique({
    where: {
      username
    }
  });

  const passwordMatch = await bcrypt.compare(password, user?.password ?? "");
  if (user && passwordMatch) {
    const token = jwt.sign(user, process.env["SECRET"] ?? "", {
      expiresIn: 86400
    });

    return res.json({ auth: true, token: token });
  }

  res.status(500).end();
});

export default publicRoutes;
