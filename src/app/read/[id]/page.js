/* 사용자와 상호작용하지 않기 때문에 서버컴포넌트로 동작한다 */

export default async function Read(props){
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${props.params.id}`,{ cache: 'no-store' });
  const topic = await resp.json();
  return(
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  )
}