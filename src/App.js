import React, { useState, useEffect } from 'react';
import EmailList from './components/EmailList';
import EmailPreview from './components/EmailPreview';

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [filter, setFilter] = useState('inbox');

  useEffect(() => {
    fetch('/mail-data.json')
      .then(response => response.json())
      .then(data => {
        const emailsWithId = data.map((email, index) => ({
          ...email,
          id: index + 1,
          user: addSender(email.from),
        }));
        setEmails(emailsWithId);
      })
      .catch(error => console.log(error));
  }, []);

  function addSender(mail) {
    const parts = mail.split("@");
      let capLetter = parts[0].charAt(0).toUpperCase();
      let remainder = parts[0].slice(1);
      return capLetter + remainder;
  }

  const handleEmailClick = (emailId) => {
    setSelectedEmailId(emailId);
  };

  const handleEmailStatusChange = (emailId, status) => {
    const updatedEmails = emails.map(email => {
      if (email.id === emailId) {
        return {
          ...email,
          isReaded: status === 'inbox',
          isDeleted: status === 'deleted',
          isSpam: status === 'spam'
        };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredEmails = emails.filter(email => {
    if (filter === 'inbox') {
      return !email.isDeleted && !email.isSpam;
    } else if (filter === 'deleted') {
      return email.isDeleted;
    } else if (filter === 'spam') {
      return email.isSpam;
    }
    return false;
  });

  return (
    <div className="app">
      <EmailList
        emails={filteredEmails}
        selectedEmailId={selectedEmailId}
        onEmailClick={handleEmailClick}
        onEmailStatusChange={handleEmailStatusChange}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <EmailPreview
        selectedEmailId={selectedEmailId}
        emails={filteredEmails}
        onEmailStatusChange={handleEmailStatusChange}
      />
    </div>
  );
}

export default App;
