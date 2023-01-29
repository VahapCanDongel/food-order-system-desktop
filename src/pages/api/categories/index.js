import { db } from "../../../utils/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const { user, categoryName } = JSON.parse(req.body);
    console.log(user);

    const documentRef = doc(db, "users", user.uid);

    await setDoc(documentRef, {
      user: user.uid,
      user_name: user.displayName,
      user_email: user.email,
      categories: [
        {
          name: "",
          foods: [
            {
              name: "",
              price: 0,
              extras: [],
            },
          ],
        },
      ],
    });

    res.status(200).json({ message: "Document has been added in to the db" });
  }
}
