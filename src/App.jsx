import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState('white');

  const fetchRandomUser = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const randomUser = response.data.users[Math.floor(Math.random() * response.data.users.length)];
      setUserData(randomUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setBgColor(color);
  };

  useEffect(() => {
    fetchRandomUser();
    generateRandomColor();
  }, []);

  const handleRefresh = () => {
    fetchRandomUser();
    generateRandomColor();
  };

  return (
    <div className='main'>
      <h1 style={{fontFamily:'cursive'}}>Random User Generator</h1>
      <div style={{ backgroundColor: bgColor }} className='cover'>
        {userData ? (
          <div style={{fontFamily:'revert-layer'}} className='inner'>
            <div>
              <div style={{ textAlign: 'center'}}><img src={userData.image} alt="" className='avatar' /> <br /></div>
              <div style={{fontSize:'25px'}}>
                <div style={{textAlignLast:'center',fontFamily:'serif'}}><b>{userData.firstName} {userData.lastName}</b><br /></div>
                <hr style={{}} />
              </div>
              <div style={{lineHeight:'25px'}} className='gri'>
                <div><strong>Gender:</strong>{userData.gender} <br /></div>
                <div><strong>DOB:</strong> {userData.birthDate}<br /></div>
                <div><strong>Age:</strong> {userData.age}<br /></div>
                <div><strong>Weight:</strong> {userData.weight}<br /></div>
                <div><strong>Height:</strong> {userData.height}<br /></div>
                <br />
                <div><button onClick={handleRefresh} className='btn'>Refresh</button></div>
              </div>
              
            </div>
            <div className='right'>
              <div className='element'><strong className='rightitems'>Home Address:</strong> {userData.address.address}<br /></div>
              <div className='element'><strong className='rightitems'>Phone number:</strong> {userData.phone}<br /></div>
              <div className='element'><strong className='rightitems'>Company:</strong> {userData.company.title}<br /></div>
              <div className='element'><strong className='rightitems'>Email:</strong> {userData.email}<br /></div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;