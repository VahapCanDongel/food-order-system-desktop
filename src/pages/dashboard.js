import Foods from "../components/Foods";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Dashboard({ data, allFoods }) {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const getData = async () => {
    if (loading) return;
    if (!user) {
      return route.push("/auth/login");
    }
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="w-full h-screen flex">
      <Foods data={data} allFoods={allFoods} />
    </div>
  );
}

export async function getServerSideProps() {
  const categories = await prisma.category.findMany();
  const foods = await prisma.food.findMany();

  return {
    props: {
      data: categories,
      allFoods: foods,
    },
  };
}
