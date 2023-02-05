import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET") {
    console.log(query.item_id);
    const data = await prisma.food.findMany({
      where: {
        categoryId: parseInt(query.item_id),
      },
    });

    res.end(JSON.stringify(data));
  }
}
