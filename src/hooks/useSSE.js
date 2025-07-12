// hooks/useSSE.js
import { useEffect, useRef, useState } from "react";
import useNotification from "./useNotification";

/**
 * Server-Sent Events(SSE)를 통한 실시간 통신 관리 훅
 * 백엔드에서 발생하는 실시간 이벤트를 수신하고 처리
 */

const useSSE = () => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);

  // 알림 기능을 위한 훅 사용
  const { showNewPostNotification } = useNotification();

  useEffect(() => {
    // SSE 연결 생성
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const eventSource = new EventSource(`${API_BASE_URL}/events`);
    eventSourceRef.current = eventSource;

    // 연결 성공
    eventSource.onopen = () => {
      console.log("✅ SSE 연결 성공");
      setIsConnected(true);
    };

    // 메시지 수신
    eventSource.onmessage = (event) => {
      try {
        // eventData 객체
        // const eventData = {
        //   type: eventType,
        //   data: data,
        // };
        const result = JSON.parse(event.data);

        switch (result.type) {
          case "connected":
            console.log("🔗 SSE 연결 확인:", result.message);
            break;

          case "newPost":
            console.log("🔔 새 게시물 알림:", result.data);
            const { userName, content } = result.data;
            // TODO: 브라우저 알림 기능 구현
            showNewPostNotification("새 게시물 알림", {
              userName,
              content,
            });

            break;

          case "heartbeat":
            console.log(
              "💓 하트비트:",
              new Date(result.timestamp).toLocaleTimeString()
            );
            break;

          default:
            console.log("❓ 알 수 없는 이벤트:", result);
        }
      } catch (error) {
        console.error("❌ SSE 데이터 파싱 오류:", error);
      }
    };

    // 연결 오류
    eventSource.onerror = (error) => {
      console.error("❌ SSE 연결 오류:", error);
      setIsConnected(false);
    };

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("🔌 SSE 연결 해제");
      }
    };
  }, [showNewPostNotification]);

  return { isConnected };
};

export default useSSE;
