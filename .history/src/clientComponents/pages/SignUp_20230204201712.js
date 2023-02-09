import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components/forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();
  const [err, setErr] = React.useState("");
  const schema = yup
    .object({
      name: yup
        .string()
        .min(5, "Tên người dùng tối thiểu 5 ký tự.")
        .required("Tên người dùng không được để trống."),
      email: yup
        .string()
        .email("Email không đúng định dạng.")
        .required("Email không được để trống."),
      password: yup
        .string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Password tối thiểu tám ký tự, ít nhất một chữ cái và một số."
        )
        .required("Password không được để trống."),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    const { name, email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErr("Email đã được đăng ký");
      }
    }
  };
  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), {});
        await updateDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="w-full mb-10 text-2xl font-bold text-center lg:text-left">
        Đăng ký tài khoản
      </h1>
      <form
        className="w-full space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="space-y-1">
          <Input
            control={control}
            name="name"
            placeholder="Tên tài khoản"
            className="w-full py-2 border-b border-solid border-[#d7d7d6] outline-none pr-14"
          ></Input>
          {errors?.name?.message && (
            <span className="text-[#e53637] text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <Input
            control={control}
            name={"email"}
            placeholder="Email"
            className="w-full py-2 border-b border-solid border-[#d7d7d6] outline-none pr-14"
          ></Input>
          {err && <span className="text-[#e53637] text-sm">{err}</span>}
          {errors?.email?.message && (
            <span className="text-[#e53637] text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <Input
            control={control}
            type="password"
            name="password"
            placeholder="Mật khẩu"
            hasIcon={true}
            className="w-full py-2 border-b border-solid border-[#d7d7d6] outline-none pr-14"
          ></Input>
          {errors?.password?.message && (
            <span className="text-[#e53637] text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="pt-5">
          <Button
            type="submit"
            className="w-full py-2 mb-5 font-bold text-white bg-black border border-black border-solid rounded-md"
          >
            Tạo tài khoản
          </Button>
          <div
            className="flex items-center justify-center gap-2 py-2 border border-black border-solid rounded-md cursor-pointer"
            onClick={() => signUpWithGoogle()}
          >
            <span>
              <FaGoogle></FaGoogle>
            </span>
            <p>Đăng ký bằng Google</p>
          </div>
          <p className="text-center mt-7">
            Bạn đã có tài khoản?
            <Link className="font-bold text-[#4d79d8]" to={"/signin"}>
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUp;
