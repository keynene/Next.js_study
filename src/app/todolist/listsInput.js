"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ListsInput(){
  const [task, setTask] = useState('');
  const router = useRouter();

  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      const task = e.target.task.value;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task})
      }

      fetch(process.env.NEXT_PUBLIC_API_URL+'lists', options)
        .then(resp => resp.json())
        .then(result => {
          console.log(result);
          router.refresh();
        })

        setTask('');

    }}>
      <input
        type="text"
        name="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <input type="submit" value="Add" />
    </form>
  )
}