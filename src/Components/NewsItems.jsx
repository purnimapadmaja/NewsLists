import React from "react";
import { useLocation } from "react-router-dom";

const NewsItems = () => {
  const location = useLocation();
  const { newsItems } = location.state || {};
  const { title, description } = newsItems || {};

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default NewsItems;
