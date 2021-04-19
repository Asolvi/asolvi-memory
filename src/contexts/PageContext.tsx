import React, { useContext, useState } from "react";
import { Page } from "../Types";

interface PageContextType {
  page: Page;
  setPage: (page: Page) => void;
}

const PageContext = React.createContext<PageContextType | undefined>(undefined);

interface PageProviderProps {
  children: JSX.Element;
}

export const PageProvider = (props: PageProviderProps) => {
  const [page, setPage] = useState(Page.Welcome);

  return (
    <PageContext.Provider value={{ page: page, setPage: setPage }}>
      {props.children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};

export default PageContext;
