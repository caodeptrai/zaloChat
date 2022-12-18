import React, { useContext} from 'react'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import { ChatContext } from "../../context/ChatContext";

import { VideoCameraOutlined, PhoneOutlined, InfoCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import './ChatWindow.scss';
import { AppContext } from '../../context/AppContext';
import Wellcome from '../Wellcome/Wellcome';


const ChatWindow = () => {
  const {data} = useContext(ChatContext)
  const {setIsInviteMemberVisible,
        setIsInfoGroupVisible,
        isInfoGroupVisible,
        members,setIsProfileVisibleUser} = useContext(AppContext)


  const handleInviteMember = () => {
    setIsInviteMemberVisible(true)
    
  };

  const handleInfoGroup = ()=> {
    setIsInfoGroupVisible(!isInfoGroupVisible)
  }

  const handleInfoUser = ()=> {
    setIsProfileVisibleUser(true)
  }


  return (
    <div className='chat' >

      {!(Object.keys(data.user).length === 0 && data.user.constructor === Object) ? (
        <>
        <div className="chatHeader">
        {(data.chatId.length ===56) ? (
          <>
            <div className="chatInfo" onClick={handleInfoUser}>
              <img className='chatAvatar' src={data.user?.photoURL} alt="" />
              <span className='chatName'>{data.user?.displayName}</span>
          </div>
          <div className="chatIcons">
            <span>
              <VideoCameraOutlined className='chatIcon'/>
              </span>
              <span>
                <PhoneOutlined className='chatIcon'/>
              </span>
        </div>
          </>
        ) : (
        <>
          <div className="chatInfo">
            <img className='chatAvatar' src={data.user?.photoURL} alt="" />
            <div className='chatInfoWrap'>
              <span className='chatName'>{data.user?.displayName}</span>
              <span>{` ${members.length} thành viên`}</span>
            </div>
          </div>
          <div className="chatIcons">
            <span>
            <VideoCameraOutlined className='chatIcon'/>
            </span>
            <span>
              <PhoneOutlined className='chatIcon'/>
            </span>
            <span onClick={handleInviteMember}>
            <UsergroupAddOutlined className='chatIcon'/>
            </span>
            <span onClick={handleInfoGroup}>
              <InfoCircleOutlined className='chatIcon'/>
            </span>
          </div>
        </>)}

    </div>
    
      
    <Messages/>
    <Input/>
        </>
    ) : (<Wellcome/>)
}
  </div>

    
  )
}

export default ChatWindow;