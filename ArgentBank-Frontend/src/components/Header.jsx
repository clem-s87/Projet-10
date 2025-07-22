import logo from '../img/argentBankLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import '../css/header.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/features/auth/authSlice';
import { fetchUserProfile, clearUser } from '../app/features/user/userSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token);
  const firstName = useSelector(state => state.user.firstName);
  const userStatus = useSelector(state => state.user.status);
  const userName = useSelector(state => state.user.userName);


  useEffect(() => {
    if (token && userStatus === 'idle') {
      dispatch(fetchUserProfile(token));
    }
    if (!token) {
      dispatch(clearUser());
    }
  }, [dispatch, token, userStatus]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate('/sign-in');
  };

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Logo Argent Bank" className="logo" />
      </Link>
      <nav>
        {token ? (
          <>
            <Link to='/user'>
              <FontAwesomeIcon icon={faUserCircle} size="1x" style={{ color: '#2c3e50' }} />
              <span className="header-link"> {userName || firstName} </span>
            </Link>
            <button
              onClick={handleLogout}
              className="header-link"
              style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '15px' }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px', color: '#2c3e50' }} />
              Sign Out
            </button>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faUserCircle} size="1x" style={{ color: '#2c3e50', marginRight: '5px' }} />
            <Link to="/sign-in" className="header-link">Sign In</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
