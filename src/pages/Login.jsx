import React, { useState } from "react";
import InputField from "../components/InputField";
import LoginButton from "../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  // logic
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (inputValue, field) => {
    if (field === "email") {
      setEmail(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // 폼 제출시 새로고침 방지 메소드
    // 로그인 기능

    setErrorMessage("");

    // 로딩중이거나 사용자가 emaill, password값 작성 안하면 실행안함
    if (isLoading || !email || !password) return;
    console.log("email", email);
    console.log("password", password);

    setIsLoading(true);
    try {
      // 비동기처리 성공시
      await signInWithEmailAndPassword(auth, email, password);

      // 홈화면으로 리다이렉트
      history("/");
    } catch (error) {
      // 비동기처리 실패시
      setErrorMessage(error.message);
    } finally {
      // 성공, 실패 상관없이 마지막에 실행
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // 구글 provider 설정
    const provider = new GoogleAuthProvider();
    try {
      // 1. 팝업띄워서 구글 로그인
      await signInWithPopup(auth, provider);
      // 2. 홈 화면으로 리다이렉트
      history("/");
    } catch (error) {
      console.error(error);
    }
  };

  // view
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center px-6">
        <h1 className="flex justify-center">
          <img src="./images/logo.svg" alt="churead로고" />
        </h1>
        <h3 className="text-red font-bold text-base py-6">
          Chureads에서 소통해보세요
        </h3>
        {/* START: 폼 영역 */}
        <form
          id="login-form"
          className="text-center flex flex-col gap-2"
          onSubmit={handleLogin}
        >
          <InputField type="text" field="email" onChange={handleInputChange} />
          <InputField
            type="password"
            field="password"
            onChange={handleInputChange}
          />
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <LoginButton category="login" text="Login" />
        </form>
        {/* END: 폼 영역 */}
        <div className="flex justify-center gap-1 py-6">
          <p className="text-churead-gray-600">계정이 없으신가요?</p>
          <Link to="/sign-up" className="text-churead-blue">
            가입하기
          </Link>
        </div>
        <p className="text-gray-500 text-sm relative mb-4">
          {" "}
          <i className="block w-full h-[1px] bg-churead-gray-300 bg-opacity-15 absolute top-1/2 transform -translate-y-1/2" />{" "}
          <span className="bg-churead-black relative z-10 px-2"> or </span>{" "}
        </p>
        {/* START: 소셜 로그인 영역 */}
        <LoginButton
          category="socialLogin"
          text="Continue with Google"
          onClick={handleGoogleLogin}
        />
        {/* END: 소셜 로그인 영역 */}
      </div>
    </div>
  );
};

export default Login;
