"use client";

import { Task } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";

const postData = async (url: string, data = {}) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

const getData = async (url: string) =>
  fetch(url, {
    method: "GET",
  });

export default function Home() {
  const [contentInput, setContentInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const changeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setContentInput(e.target.value);
  };

  const getTasks = async () => {
    const res = await getData("/api/tasks");
    const data = await res.json();
    if (!data.tasks) return;
    setTasks(data.tasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      {tasks.map((item) => (
        <p key={item.id}>{item.content}</p>
      ))}
      <input onChange={changeTask} />
      <div
        onClick={async () => {
          const res = await postData("/api/tasks", {
            content: contentInput,
          });
          getTasks();
        }}
        style={{
          cursor: "pointer",
          backgroundColor: "#aaee00",
          width: "fit-content",
        }}
      >
        <p>click</p>
      </div>
    </div>
  );
}
