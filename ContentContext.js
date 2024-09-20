import React, { createContext, useContext, useState, useEffect } from "react";
import { getContentById } from "../services/contentService";

const ContentContext = createContext();

export function useContent() {
  return useContext(ContentContext);
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      // Mock content fetch
      const data = await Promise.all([
        getContentById("1"),
        getContentById("2"),
        getContentById("3"),
      ]);
      setContent(data);
    };

    fetchContent();
  }, []);

  const value = {
    content,
    getContentById: (id) => getContentById(id),
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
