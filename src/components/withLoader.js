import React, { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

const withLoader = (Component) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Reset loading state khi component mount
      setIsLoading(true);
      
      // Tăng thời gian loading lên 1.5 giây (1500ms) để người dùng thấy rõ hơn
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // Thay đổi từ 500ms lên 1500ms

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <PageLoader />;
    }

    return <Component {...props} />;
  };
};

export default withLoader;
