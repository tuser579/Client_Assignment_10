import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from './Components/Footer/Footer';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';

function App() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <>
      <Navbar></Navbar>
      <div className=''>
        {
          isNavigating && (<LoadingSpinner></LoadingSpinner>)
        }
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
