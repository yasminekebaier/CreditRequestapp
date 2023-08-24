const COOKIE_EXPIRES_TIME = 24 * 60 * 60 * 1000;

const sendToken = (user, statusCode, res) => {
  // Create token
  const token = user.getJwtToken();
  
  // Cookie options
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRES_TIME),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'strict', // Add this for better security
    path: '/', // Set to the appropriate path if needed
  };

  // Set the token in the cookie with the correct name
  res.status(statusCode).cookie('jwt', token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = {
  sendToken,
};