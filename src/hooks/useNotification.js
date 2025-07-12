// hooks/useNotification.js
import { useEffect } from "react";

/**
 * 브라우저 알림 기능을 관리하는 훅
 * 권한 요청 및 알림 표시 기능 제공
 */
const useNotification = () => {
  // 컴포넌트 마운트 시 알림 권한 요청
  useEffect(() => {
    // 권한이 아직 결정되지 않은 경우 권한 요청
    if (Notification.permission === "default") {
      console.log("권한을 설정해주세요");
      Notification.requestPermission().then((permission) => {
        console.log("알림 권한 상태:", permission);
      });
    }
  }, []);

  /**
   * 새 게시물 알림을 표시하는 함수
   * @param {string} title - 알림 제목
   * @param {object} postData - 게시물 데이터 { userName, content }
   */
  const showNewPostNotification = (title, { userName, content }) => {
    // 권한이 허용된 경우에만 알림 표시
    if (Notification.permission === "granted") {
      console.log("권한있음!!!");
      new Notification(title, {
        body: `${userName}님이 새글을 작성하셨습니다.`, // 알림 내용
      });

      // 3초 후 자동으로 알림 닫기
      // setTimeout(() => {
      //   notification.close();
      // }, 3000);
    } else {
      // 권한이 없는 경우 콘솔에만 로그
      console.log(
        "🔕 알림 권한이 없어 콘솔에만 표시:",
        title,
        `${userName}: ${content}`
      );
    }
  };

  // 외부에서 사용할 함수 반환
  return {
    showNewPostNotification,
  };
};

export default useNotification;
