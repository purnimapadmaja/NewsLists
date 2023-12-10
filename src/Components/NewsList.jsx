import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import NewsItems from "./NewsItems";
const NewsList = () => {
  const [errorText, setErrorMessage] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNewsList();
  }, []);

  const fetchNewsList = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=tesla&from=2023-11-10&sortBy=publishedAt&apiKey=56aa1f08897347cebb93d6451f9c9377"
      );

      if (response?.status === 200) {
        setNewsData(response.data.articles);
      } else {
        setNewsData([]);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setNewsData([]);
    }
  };

  const navigate = useNavigate();

  const handleReadMoreClick = (newsItem) => {
    navigate(`/news/${encodeURIComponent(newsItem.title)}`, {
      state: {
        newsItem, //
      },
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "10px",
  };

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  };

  const totalItems = newsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <h1>News List</h1>
      <form>
        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>
      <Table striped bordered variant="dark" style={tableStyle}>
        <thead>
          <tr>
            <td>Author</td>
            <td>Source</td>
            <td>Title</td>
            <td>Description</td>
            <td>URL</td>
            <td>Published At Date</td>
            <td>Read More</td>
          </tr>
        </thead>
        <tbody>
          {newsData.length > 0 ? (
            newsData
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((eachItem) => (
                <tr key={eachItem.publishedAt}>
                  <td>{eachItem.author}</td>
                  <td>{eachItem.source.name}</td>
                  <td>{eachItem.title}</td>
                  <td>{eachItem.description}</td>
                  <td>
                    <a
                      href={eachItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {eachItem.url}
                    </a>
                  </td>
                  <td>{eachItem.publishedAt}</td>
                  <td>
                    <button onClick={() => handleReadMoreClick(eachItem.url)}>
                      Read More
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={7}>
                {errorText && <h1>{errorText}</h1>}
                {!errorText && "No data available"}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination style={paginationStyle}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default NewsList;
