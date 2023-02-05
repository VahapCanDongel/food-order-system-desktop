import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
export default function Foods({ data, allFoods }) {
  const [itemName, setItemName] = useState({ description: "" });
  const [itemPrice, setItemPrice] = useState({ description: "" });
  const [categoryName, setCategoryName] = useState({ description: "" });
  const [addCategoryStatus, setAddCategoryStatus] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState(data[0].id);

  const [categoryFoods, setCategoryFoods] = useState([]);

  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const handleChange = async (e) => {
    console.log(e.target.value);
    setSelectedItemID(e.target.value);

    await axios
      .get(`/api/categories/get-categories?item_id=${e.target.value}`)
      .then((response) => {
        console.log(response.data);
        setCategoryFoods(response.data);
      });
  };

  const addCategory = async (e) => {
    const data = {
      categoryName: categoryName.description,
    };

    e.preventDefault();

    const response = await fetch("/api/categories/add-category", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const addFood = async () => {
    const data = {
      name: itemName.description,
      price: itemPrice.description,
      categoryID: selectedItemID,
    };

    const response = await fetch("/api/foods/food", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  return (
    <div className="w-full h-screen flex justify-evenly flex-col items-center">
      {/* Add Food Form */}
      <div className="flex  gap-5">
        <form className="flex flex-col justify-evenly  gap-10 w-[400px] p-4 rounded-md shadow-xl border-[1px] ">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-sm ml-1">Category</label>
              {addCategoryStatus ? (
                <input
                  onChange={(e) => {
                    setCategoryName({
                      ...categoryName,
                      description: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Category Name"
                  className="border-[1px] p-2 w-[240px] rounded-md shadow-md outline-none text-sm disabled:bg-slate-100"
                />
              ) : (
                <select
                  value={selectedItemID}
                  onChange={handleChange}
                  className="border-[1px] p-2 w-[240px] rounded-md shadow-md outline-none text-sm"
                >
                  <option></option>
                  {data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}

              <div className="text-xs rounded-sm w-[140px] flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  className="border-none"
                  onChange={() => {
                    if (addCategoryStatus == false) {
                      setAddCategoryStatus(true);
                    } else {
                      setAddCategoryStatus(false);
                    }

                    console.log("changed");
                  }}
                />
                Insert new cateogry
              </div>
              {addCategoryStatus && (
                <div
                  onClick={addCategory}
                  className="bg-sky-900 text-white p-3 rounded-md h-[40px] hover:cursor-pointer flex justify-center items-center text-xs"
                  // onClick={updateCategoryArray}
                >
                  Add Category
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <label className="text-sm ml-1 flex flex-col">Food Name</label>
            <input
              onChange={(e) =>
                setItemName({ ...itemName, description: e.target.value })
              }
              type="text"
              placeholder="Food Name"
              className="border-[1px] p-2 w-[240px] rounded-md shadow-md outline-none text-sm"
              disabled={addCategoryStatus ? "disabled" : ""}
            />
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <label className="text-sm ml-1">Food Price </label>
            <input
              onChange={(e) =>
                setItemPrice({ ...itemPrice, description: e.target.value })
              }
              type="number"
              placeholder="£"
              className="border-[1px] p-2 w-[240px] rounded-md shadow-md outline-none text-sm"
              disabled={addCategoryStatus ? "disabled" : ""}
            />
          </div>

          {!addCategoryStatus && (
            <div
              onClick={addFood}
              className="bg-sky-900 text-white p-3 rounded-md h-[40px] hover:cursor-pointer flex justify-center items-center text-xs"
            >
              Add Food
            </div>
          )}
        </form>

        <form className="flex flex-col justify-evenly items-center gap-10 w-[400px] p-4 rounded-md shadow-xl border-[1px]">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-sm">Selected Food:</label>

            <select className="border-[1px] p-2 w-[240px] rounded-md shadow-md outline-none">
              {categoryFoods.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <label className="text-sm">Extra Item Name: </label>
            <input
              type="text"
              className="border-[1px] p-2 w-[240px] rounded-md shadow-md outline-none"
            />

            <div className="bg-sky-900 text-white p-3 rounded-md h-[40px] hover:cursor-pointer flex justify-center items-center text-xs mt-auto">
              Add
            </div>
          </div>

          <div className="w-[300px] bg-sky-900 min-h-[100px] rounded-md flex justify-center p-1">
            <div className="text-xs bg-white w-[80px] flex justify-center items-center rounded-sm h-[20px]">
              <button>
                <svg
                  width="46"
                  height="46"
                  fill="none"
                  stroke="#d95454"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[15px] text-red-900"
                >
                  <path d="M6.343 17.657 17.657 6.344m-11.314 0 11.314 11.313L6.343 6.344Z"></path>
                </svg>
              </button>
              Tomato
            </div>
          </div>

          <div className="bg-sky-900 text-white p-3 rounded-md h-[40px] hover:cursor-pointer flex justify-center items-center text-xs mt-auto">
            Complete
          </div>
        </form>
      </div>

      {/* <table className="border-[1px] border-sky-900 w-[800px] text-center">
        <tr className="border-[2px] border-sky-900">
          <th className="border-[2px] border-b-black border-t-black border-l-black bg-sky-900 text-white">
            Name
          </th>
          <th className="border-[2px] border-b-black border-t-black bg-sky-900 text-white">
            Price
          </th>
          <th className="border-[2px] border-b-black border-t-black bg-sky-900 text-white">
            Parent Category
          </th>
          <th className="border-[2px] border-b-black border-t-black bg-sky-900 text-white">
            Extras
          </th>
          <th className="border-[2px] border-b-black border-t-black border-r-black bg-sky-900 text-white">
            Operations
          </th>
        </tr>

        {allFoods.map((food) =>
          food.food.map((item) => (
            <tr>
              <td className="border-[2px] border-sky-900">
                {item.name.description}
              </td>
              <td className="border-[2px] border-sky-900">
                {item.price.description}
              </td>
              <td className="border-[2px] border-sky-900">
                {item.parent_category.description}
              </td>
              <td className="border-[2px] border-sky-900"></td>
              <td className="border-[2px] border-sky-900">
                <button
                  className="bg-red-300 text-white text-center rounded-md ml-4 h-[25px] w-[80px] hover:bg-red-400"
                  onClick={() => checkingItemID(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </table> */}
    </div>
  );
}
