"use client";

import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const sendData = async () => {
    setResult("전송 중...");

    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        date: new Date().toISOString()
      })
    });

    const text = await res.text();

    if (!res.ok) {
      setResult("전송 실패: " + text);
      return;
    }

    setResult("전송 완료: " + text);
  };

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h3>서버 전송 테스트</h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="전송할 내용을 입력하세요"
        style={{
          width: "100%",
          height: 120,
          padding: 10,
          boxSizing: "border-box"
        }}
      />

      <button
        onClick={sendData}
        style={{
          marginTop: 12,
          padding: "10px 16px"
        }}
      >
        전송
      </button>

      <p style={{ marginTop: 12 }}>{result}</p>
    </main>
  );
}
