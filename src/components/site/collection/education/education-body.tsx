"use client";
import { useEffect, useState } from "react";
import { getAllEducationAPI } from "@/services/data/api-fetch-data";

export default function EducationBody() {
  const [messages, setMessages] = useState<string[]>([]); // ✅ Ensure it's always an array

  useEffect(() => {
    const socket = getAllEducationAPI(setMessages);

    return () => {
      socket?.close(); // ✅ Ensure socket exists before closing
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Education Updates</h2>
      {messages.length === 0 ? (
        <p>No updates yet...</p>
      ) : (
        messages.map((msg, index) => <p key={index}>{msg}</p>) // ✅ No more undefined issue
      )}
    </div>
  );
}
