/* 사용자와 상호작용하지 않기 때문에 서버컴포넌트로 동작한다 */

export default async function Read(props){
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`);
  const topic = await resp.json();
  return(
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  )
}