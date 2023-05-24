import React, { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('/mail-data.json')
      .then(response => response.json())
      .then(data => {
        const emailsWithId = data.map((email, index) => ({
          ...email,
          id: index + 1,
        }));
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="app">

    </div>
  );
}

export default App;
