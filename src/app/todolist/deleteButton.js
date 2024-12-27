"use client"

import { useRouter } from "next/navigation";

export default function DeleteButton(props){
  const router = useRouter();

  return(
    <input 
      type="button"
      value="x"
      style={{marginLeft:"50px"}}
      onClick={()=>{
        const options = {method:'DELETE'}
        const taskId = props.id;

        fetch(process.env.NEXT_PUBLIC_API_URL+`lists/${taskId}`, options)
          .then(resp => resp.json())
          .then(result => {
            console.log(result)
            router.refresh();
          })
      }} 
    />
  )
}