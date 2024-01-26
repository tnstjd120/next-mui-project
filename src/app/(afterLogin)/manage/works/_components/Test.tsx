"use client";

import { useEffect, useState } from "react";

export const Test = () => {
  const [testData, setTestData] = useState<string[]>([]);

  const getTestData = async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });

    return ["kim", "kwon", "park", "soon"];
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestData();
      console.log("data ", data);
      setTestData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {testData.map((t, i) => (
        <p key={i}>{t}</p>
      ))}
    </div>
  );
};
