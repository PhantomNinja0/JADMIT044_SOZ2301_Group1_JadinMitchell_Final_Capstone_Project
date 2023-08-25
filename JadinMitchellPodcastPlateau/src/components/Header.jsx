import { useEffect, useState } from 'react';
import logo from './logo.png'
import './Header.css'; // Import the custom CSS file for header styles

const Header = () => {
  const [showPodcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [selectedGenre, setSelectedGenre] = useState('');

   // Handle podcast click
   const handlePodcastClick = (podcast) => {
    onPodcastClick(podcast);
  };
  console.log(showPodcast)
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

  
  // Filter podcasts based on selected genre
  const genreFilteredPodcasts = selectedGenre
    ? filteredPodcasts.filter((show) =>
        show.genres.some((genre) =>
          genre.toLowerCase().includes(selectedGenre.toLowerCase())
        )
      )
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

  return (
    <div>
      <header className="app-header">
        <div><img className='logo' src={logo} alt="" /></div>
        <div className='menu'>
          <nav>
            <ul>
              <li><a href="/Home">Home</a></li>
              <li><a href="/Favourites">Favourites</a></li>
              <li><a href="/About">About</a></li>
            </ul>
          </nav>
        </div>
      </header><div className="search-sort-container">
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
      <div className="genres-container">
        <h2>Genres</h2>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a Genre</option>
          {genreData.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
    
  );
};

export default Header;
