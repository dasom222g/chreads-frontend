import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { initialTags } from "../data/response";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
// import useSSE from "../hooks/useSSE";

const Home = () => {
  // logic
  const history = useNavigate();
  // API 기본 URL 설정
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const currentUser = auth.currentUser;

  const [feedList, setFeedList] = useState([]);

  // SSE 연결
  // const { isConnected } = useSSE();

  const handleEdit = (data) => {
    history(`/edit/${data._id}`); // edit페이지로 이동
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  const handleDelete = async (selectedItem) => {
    console.log("🚀 ~ handleDelete ~ selectedItem:", selectedItem);
    const filterList = feedList.filter((item) => item._id !== selectedItem._id);
    setFeedList(filterList);

    // TODO: 백엔드에 Delete 요청
    const result = await deletePost(selectedItem._id);
    console.log("🚀 ~ handleDelete ~ result:", result);
  };

  useEffect(() => {
    console.log("currentUser", currentUser);
    // 로그인상태 아니면 로그인페이지로 이동
    !currentUser && history("/login");
  });

  const getData = async () => {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    console.log("🚀 ~ getData ~ response:", response);
    const data = await response.json();
    console.log("🚀 data:", data);
  };

  useEffect(() => {
    // 페이지 진입시 딱 한번 실행
    // TODO: 백엔드에 Get 요청
    // 게시물 목록 가져오기
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        setFeedList(posts);
        return posts;
      } catch (error) {
        console.error("게시물 조회 실패:", error);
        throw error;
      }
    };

    fetchPosts();
  }, [API_BASE_URL]);

  // view
  return (
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header isLoggedIn={!!currentUser} />
      {/* END: 헤더 영역 */}
      <main className="h-full overflow-auto">
        {/* TODO */}
        {false && (
          <button type="button" onClick={getData}>
            데이터 가져오기
          </button>
        )}

        <div>
          {/* START: 피드 영역 */}
          <ul>
            {/* {isConnected ? "✅ 연결됨" : "🔴 연결 끊어짐"} */}
            {feedList.map((feed) => (
              <FeedItem
                key={feed._id}
                data={feed}
                tags={initialTags}
                isAuthor={feed.userId === currentUser.uid}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </ul>
          {/* END: 피드 영역 */}
        </div>
      </main>
      {/* START: 네비게이션 영역 */}
      <Nav />
      {/* END: 네비게이션 영역 */}
    </div>
  );
};

export default Home;
