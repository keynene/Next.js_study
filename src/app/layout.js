/* 만약 npm run dev 했는데 topics의 내용을 못불러온다면? */
// 새로운 터미널을 파서 npx json-server --port 9999 --watch db.json 해주자
// db.json 서버도 켜주고 db를 불러와야 데이터를 가지고 올 수 있다!
// ************************************************************************


// "use client"  //클라이언트 컴포넌트로 변경하는 방법 (기본적으로 nextjs는 서버컴포넌트임)
// import { useEffect, useState } from "react";
import "./globals.css";

import Link from "next/link";

//metadata는 서버 컴포넌트라 클라이언트 컴포넌트로 바꿔버리면 에러가 난다 
//("use client"로 클라이언트 설정을 해줬을 때 말이다)
export const metadata = {
  title: "Web tutorials",
  description: "Generated by noi",
};

export default async function RootLayout({ children }) {
  // const [topics, setTopics] = useState([]);
  // useEffect(()=>{
  //   fetch('http://localhost:9999/topics')
  //     .then(resp=>resp.json())
  //     .then(result=>{
  //       setTopics(result);
  //     })
  // },[])

  // const resp = await fetch('http://localhost:9999/topics');
  const resp = await fetch('http://localhost:9999/topics', {cache: 'no-store'});
  const topics = await resp.json();

  return (
    <html>
      <body>
        <h1><Link href="/">WEB</Link></h1>
        <ol>
          {topics.map((topic)=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
        {children}
        <ul>
          <li><Link href="/create">Create</Link></li>
          <li><Link href="/update/1">Update</Link></li>
          <li><input type="button" value="delete" /></li>
        </ul>
      </body>
    </html>
  );
}



/*서버 컴포넌트의 장점 */
/*
1. 용량이 줄어든다. 클라이언트로 js를 전송하지 않으니까 용량이 줄어든다.
2. api와 js 서버가 같다면 굉장히 빠르다.
3. 서버측에서 렌더링을 끝내고 클라이언트측에 보내기때문에 js를 로드할 수 없는 환경에서도 정상동작한다. (안정적이다)
   : 서버측에서 동적으로 생성한 정적인 내용을 클라이언트로 전달했기 때문임 (SSG)
*/