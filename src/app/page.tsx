import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SubmitButton, SubmitDeleteButton } from "./SubmitButton";

type Todo = {
  name: string;
  description: string;
}

export default async function Home() {
  async function createTodo(formData: FormData) {
    'use server'

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

async function TodoList() {
  const todos = await prisma.todo.findMany();

  async function deleteTodo(formData: FormData) {
    'use server'

    const id = formData.get('id') as string

    await prisma.todo.delete({
      where: {
        id: id
      }
    })

    revalidatePath("/")
  }

  return (
    <ul className="mt-20 flex flex-col gap-4">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="flex gap-4">
            <p className="min-w-60">{todo.name} - {todo.description}</p>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <SubmitDeleteButton />
            </form>
          </li>
        )
      })}
    </ul >
  )
}