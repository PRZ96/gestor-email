import React from "react";

function EmailFilter({ filter, onFilterChange }) {
  return (
    <div className="filters">
      <button
        className={filter === "inbox" ? "active" : ""}
        onClick={() => onFilterChange("inbox")}
      >
        <i className="bi bi-inbox-fill"></i>
        Inbox
      </button>
      <button
        className={filter === "deleted" ? "active" : ""}
        onClick={() => onFilterChange("deleted")}
      >
        <i className="bi bi-trash3"></i>
        Trash
      </button>
      <button
        className={filter === "spam" ? "active" : ""}
        onClick={() => onFilterChange("spam")}
      >
      <i className="bi bi-cpu-fill"></i>
        Spam
      </button>
    </div>
  );
}

export default EmailFilter;
