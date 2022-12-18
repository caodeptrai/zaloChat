import React, { useContext} from 'react'
import {Modal} from 'antd'
import { 
    CalendarOutlined, 
    CameraOutlined, 
    HomeOutlined, 
    MailOutlined, 
    PhoneOutlined} from '@ant-design/icons';
  import { Tooltip, Avatar} from 'antd';
import { AppContext } from '../../../context/AppContext';
import './Profile.scss'




function ProfileOwnerModal() {
    
    const {isVisibleProfileUser,setIsProfileVisibleUser,userChatInfo} = useContext(AppContext)

    const handleOk = ()=> {
        setIsProfileVisibleUser(false)
    }

    const handleCancel = ()=> {
        setIsProfileVisibleUser(false)
    }


  return (
    <Modal  
    open={isVisibleProfileUser}
    onOk={handleOk}
    onCancel={handleCancel}
    destroyOnClose={true}>
         <div className='pro'>
      <div className="pro-header">
        <div className="sideRight">
          <div className="rightAvatarWrap">
            <img className='rightAvatar' src={userChatInfo[0]?.photoURL} alt="" />
            <button className='updateAvatarBtn'>
              <CameraOutlined />
            </button>
          </div>
          
          <div className="rightInfo">
            <h3 className='rightInfo-name'>{userChatInfo[0]?.displayName}</h3>
            <span>1,9K bạn bè</span>
            <div className="rightInfo-friendAvatar">
              
            <Avatar.Group size='small' maxCount={2}>
              <Tooltip title='A'>
              <Avatar></Avatar>
              </Tooltip>
              <Tooltip title='A'>
              <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_4aDv5qEw9vo4eEBkDQADW7xUNEAlCW_sY4T94s&s'></Avatar>
              </Tooltip>
              <Tooltip title='A'>
              <Avatar></Avatar>
              </Tooltip>
              <Tooltip title='A'>
              <Avatar></Avatar>
              </Tooltip>
              <Tooltip title='A'>
              <Avatar></Avatar>
              </Tooltip>
            </Avatar.Group>
            </div>
          </div>
        </div>
        <div className="sideLeft">
            
        </div>
      </div>
      <div className="pro-content">
        <h3 className='introduce'>Giới thiệu</h3>
        {userChatInfo[0]?.address && 
        <div className="pro-contentWrap">
        <HomeOutlined className='profileIcon'/>
        <span>Sống tại <b>{userChatInfo[0]?.address}</b></span>
        </div>}
        
          {userChatInfo[0]?.email && 
          <div className="pro-contentWrap">
          <MailOutlined className='profileIcon'/>
          <span>{userChatInfo[0]?.email}</span>
        </div>}
        
        {userChatInfo[0]?.phone && 
        <div className="pro-contentWrap">
          <PhoneOutlined className='profileIcon'/>
          <span>{userChatInfo[0]?.phone}</span>
        </div>}
        
        {userChatInfo[0]?.birth && 
        <div className="pro-contentWrap">
          <CalendarOutlined className='profileIcon'/>
          <span>{userChatInfo[0]?.birth}</span>
        </div>}
      </div>
      
    </div>
    </Modal>
  )
}

export default ProfileOwnerModal