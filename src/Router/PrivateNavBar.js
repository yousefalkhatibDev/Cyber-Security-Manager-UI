const PrivateNavBar = ({ children }) => {
  const auth = window.sessionStorage.getItem("token");
  return auth ? children : null;
};

export default PrivateNavBar;
