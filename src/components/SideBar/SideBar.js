import React, { useContext } from 'react'
import UserChats from '../UserChats/UserChats';
import Search from '../Search/Search';
import './SideBar.scss';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import GroupChats from '../GroupChats/GroupChats';
import { AppContext } from '../../context/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../context/AuthContext';

const SideBar = () => {
  const {setIsProfileVisible,setEditProfile} = useContext(AppContext)
  const { currentUser } = useContext(AuthContext);

  const handleProfileVisible = ()=> {
    setIsProfileVisible(true)
    setEditProfile(false)
  }


  return (
    <div className='sidebar'>
      <div className="navbar">
        <div className='logo'>

          <img className='logoImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/800px-Twitter-logo.svg.png' alt=''/>
          <span className='chatsTitle'>ZaloChat</span>
        </div>
      
        <div className="profileUser">
                <img className='userAvatar' src={currentUser.photoURL} alt="" />
                <span className='userName'>{currentUser.displayName}</span>
                
              <ul className='profileList'>
                <li className='profileItem profile' onClick={handleProfileVisible}>
                <UserOutlined className='profileIcon'/>
                    Xem hồ sơ
                </li>
                <li className='profileItem logout'>
                  <button className='logoutBtn' onClick={()=>signOut(auth)}>
                  <LogoutOutlined className='profileIcon'/>
                    Đăng xuất
                    </button>
                    
                </li>
              </ul>
            </div>
      </div>
     <Search/>
      <GroupChats/>
      <UserChats/>
      
    </div>
  )
}

export default SideBar