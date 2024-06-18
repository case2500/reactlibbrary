import { useState } from "react";

export function useOpenBook() {
  const [openBook, setOpenBook] = useState();
  return {
    openBook,
    setOpenBook
  };
}
