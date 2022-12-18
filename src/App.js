import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import 'antd/dist/antd.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {useContext} from 'react';
import { AuthContext} from "./context/AuthContext";
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';
import ProfileModal from './components/Modals/ProfileModal/ProfileModal';
import Home from './pages/Home/Home';
import ProfileOwnerModal from './components/Modals/ProfileModal/ProfileOwnerModal';
import AppProvider from './context/AppContext';



function App() {

  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children})=> {
    if(!currentUser) {
      return (<Navigate to="/login"/>)
    }

    return children
  };
 
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/">
              <Route index element={
                <ProtectedRoute>
                  <AppProvider>

                  <Home/>
                  <AddRoomModal/>
                  <InviteMemberModal/>
                  <ProfileModal/>
                  <ProfileOwnerModal/>
                  </AppProvider>
                </ProtectedRoute>
              }>

              </Route>
              <Route path="login" element={<Login/>}></Route>
              <Route path="register" element={<Register/>}></Route>

          </Route>
      </Routes>
  </BrowserRouter>
  
    
  );
}

export default App;
