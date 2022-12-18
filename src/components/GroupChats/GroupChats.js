
import React, { useContext} from "react";
import { ChatContext } from "../../context/ChatContext";
import './GroupChats.scss';
import { Button, Collapse } from 'antd';
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import { AppContext } from "../../context/AppContext";
import { PlusSquareOutlined } from "@ant-design/icons";

const GroupChats = () => {

  const { dispatch } = useContext(ChatContext);

  const {setIsAddRoomVisible,rooms} = useContext(AppContext)




  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  const handleSelect = (u) => {
    dispatch({ type: "SELECT_ROOM", payload: u });
  };

  return (
    <div >
       <Collapse ghost defaultActiveKey={['1']}>
           <CollapsePanel header='Danh sách các phòng' key={1} className='collapseRoom'>
            <div className="list-room">
            {rooms.map((room)=>(
               <div
               className="userChat"
               key={room.id}
               onClick={()=>handleSelect(room)}
               >
             <img src={room.photoURL} alt="" />
             <div className="userChatInfo">
               <span>{room.displayName}</span>
               {room.lastMessage?.text ? <p>{room.lastMessage.text}</p> : <p></p>}
             </div>
             </div>
            ))}

            </div>
           <Button
              type='text'
              icon={<PlusSquareOutlined />}
              className='add-room'
               onClick={handleAddRoom}
             >
          Thêm phòng
            </Button>
           </CollapsePanel>
        </Collapse>  
        
    </div>
  );
};

export default GroupChats;