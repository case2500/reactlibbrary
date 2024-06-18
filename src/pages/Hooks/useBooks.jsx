import { useState } from "react";

export function useBooks() {
  const [books, setBooks] = useState([]);
  return {
    books,
    setBooks
  };
}
