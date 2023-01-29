import { db } from "../../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user } = JSON.parse(req.body);

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      categories: {},
    });
  }
}
