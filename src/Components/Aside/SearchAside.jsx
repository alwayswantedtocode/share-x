import React, { useEffect } from "react";
import "./Search.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "../../API/axios";
const SearchAside = ({
  search,
  showResult,
  searchResult,
  setShowResult,
  setSearchResult,
  handleShowResult,
}) => {
  const searchName = useLocation().search;

  useEffect(() => {
    if (search.trim() === "") {
    //   setSearchResult([]);
      setShowResult(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `/api/users/search?searchName=${search}`
        );
        console.log(response.data);
        setShowResult(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, [search]);
  return (
    <div className="search-Aside">
      {searchResult.map((results) => {
        return (
          <Link to={`/profilepage?search=${search}`}>
            <div className="result-content">
              <p>{}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchAside;
