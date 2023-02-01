import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await prisma.basket.findMany();

    res.end(JSON.stringify(data));
  }
}
