import CurrentOrderCard from "./CurrentOrderCard";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Basket() {
  const [basketFoods, setBasketFoods] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const foodsInBasket = await axios.get("/api/basket/get-from-basket");
      console.log(foodsInBasket);
      setBasketFoods(foodsInBasket.data);
    };

    getData();
  }, []);

  return (
    <div className="w-[550px] h-screen bg-white shadow-lg overflow-scroll">
      <div className="text-[16px] flex justify-between bg-white h-[70px] sticky top-0 border-b-[1px] shadow-md items-center p-2">
        <div>Current Order</div>
        <div>01/01/1111</div>
      </div>

      {console.log(basketFoods)}
      {basketFoods.map((item) => {
        return (
          <CurrentOrderCard
            itemName={item.foodName}
            itemPrice={item.foodPrice}
          />
        );
      })}

      <div className="bg-white border-[1px] w-full h-[200px] mb-auto sticky bottom-0 p-2 flex flex-col justify-center gap-28">
        <div className="flex justify-between text-xl">
          <div>Total</div>
          <div>£20.99</div>
        </div>

        <div className="w-full bg-cyan-900 h-[40px] text-white rounded-md flex items-center justify-center">
          Complete
        </div>
      </div>
    </div>
  );
}
