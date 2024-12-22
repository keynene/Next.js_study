
"use client"

import { useRouter } from "next/navigation";

  //onSubmit이 클라이언트 컴포넌트에서만 사용가능하기 때문
export default function Create(){
  const router = useRouter();

  return(
    <form onSubmit={(e)=>{
      e.preventDefault();

      //e.target을 하면 target이 form태그를 가리키게 됨
      const title = e.target.title.value;
      const body = e.target.body.value;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title,body})
      }

      fetch(`http://localhost:9999/topics`, options)
        .then(res=>res.json())
        .then(result=>{
          console.log(result);
          const lastid = result.id;
          router.push(`/read/${lastid}`)
        })
    }}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  )
}