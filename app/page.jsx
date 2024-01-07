"use client";

import { useCompletion } from "ai/react";

export default function Home() {
  const { input, completion, handleInputChange, handleSubmit } =
    useCompletion();
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit}>
        <input
          className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-3 shadow-xl p-2 dark:text-black"
          value={input}
          placeholder="Enter your commit message"
          onChange={handleInputChange}
        />
      </form>
      {completion ? (
        <div className="whitespace-pre-wrap">{completion}</div>
      ) : (
        <div>
          Enter your commit message and hit enter to generate 3 variations
        </div>
      )}
    </div>
  );
}
