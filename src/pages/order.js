import Basket from "../components/Basket";
import Categories from "../components/Categories";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Order({ data }) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Categories data={data} />
      <Basket />
    </div>
  );
}

export async function getServerSideProps() {
  const categories = await prisma.category.findMany();

  return {
    props: {
      data: categories,
    },
  };
}
