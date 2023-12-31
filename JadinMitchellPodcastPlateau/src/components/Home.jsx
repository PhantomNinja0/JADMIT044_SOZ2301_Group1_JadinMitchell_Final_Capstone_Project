import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Home = ({ onPodcastClick, selectedPodcast, onNavigate }) => {
  // State variables
  const [showPodcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
     // Fetch podcast data on component mount
    axios
      .get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        setPodcast(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show data:', error);
        setLoading(false);
      });
  }, []);

   // Handle podcast click
  const handlePodcastClick = (podcast) => {
    onPodcastClick(podcast);
  };

   // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   // Handle genre selection change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

   // Handle genre selection change
  const handleGenreChange = (event) => {
    const selectedGenreValue = event.target.value;
    setSelectedGenre(selectedGenreValue);
  };

  const handleNavigation = (page) => {
    // Call the 'onNavigate' function passed as a prop with the selected page
    onNavigate(page);
  };

   // Format date as a string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

   // Filter podcasts based on search term
  const filteredPodcasts = showPodcast.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  function filterByValue(array, string) {
      return array.filter(o =>
          Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toLowerCase())));
  }
  
  // Filter podcasts based on selected genre
  const genreFilteredPodcasts = selectedGenre
    ? filterByValue(filteredPodcasts, selectedGenre)
    : filteredPodcasts;

    

    // Sort podcasts based on selected sort option
  const sortedPodcasts = [...genreFilteredPodcasts].sort((a, b) => {
    if (sortOption === 'az') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'za') {
      return b.title.localeCompare(a.title);
    } else if (sortOption === 'ascDate') {
      return new Date(a.updated) - new Date(b.updated);
    } else if (sortOption === 'descDate') {
      return new Date(b.updated) - new Date(a.updated);
    }
  });

  
  // Genre data for the dropdown
  const genreData = [
    'Personal Growth',
    'True Crime and Investigative Journalism',
    'History',
    'Comedy',
    'Entertainment',
    'Business',
    'Fiction',
    'News',
    'Kids and Family',
  ];

   // Render the Home component
  return (
    <div className="home-container">
      
      <div className="filter-container">
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="az">Sort A-Z</option>
          <option value="za">Sort Z-A</option>
          <option value="ascDate">Sort Ascending by Date</option>
          <option value="descDate">Sort Descending by Date</option>
        </select>
      </div>
      <h1>All Shows</h1>
      <select className='genreSelect' value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a Genre</option>
          {genreData.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
      </select>
        
      </div>
      {loading ? (
        <p>Loading podcast list...</p>
      ) : (
        <ul className="show-list">
          {sortedPodcasts.map((show) => (
            <li key={show.id} onMouseDown={() => handlePodcastClick(show)} onClick={() => handleNavigation('preview')}>
              <div className={`show-info ${show.id === selectedPodcast?.id ? 'selected' : ''}`}>
                <img src={show.image} className="show-image" alt={show.title} />
                <div className="show-details">
                  <h3 className="show-title">{show.title}</h3>
                  <p className="show-seasons">Numbers of seasons: {show.seasons}</p>
                  <p className="show-updated">Updated: {formatDate(show.updated)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

 // Render the Home component
Home.propTypes = {
  onPodcastClick: PropTypes.func.isRequired,
  selectedPodcast: PropTypes.object,
};

export default Home;

//Displays a list of podcasts available to explore.
//Users can click on a podcast to view more details.
//Offers search and sorting options to find podcasts easily.
