
import React, { useContext,useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthContext';
import { ChatContext } from './ChatContext';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const {data} = useContext(ChatContext)
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [isProfileVisible,setIsProfileVisible]= useState(false)
  const [isInfoGroupVisible,setIsInfoGroupVisible] = useState(false)
  const [selectRoomId,setSelectRoomId] = useState('') 
  const [isVisibleProfileUser,setIsProfileVisibleUser] = useState(false) 
  const [editProfile,setEditProfile] = useState(false)

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: currentUser.uid,
    };
  }, [currentUser.uid]);
  
  const rooms = useFirestore('rooms',roomsCondition)

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === data.user.id) || {},
    [rooms, data.user.id]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

const members = useFirestore('users', usersCondition);


const userChatInfoCondition = React.useMemo(() => {
  return {
    fieldName: 'uid',
    operator: '==',
    compareValue: data.user.uid,
  };
}, [data.user.uid]);

const userChatInfo = useFirestore('users', userChatInfoCondition);
  
  return (
    <AppContext.Provider
      value={{
         userChatInfo,
        rooms,
        members,
        selectedRoom,
        selectRoomId,
        setSelectRoomId,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        isProfileVisible,
        setIsProfileVisible,
        isInfoGroupVisible,
        setIsInfoGroupVisible,
        isVisibleProfileUser,
        setIsProfileVisibleUser,
        editProfile,
        setEditProfile
      //  clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}