"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-sky-900 text-sky-200 py-2 px-4"
    >
      {pending ? "Přidávám..." : "Přidat"}
    </button>
  );
}
