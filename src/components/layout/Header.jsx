import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Header = ({ isLoggedIn }) => {
  // logic
  const history = useNavigate();

  const handleAuth = async () => {
    if (isLoggedIn) {
      // 로그아웃 시키기
      console.log("logout");
      const ok = window.confirm("Are you sure logout");
      if (!ok) return;
      // 로그아웃 선택시 로그인페이지로 리다이렉션
      await auth.signOut();
    }
    // 로그인 페이지로 이동
    history("/login");
  };

  // view
  return (
    <header className="max-w-[572px] fixed top-0 left-0 right-0 mx-auto">
      <h1 className="py-2 text-center">
        <Link to="/" className="w-fit inline-block">
          <img src="./images/logo.svg" className="mx-auto h-16" alt="로고" />
        </Link>
      </h1>
      <div className="absolute top-1/2 tranform -translate-y-1/2 right-5 rounded-lg bg-white text-churead-black flex items-center px-2 text-sm">
        <button type="button" className="p-1" onClick={handleAuth}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
};

export default Header;
