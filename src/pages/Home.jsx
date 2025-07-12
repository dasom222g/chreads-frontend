import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { initialFeedList, initialTags } from "../data/response";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  // logic
  const history = useNavigate();

  const [feedList, setFeedList] = useState(initialFeedList);
  const [userUID, setuserUID] = useState("");

  const handleEdit = (data) => {
    history("/edit"); // edit페이지로 이동
  };

  // 현재 로그인된 사용자 정보
  const user = auth.currentUser; // User | null

  const handleDelete = (selectedItem) => {
    const filterList = feedList.filter((item) => item.id !== selectedItem.id);
    setFeedList(filterList);

    // TODO: 백엔드에 Delete 요청
  };

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
    // 페이지 진입시 유저 고유ID저장
    setuserUID(user.uid);
  }, [user]);

  useEffect(() => {
    console.log("🚀 ~ Home ~ userUID:", userUID);
  }, [userUID]);

  // view
  return (
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header />
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
            {feedList.map((feed) => (
              <FeedItem
                key={feed.id}
                data={feed}
                tags={initialTags}
                isAuthor={feed.userId === userUID}
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
