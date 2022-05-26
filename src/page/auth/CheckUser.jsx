import { checkUser } from "api/auth";
import { useEffect } from "react";

export default function CheckUser() {
  const handleCheckUser = async () => {
    const res = await checkUser();
    console.log(res);
  };
  useEffect(() => {
    handleCheckUser();
  }, []);
}
