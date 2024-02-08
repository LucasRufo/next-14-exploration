import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Todo = {
  name: string;
  description: string;
}

export default async function Home() {
  async function createTodo(formData: FormData) {
    'use server'

    console.log(formData.get('name'), formData.get('description'))

    const todo: Todo = {
      name: formData.get('name'),
      description: formData.get('description'),
    } as Todo

    await prisma.todo.create({
      data: {
        name: todo.name,
        description: todo.description
      }
    })

    console.log("passou do prisma")

    revalidatePath("/")
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Next.js 14 Todo List</h1>

      <form action={createTodo} className="flex flex-col mt-10">
        <label className="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Name
        </label>
        <input
          className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          name="name"
          type="text"
          placeholder="Name"
        />

        <label className="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <input
          className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          type="text"
          placeholder="Description"
        />

        <SubmitButton />
      </form>

      <TodoList />
    </main>
  );
}

function SubmitButton() {
  return (
    <div className="flex mt-4 items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit">
        Create Todo
      </button>
    </div>
  )
}

async function TodoList() {
  const todos = await prisma.todo.findMany();

  return (
    <ul className="mt-20">
      {todos.map((todo) => {
        return (
          <li key={todo.id}>{todo.name} - {todo.description}</li>
        )
      })}
    </ul>
  )
}