import ListsInput from "./listsInput";

export default async function ToDoList(){
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'lists', {cache: 'no-store'})
  const lists = await resp.json();

  return(
    <div>
      <h1>To-Do List</h1>
      <ListsInput />
      <ul>
        {lists.map((list) => (
          <li key={list.id} data-testid="task-item">
            {list.content}
          </li>
        ))}
      </ul>
    </div>
  )
}