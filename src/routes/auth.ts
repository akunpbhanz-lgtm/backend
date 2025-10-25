import { Router } from "express";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const authRouter = Router();

const syncSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().url().optional(),
});

authRouter.post("/sync", async (req, res, next) => {
  try {
    const payload = syncSchema.parse(req.body);

    const user = await prisma.user.upsert({
      where: { email: payload.email },
      update: {
        name: payload.name,
        image: payload.image,
      },
      create: {
        email: payload.email,
        name: payload.name,
        image: payload.image,
      },
    });

    res.json({ id: user.id, email: user.email, name: user.name, image: user.image, role: user.role });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
