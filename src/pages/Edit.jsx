import { Link, useNavigate, useParams } from "react-router-dom";
import PostInput from "../components/PostInput";
import { useEffect, useState } from "react";

const Edit = () => {
  // logic
  const { id } = useParams();
  const history = useNavigate();
  // API 기본 URL 설정
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [feedItem, setFeedItem] = useState(null);
  const [value, setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
  };

  // 게시물 수정
  const updatePost = async (postId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("게시물 수정 성공:", result);
      return result;
    } catch (error) {
      console.error("게시물 수정 실패:", error);
      throw error;
    }
  };

  // PUT /posts/:id - 특정 게시물 수정
  const handleEdit = async (event) => {
    event.preventDefault(); // 폼 제출시 새로고침 방지 메소드

    // TODO: 백엔드에 Put 요청
    const editItem = { ...feedItem, content: value };

    const result = await updatePost(editItem._id, editItem);
    console.log("🚀 ~ handleEdit ~ result:", result);
    result.acknowledged
      ? history("/")
      : alert("게시물이 제대로 수정되지 않았습니다");
  };

  // GET /posts/:id - 특정 게시물 조회
  useEffect(() => {
    // 페이지 진입시 딱 한번 실행
    // TODO: 백엔드에 Get 요청
    console.log("id", id);
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        post && setFeedItem(post);
        console.log("🚀 ~ fetchPost ~ post:", post);
        return post;
      } catch (error) {
        console.error("게시물 조회 실패:", error);
        throw error;
      }
    };

    fetchPost();
  }, [API_BASE_URL, id]);

  useEffect(() => {
    console.log("feedItem", feedItem);
  }, [feedItem]);

  // view
  return (
    <div className="h-full">
      <header className="fixed max-w-[572px] mx-auto px-4 py-6 text-center top-0 left-0 right-0">
        <Link
          to="/"
          className="absolute left-4 text-churead-gray-300 text-opacity-60"
        >
          취소
        </Link>
        <h3 className="font-bold">스레드 편집</h3>
      </header>
      <main className="h-full pt-[72px] pb-[88px] overflow-hidden">
        <div className="h-full overflow-auto">
          <form id="post" onSubmit={handleEdit}>
            {/* START: 사용자 입력 영역 */}

            <PostInput
              defaultValue={feedItem?.content || ""}
              userName={feedItem?.userName || ""}
              userProfileImage={
                feedItem?.userProfileImage ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              onChange={handleChange}
            />
            {/* END: 사용자 입력 영역 */}
            {/* START: 수정 버튼 영역 */}
            <div className="w-full max-w-[572px] flex items-center fixed bottom-0 lef p-6">
              <p className="text-churead-gray-300 text-opacity-60">
                누구에게나 답글 및 인용 허용
              </p>
              <button
                type="submit"
                className="ml-auto px-5 py-2 bg-white text-churead-black rounded-3xl font-bold"
              >
                수정
              </button>
            </div>
            {/* END: 수정 버튼 영역 */}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Edit;
