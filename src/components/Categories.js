import { useState } from "react";
import axios from "axios";
export default function Categories({ data }) {
  const [foodVisibility, setFoodVisibility] = useState(true);
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [allFoodsInCategory, setAllFoodsInCategory] = useState("");

  const handleVisibility = (itemID) => {
    setFoodVisibility(false);
    axios
      .get(`/api/categories/get-categories?item_id=${itemID}`)
      .then((res) => {
        setAllFoodsInCategory(res);
        console.log("This is response", res);
      })
      .catch((err) => {
        console.log("Error item not found", err);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      {foodVisibility ? (
        data.map((item) => (
          <div
            onClick={() => handleVisibility(item.id)}
            className="bg-white w-[250px] h-[100px] rounded-md shadow-lg flex justify-center items-center hover:cursor-pointer"
          >
            <div className="text-black flex justify-center items-center text-[24px]">
              {item.name}
            </div>
          </div>
        ))
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
}
