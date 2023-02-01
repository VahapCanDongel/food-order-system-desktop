import { useState } from "react";
import axios from "axios";

export default function Categories({ data }) {
  const [foodVisibility, setFoodVisibility] = useState(true);
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [allFoodsInCategory, setAllFoodsInCategory] = useState([]);

  const handleVisibility = async (itemID) => {
    if (selectedCategoryID !== itemID) {
      setSelectedCategoryID(itemID);
      setFoodVisibility(false);
      const res = await axios.get(
        `/api/categories/get-categories?item_id=${itemID}`
      );

      setAllFoodsInCategory(res.data);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      {foodVisibility
        ? data.map((item) => (
            <div
              onClick={() => handleVisibility(item.id)}
              className="bg-white w-[250px] h-[100px] rounded-md shadow-lg flex justify-center items-center hover:cursor-pointer"
            >
              <div className="text-black flex justify-center items-center text-[24px]">
                {item.name}
              </div>
            </div>
          ))
        : allFoodsInCategory.map((value, index) => (
            <div className="bg-white w-[250px] h-[100px] rounded-md shadow-lg flex justify-center items-center hover:cursor-pointer">
              <div className="text-black flex justify-center items-center text-[24px]">
                {value.name}
              </div>
            </div>
          ))}
    </div>
  );
}
