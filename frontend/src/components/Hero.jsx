const Hero = () => {
  return (
    <div className='hero-container'>
      <div className='hero-card'>
        <h1 className='hero-title'>MERN Authentication</h1>
        <p className='hero-text'>
          This is a boilerplate for MERN authentication that stores a JWT in
          an HTTP-Only cookie. It also uses Redux Toolkit and the React library
        </p>
        <div className='button-container'>
          <a href='/login' className='button primary-button'>Sign In</a>
          <a href='/register' className='button secondary-button'>Register</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
