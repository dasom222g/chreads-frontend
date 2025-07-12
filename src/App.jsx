import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  // logic
  const [isLoading, setIsLoading] = useState(true); // 진입시 무조건 로딩

  const init = async () => {
    // firebase에서 로그인 데이터 가져오기
    await auth.authStateReady(); // 로그인상태 변화 감지하여 감지가 끝나면 로딩 false
    console.log("인증 완료", auth);

    // 준비된 이후 실행
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // view
  return (
    <div className="bg-churead-black h-full text-white overflow-auto">
      {isLoading ? (
        <p className="text-2xl">Loading..</p>
      ) : (
        <div className="max-w-[572px] mx-auto h-full">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/post" element={<Post />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
