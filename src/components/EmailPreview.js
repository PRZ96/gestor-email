import React from "react";
import { format, parse } from "date-fns";

function EmailPreview({ selectedEmailId, emails, onEmailStatusChange }) {
  const handleStatusChange = (status) => {
    onEmailStatusChange(selectedEmailId, status);
  };

  function formatDate(date) {
    const objDate = parse(date, "M/d/yyyy", new Date());
    const formatedDate = format(objDate, "EEEE, MMMM d");

    return formatedDate;
  }

  const selectedEmail = emails.find((email) => email.id === selectedEmailId);

  if (!selectedEmail) {
    return (
      <div className="email-preview">
        <div className="no-mail">
          <i className="bi bi-envelope"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="email-preview">
      <div className="email-header">
        <h2>{selectedEmail.subject}</h2>
        <div className="email-actions">
          <button onClick={() => handleStatusChange("inbox")}>
            <i className="bi bi-inbox-fill"></i>
          </button>
          <button onClick={() => handleStatusChange("deleted")}>
            <i className="bi bi-trash3"></i>
          </button>
          <button onClick={() => handleStatusChange("spam")}>
            <i className="bi bi-cpu-fill"></i>
          </button>
        </div>
      </div>
      <div className="email-card">
        <div className="email-content">
          <div className="content-header">
            <p className="from">
              {selectedEmail.user} <span>&lt;{selectedEmail.from}&gt;</span>
            </p>
            <p className="date">{formatDate(selectedEmail.date)}</p>
          </div>
          <p className="body">{selectedEmail.body}</p>
          {/* {selectedEmail.attachements &&
            selectedEmail.attachements.length > 0 && (
              <div className="attachments">
                <p>Adjuntos:</p>
                <ul>
                  {selectedEmail.attachements.map((attachement, index) => (
                    <li key={index}>
                      <a
                        href={attachement.file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {attachement.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
}

export default EmailPreview;
