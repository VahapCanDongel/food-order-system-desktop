import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    await prisma.category.create({
      data: {
        name: data.categoryName,
      },
    });

    res.status(200).json({ message: "Category has been inserted" });
  }
}
