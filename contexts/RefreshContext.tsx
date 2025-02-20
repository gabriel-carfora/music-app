import { createContext, useContext, useState } from "react";

interface RefreshContextType {
  refreshStates: Record<string, number>;
  refreshView: (viewName: string) => void;
}

const RefreshContext = createContext<RefreshContextType>({
  refreshStates: {},
  refreshView: () => {},
});

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshStates, setRefreshStates] = useState<Record<string, number>>(
    {}
  );

  const refreshView = (viewName: string) => {
    setRefreshStates((prev) => ({
      ...prev,
      [viewName]: (prev[viewName] || 0) + 1,
    }));
  };

  return (
    <RefreshContext.Provider value={{ refreshStates, refreshView }}>
      {children}
    </RefreshContext.Provider>
  );
}

export const useRefresh = (viewName: string) => {
  const context = useContext(RefreshContext);
  return {
    refreshCount: context.refreshStates[viewName] || 0,
    refresh: () => context.refreshView(viewName),
  };
};
