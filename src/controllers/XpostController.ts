// src/controllers/postController.ts
import type { Response, Request } from "express";
import { prisma } from "../config/prisma";

export async function getPost(req: Request, res: Response) {
  try {
    const users = await prisma.post.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json({ data: users });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "erro al obtener usuarios", message: error.message });
  }
}

export async function createPost(req: Request, res: Response) {
  const { title, content, published, authorId } = req.body;
  try {
    const newUser = await prisma.post.create({
      data: { title, content, published, authorId },
    });
    res.status(201).json({
      data: newUser,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "error al crear usuarios", message: error.message });
  }
}