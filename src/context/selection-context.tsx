"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type SelectionContextType = {
  selected: Set<string>;
  toggle: (id: string) => void;
  clear: () => void;
  selectOne: (id: string) => void;
};

const SelectionContext = createContext<SelectionContextType | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    const newSelected = new Set(selected);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    setSelected(newSelected);
  }

  function clear() {
    setSelected(new Set());
  }

  function selectOne(id: string) {
    setSelected(new Set([id]));
  }

  return (
    <SelectionContext.Provider value={{ selected, toggle, clear, selectOne }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (context === null) {
    throw new Error(
      "useSelectionContext must be used within SelectionProvider",
    );
  }
  return context;
}
