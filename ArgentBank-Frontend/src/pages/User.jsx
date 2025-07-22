import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import '../css/user.css';
import AccountCard from '../components/AccountCard';
import AccountCardData from '../data/AccountCardData.json';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserName } from '../app/features/user/userSlice';

function User() {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const { firstName, lastName, userName } = useSelector(state => state.user);

  const [newUserName, setNewUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  const handleUpdateName = async () => {
    if (!newUserName.trim()) {
      alert("Le nouveau nom d'utilisateur ne peut pas être vide.");
      return;
    }

    await dispatch(updateUserName({ token, newUserName }));
    setIsEditing(false);
  };

  return (
    <div>
      <Header />
      <main className="main-dark">
        <div className="user-nom">
          {isEditing ? (
            <>
              <h2 className='user-titre'>Edit user info</h2>
              <div className="edit-name-form">
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Enter new username"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    id="firstname"
                    type="text"
                    value={firstName || ''}
                    disabled
                    className="disabled-input"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    id="lastname"
                    type="text"
                    value={lastName || ''}
                    disabled
                    className="disabled-input"
                  />
                </div>
                <div className='container-button'>
                  <button onClick={handleUpdateName} className="edit-button">Save</button>
                  <button onClick={() => setIsEditing(false)} className="edit-button cancel">Cancel</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className='user-titre'>
                Welcome back<br />{userName || firstName} {lastName}!
              </h2>
              <button
                onClick={() => {
                  setNewUserName(userName);
                  setIsEditing(true);
                }}
                className="edit-button"
              >
                Edit Name
              </button>
            </>
          )}
        </div>
        <div className='container-account'>
          {AccountCardData.map((data) =>
            <AccountCard
              key={data.id}
              title={data.title}
              amount={data.amount}
              description={data.description}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default User;
