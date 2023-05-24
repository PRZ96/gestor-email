// EmailList.js
import React from "react";
import EmailFilter from "./EmailFilter";

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const parts = date.split("/"); // Divide la date en [day, month , year]
  const month = parseInt(parts[0], 10); // Obtiene month como número
  const day = parseInt(parts[1], 10); // Obtiene day como número
  return `${months[month - 1]} ${day}`; // Retorna el formato deseado: "month day"
}

function formatDescription(description) {
  let shortDescription = description.substring(0, 43) + "...";
  return shortDescription;
}

function EmailList({ emails, onEmailClick, filter, handleFilterChange, selectedEmailId }) {
  return (
    <div className="email-list">
      <EmailFilter filter={filter} onFilterChange={handleFilterChange} />
      <ul>
        {emails.map((email) => (
          <li key={email.id} onClick={() => onEmailClick(email.id)} >
            <div className={email.id === selectedEmailId ? "emails active" : "emails"}>
              {email.isReaded ? "" : <i className="bi bi-circle-fill readed"></i>}
              <div className="heading">
                <p className="sender">
                  <i className="bi bi-person"></i>
                  {email.user}
                </p>
                <p className="date">{formatDate(email.date)}</p>
              </div>
              <p className="subject">{email.subject}</p>
              <p className="short-description">
                {formatDescription(email.body)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;
