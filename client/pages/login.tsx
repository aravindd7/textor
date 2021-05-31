import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { sdk } from "../client";
import { Ctx } from "../context";

export default function Login() {
  const [password, setPassword] = useState("");
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameOrEmail.trim() == "" || password.trim() == "") {
      setError("*please fill the form ");
      return;
    }
    try {
      const { login } = await sdk.login({
        nameOrEmail: nameOrEmail,
        password: password,
      });
      if (login.msg === "great") {
        router.push("/");
      } else {
        setError("*" + login.msg);
      }
    } catch (error) {
      console.log(error);
      setError("*" + error);
    }
  };
  return (
    <form className="m-5 w-20" onSubmit={formSubmit}>
      <input
        placeholder="name or email"
        className="pl-2 rounded-sm"
        value={nameOrEmail}
        onChange={(e) => {
          setNameOrEmail(e.target.value.replace(/\s/g, "-"));
        }}
      ></input>
      <input
        placeholder="password"
        className="pl-2 mt-5 rounded-sm "
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <h1 className="text-red-700 text-xs mt-3 -mb-2 w-64">{error}</h1>
      <button className="mt-5 bg-gray-300 text-gray-800 px-2 py-1 hover:bg-black hover:text-white rounded-sm hover:underline  ">
        submit
      </button>
    </form>
  );
}
