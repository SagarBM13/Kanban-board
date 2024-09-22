import React, { useState } from 'react';
import { FaFilter, FaChevronDown } from 'react-icons/fa';
import '../header.css';

const Header = ({ setGroupBy, groupBy, sortBy, setSortBy }) => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
    setShowFilterPopup(false);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setShowFilterPopup(false);
  };

  const toggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="filter-button" onClick={toggleFilterPopup}>
          <FaFilter className="filter-icon" />
          <span>Display</span>
          <FaChevronDown className="chevron-icon" />
        </div>

        {showFilterPopup && (
          <div className="filter-popup">
            <div className="filter-group">
              <label htmlFor="groupBy">Group By:</label>
              <select
                id="groupBy"
                value={groupBy}
                onChange={handleGroupByChange}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sortBy">Sort By:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortByChange}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;