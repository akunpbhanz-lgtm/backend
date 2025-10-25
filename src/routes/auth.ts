import { Router } from "express";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, users } from "@/db";

const authRouter = Router();

const syncSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().url().optional(),
});

authRouter.post("/sync", async (req, res, next) => {
  try {
    const payload = syncSchema.parse(req.body);

    const existing = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, payload.email),
    });

    if (existing) {
      const [updated] = await db
        .update(users)
        .set({
          name: payload.name ?? existing.name,
          image: payload.image ?? existing.image,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existing.id))
        .returning();

      res.json({
        id: updated.id,
        email: updated.email,
        name: updated.name,
        image: updated.image,
        role: updated.role,
      });
      return;
    }

    const [created] = await db
      .insert(users)
      .values({
        email: payload.email,
        name: payload.name,
        image: payload.image,
      })
      .returning();

    res.json({
      id: created.id,
      email: created.email,
      name: created.name,
      image: created.image,
      role: created.role,
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
