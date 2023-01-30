import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Foods() {
  const [itemName, setItemName] = useState({ description: "" });
  const [itemPrice, setItemPrice] = useState({ description: "" });
  const [parentCategory, setParentCategory] = useState({ description: "" });
  const [allFoods, setAllFoods] = useState([]);
  const [itemID, setItemID] = useState(0);

  const [categoryName, setCategoryName] = useState({ description: "" });

  const [addCategoryStatus, setAddCategoryStatus] = useState(false);
  const [docuEmptyErrorMessageTrigger, setDocEmptyErrorMessageTrigger] =
    useState(false);

  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const generalFormSubmit = async (e) => {
    const data = {
      categoryName: categoryName.description,
    };

    e.preventDefault();
    // const response = await fetch("/api/categories", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    // return response.json();

    const response = await fetch("/api/categories/add-category", {
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
                <select className="border-[1px] p-2 w-[240px] rounded-md shadow-md outline-none text-sm">
                  <option>Test</option>
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
                  onClick={generalFormSubmit}
                  className="bg-sky-900 text-white p-3 rounded-md h-[40px] hover:cursor-pointer flex justify-center items-center text-xs"
                  // onClick={updateCategoryArray}
                >
                  Add Category
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <label className="text-sm ml-1 flex flex-col">
              Food Name
              {docuEmptyErrorMessageTrigger && (
                <div className="text-red-400 text-xs">
                  Please insert or, select a category to add food!
                </div>
              )}
            </label>
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
              onClick={() => {
                if (allFoods.length > 0) {
                  updateFoodArray;
                } else {
                  setDocEmptyErrorMessageTrigger(true);
                }
              }}
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
              {/* {allFoods.map((item) => {
                item.category.map((food) => {
                  <option>food</option>;
                });
              })} */}
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
