import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { HomePage, ExplorePage, BandsPage, LoginPage, RegisterPage } from './components/pages'
import ProfilePage from './components/profile'
import './App.css'

function App() {
  const [loggedIn, setLoggedInState] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    bio: '',
    email: '',
    bands: [],
    avatar: 'https://res.cloudinary.com/dv934lt48/image/upload/v1699041905/Blogimages/unmkc042kvsgqwotc9cd.png',
    user_id: ''
  });

  const [navLinks, setNavLinks] = useState([
    {link: '/', name: 'Home', key: 0},
    {link: '/explore', name: 'Explore', key: 1},
    //{link: '/local', name: 'Local Bands', key: 2},
    {link: '/log-in', name: 'Log In', key: 4},
    {link: '/register', name: 'Register', key: 5}
  ]);

  const handleSetCredentials = (credentials) => {
    setUserCredentials(credentials)
  };

  const toggleLoggedInState = (userId) => {
    switch(loggedIn){
      case false:
        setNavLinks([
          {link: '/', name: 'Home', key: 0},
          {link: '/explore', name: 'Explore', key: 1},
          //{link: '/local', name: 'Local Bands', key: 2},
          {link: `/profile/${userId}`, name: 'Profile', key: 3},
        ]);
        setLoggedInState(true);
      break;
      case true: 
        setNavLinks([
          {link: '/', name: 'Home', key: 0},
          {link: '/explore', name: 'Explore', key: 1},
          //{link: '/local', name: 'Local Bands', key: 2},
          {link: '/log-in', name: 'Log In', key: 4},
          {link: '/register', name: 'Register', key: 5}
        ]);
        setLoggedInState(false);
      break;
    }
  }

  return (
    <>
      <Navbar 
        links={navLinks}
        mustLogin={{
          username: userCredentials.username,
          avatar: userCredentials.avatar,
          user_id: userCredentials.user_id
        }}
      />
      <div className='content'>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/explore' element={<ExplorePage />}/>
          <Route path='/local' element={<BandsPage />}/>
          <Route path='/profile/:id' element={<ProfilePage credentials={userCredentials}/>}/>
          <Route path='/log-in' element={<LoginPage toggleLogin={toggleLoggedInState} setCredentials={handleSetCredentials}/>}/>
          <Route path='/register' element={<RegisterPage toggleLogin={toggleLoggedInState} setCredentials={handleSetCredentials}/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App