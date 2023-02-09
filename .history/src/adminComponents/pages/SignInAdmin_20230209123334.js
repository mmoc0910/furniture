import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../clientComponents/components/forms";
const SignInAdmin = () => {
  const navigate = useNavigate();
  const [err, setErr] = React.useState({
    email: "",
    password: "",
  });
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
      password: yup
        .string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Password tối thiểu tám ký tự, ít nhất một chữ cái và một số"
        )
        .required("Password không được để trống"),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
  };
  return (
    <>
      <h1 className="w-full mb-10 text-2xl font-bold text-center lg:text-left">
        Đăng nhập tài khoản Admin
      </h1>
      <form
        className="w-full space-y-4"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-1">
          <Input
            control={control}
            type="text"
            name="email"
            placeholder="Email"
            className="w-full py-2 border-b border-solid border-[#d7d7d6] outline-none pr-14"
          ></Input>
          {err.email && (
            <span className="text-[#e53637] text-sm">{err.email}</span>
          )}
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
            className="w-full py-2 border-b border-solid border-[#d7d7d6] outline-none pr-14"
          ></Input>
          {err.password && (
            <span className="text-[#e53637] text-sm">{err.password}</span>
          )}
          {errors?.password?.message && (
            <span className="text-[#e53637] text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        {/* <p className="text-right cursor-pointer text-[#4d79d8]">
          Quên mật khẩu?
        </p> */}
        <div>
          <Button
            type="submit"
            value="submit"
            className="w-full py-2 mt-5 mb-5 font-bold text-white bg-black border border-black border-solid rounded-md"
          >
            Đăng nhập
          </Button>
          <div
            className="flex items-center justify-center gap-2 py-2 border border-black border-solid rounded-md cursor-pointer"
            onClick={() => handleSigninWithGoogle()}
          >
            <span>
              <FaGoogle></FaGoogle>
            </span>
            <p>Đăng nhập với Google</p>
          </div>
          {/* <p className="text-center mt-7">
        Bạn chưa có tài khoản
        <Link className="font-bold text-[#4d79d8]" to={"/signup"}>
          Đăng ký
        </Link>
      </p> */}
        </div>
      </form>
    </>
  );
};

export default SignInAdmin;
