import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    await prisma.food.create({
      data: {
        name: data.name,
        price: data.price,
        category_id: data.categoryID,
      },
    });

    res.status(200).json({ message: "Food has been added" });
  }
}
