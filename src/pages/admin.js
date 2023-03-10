import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Admin() {
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

  return <div></div>;
}
