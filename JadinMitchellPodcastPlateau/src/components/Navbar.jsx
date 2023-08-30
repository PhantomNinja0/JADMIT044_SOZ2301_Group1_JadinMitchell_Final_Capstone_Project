import PropTypes from 'prop-types';
import logo from '../../public/logo.png'

// Define the Navbar component
const Navbar = ({ onNavigate }) => {
  // Function to handle navigation to different pages
  const handleNavigation = (page) => {
    // Call the 'onNavigate' function passed as a prop with the selected page
    onNavigate(page);
  };

  // Render the Navbar component
  return (
    <div className="navbar-container">
      <div><img className='logo' src={logo} alt="" /></div>
      {/* Button to navigate to the 'home' page */}
      <div className="button-grid">
      <button className='navbutton' onClick={() => handleNavigation('home')}>Home</button>
      {/* Button to navigate to the 'preview' page */}
      <button className='navbutton' onClick={() => handleNavigation('preview')}>Details</button>
      {/* Button to navigate to the 'favorite' page */}
      <button className='navbutton' onClick={() => handleNavigation('favorite')}>Favorites</button>
      {/* Button to navigate to the 'history' page */}
      <button className='navbutton' onClick={() => handleNavigation('history')}>History</button>
      </div>
    </div>
  );
};

// Prop type validation for the 'onNavigate' prop
Navbar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

// Export the Navbar component as the default export
export default Navbar;

//This component provides navigation buttons for different sections of the app.
//Users can easily switch between the Home, Favorites, Preview, and History pages.
//It helps users quickly access different functionalities without navigating through complex menus.
