import PropTypes from 'prop-types'
import vidBG from "/Background.mp4"
import "./styles.css"

export default function Authentication(props){

const {email, setEmail, password, setPassword, isAuthenticated, setIsAuthenticated} = props

const handleSubmit = () =>{
    if(email && password){
        setIsAuthenticated(true)

        console.log('isAuthenticated',isAuthenticated)
        
    }else{
        console.log('is not Authenticated',!isAuthenticated)
    }
}



return (
    <>
      <div className='form-div'>
        <div className="vid-div">
          <video class="video-slider active" autoPlay muted loop>
            <source src={vidBG} type="video/mp4"/>
          </video>
        </div>

        <div className='container'>
        <div className='top'>
          <img className='' src="./logo.png" width= '150px' />
          <h1 className ='main-heading'>Podcast Plateau</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '300px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <label htmlFor="email" style={{ marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
          <label htmlFor="password" style={{ marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="submitBtn"
          >
            Sign-in
          </button>
        </form>
        </div>
      </div>
    </>
  );
  
}

Authentication.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired,
  };
  
  
