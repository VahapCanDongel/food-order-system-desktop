import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "POST") {
    await prisma.basket.create({
      data: {
        foodName: query.food_name,
        foodPrice: parseFloat(query.food_price),
      },
    });

    res.status(200).json({ message: "Item added to the basket" });
  }
}
