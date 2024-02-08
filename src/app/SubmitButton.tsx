"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <div className="flex mt-4 items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-600"
        type="submit"
        disabled={pending}>
        Create Todo
      </button>
    </div>
  )
}

export function SubmitDeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-600"
      type="submit"
      disabled={pending}>
      Excluir
    </button>
  )
}