import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/sign.css';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      const token = resultAction.payload;

      
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      navigate('/user');
    }
  };

  
  useEffect(() => {
    if (token) {
      navigate('/user');
    }
  }, [token, navigate]);

  return (
    <div className="user-page">
        <Header />
        <main className="main-dark">
          <div className="user-form">
            <FontAwesomeIcon icon={faUserCircle} size="1x" style={{ color: "#2c3e50" }} />
            <h1> Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-label">
                <label>Username </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}required></input>
              </div>
              <div className="form-label">
                <label>Password  </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}required></input>
              </div>
              <div className="form-remember">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="form-button">Sign In</button>
          </form>
          </div>
        </main>
        <Footer />
    </div>
  )
}

export default Sign;