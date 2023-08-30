import { useState, useEffect } from 'react';

const History = (history, setHistory) => {
  const [listeningHistory, setListeningHistory] = useState(
    JSON.parse(localStorage.getItem('listeningHistory')) || []
  );
  const [lastListened, setLastListened] = useState(
    JSON.parse(localStorage.getItem('lastListened')) || {}
  );

  useEffect(() => {
    localStorage.setItem('listeningHistory', JSON.stringify(listeningHistory));
  }, [listeningHistory]);

  useEffect(() => {
    localStorage.setItem('lastListened', JSON.stringify(lastListened));

    const timer = setTimeout(() => {
      if (lastListened.show && lastListened.episode && lastListened.progress) {
        setListeningHistory((prevHistory) => [
          ...prevHistory,
          {
            show: lastListened.show,
            episode: lastListened.episode,
            progress: lastListened.progress,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }, 0);

    // Clean up the timer if component unmounts or 'lastListened' changes
    return () => clearTimeout(timer);

  }, [lastListened]);

  // Function to reset listening history and last listened episode
  const handleResetProgress = () => {
    setListeningHistory([]);
    setLastListened({});
  };

  // Render the History component
  return (
    <div className="history-container">
      <h1>Listening History</h1>
      {listeningHistory.length > 0 ? (
        <ul>
          {listeningHistory.map((episode, index) => (
            <li key={index}>
              <p>Show: {episode.show}</p>
              <p>Episode: {episode.episode}</p>
              <p>Progress: {episode.progress} seconds</p>
              <p>Timestamp: {episode.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listening history found.</p>
      )}
      <button onClick={handleResetProgress}>Reset Listening Progress</button>
    </div>
  );
};

export default History;

//Displays a user's listening history.
//Lists the podcasts and episodes they've listened to, along with progress and timestamps.
//Users can reset their listening history.