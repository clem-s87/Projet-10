import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.js'; 
import './App.css';
import { Navigate } from 'react-router-dom';

import Home from "./pages/Home.jsx";
import Sign from "./pages/Sign.jsx";
import User from "./pages/User.jsx";
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Sign />} />
          <Route path='/user' element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
