import React, { useContext, useEffect} from 'react'
import {Form, Input, Modal} from 'antd'
import { 
    CalendarOutlined, 
    CameraOutlined, 
    EditOutlined, 
    HomeOutlined, 
   
    MailOutlined, 
    PhoneOutlined} from '@ant-design/icons';
import { Tooltip, Avatar } from 'antd';
import { AuthContext } from "../../../context/AuthContext";
import { AppContext } from '../../../context/AppContext';
import './Profile.scss'
import { useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';




function ProfileModal() {
    const { currentUser } = useContext(AuthContext);
    const {isProfileVisible,setIsProfileVisible,editProfile,setEditProfile} = useContext(AppContext)
    const [user,setUser] = useState({})
    const [address,setAddress] = useState(user.address)
    const [phone,setPhone] = useState(user.phone)
    const [birth,setBirth] = useState(user.birth)

    const uid = React.useMemo(()=> {

      return currentUser.uid
    },[currentUser.uid])



    useEffect(() => {


      const getUser = ()=> {

        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
          setUser(doc.data());
         
        });
  
        return () => {
          unsub();
        };
      }

      uid && getUser()
     
    }, [uid]);

    const handleEditProfile = ()=> {
      
      setEditProfile(!editProfile)

      
    }

    const handleOk = async ()=> {
      if(editProfile ) {
        await updateDoc(doc(db, "users", currentUser.uid), {
          address,
          phone,
          birth
        })
      }
      setEditProfile(false)
    }

    const handleCancel = ()=> {
        setIsProfileVisible(false)
    }

  return (
    <Modal  
    open={isProfileVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    destroyOnClose={true}>
         <div className='pro'>
      <div className="pro-header">
        <div className="sideRight">
          <div className="rightAvatarWrap">
            <img className='rightAvatar' src={user.photoURL} alt="" />
            <button className='updateAvatarBtn'>
              <CameraOutlined />
            </button>
          </div>
          
          <div className="rightInfo">
            <h3 className='rightInfo-name'>{user.displayName}</h3>
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
            <button className='editbtn' onClick={handleEditProfile}>
              <EditOutlined className='profileIcon'/>
              Chỉnh sửa trang cá nhân
              </button>
        </div>
      </div>
      <div className="pro-content">
        <h3 className='introduce'>Giới thiệu</h3>
      
       
        {editProfile ? 
        <Form >
            <Form.Item className='labelEditProfile' label="Sống tại">
            <Input 
              placeholder="Thái Nguyên" 
              defaultValue={user.address}
              value = {address} 
              onChange = {(e)=>setAddress(e.target.value)}/>
          </Form.Item>
          <Form.Item className='labelEditProfile' label="SĐT">
            <Input 
              placeholder="0123456789" 
              defaultValue={user.phone}
              value = {phone} 
              onChange = {(e)=>setPhone(e.target.value)}/>
          </Form.Item>
          <Form.Item className='labelEditProfile' label="Ngày sinh">
            <Input 
              placeholder="30/04/2001" 
              defaultValue={user.birth}
              value = {birth} 
              onChange = {(e)=>setBirth(e.target.value)}/>
          </Form.Item>

        </Form>
        : 
        <>
        {user.address && 
        <div className="pro-contentWrap">
        <HomeOutlined className='profileIcon'/>
        <span>Sống tại <b>{user.address}</b></span>
        </div>}
        
          {user.email && 
          <div className="pro-contentWrap">
          <MailOutlined className='profileIcon'/>
          <span>{user.email}</span>
        </div>}
        
        {user.phone && 
        <div className="pro-contentWrap">
          <PhoneOutlined className='profileIcon'/>
          <span>{user.phone}</span>
        </div>}
        
        {user.birth && 
        <div className="pro-contentWrap">
          <CalendarOutlined className='profileIcon'/>
          <span>{user.birth}</span>
        </div>}
        
        </>}
      </div>
      
    </div>
    </Modal>
  )
}

export default ProfileModal