import React, { useContext, useState } from 'react'
import { Modal} from 'antd'
import { AppContext } from '../../context/AppContext';
import {  doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { AuthContext } from '../../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';



function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const [roomName,setroomName] = useState('');
    const [file,setFile] = useState('')
    const [validateMsg,setValidateMsg] = useState('');
    const {currentUser} = useContext(AuthContext)
    const [docId,setDocId] = useState('')
    //createId
    function createId(n) {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < n; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
     
      setDocId(text)
    }


    const handleOk = async () => {
      
      createId(20);
        const msg = {}
        if(!roomName) {
          msg.roomName = 'Vui lòng nhập tên phòng !'
          setValidateMsg(msg);
          setIsAddRoomVisible(true);
        //  return;
        }
        else {

          try {
            const date = new Date().getTime();
            const storageRef = ref(storage, `${roomName + date}`);
    
          await uploadBytesResumable(storageRef, file)
          .then(() => {
            getDownloadURL(storageRef)
            .then(async (downloadURL) => {
              try {
                await Promise.all([
                  setDoc(doc(db, "rooms",docId), {
                    roomId:docId,
                     displayName:roomName,
                     photoURL: downloadURL,
                     members:[currentUser.uid],
                     createAt:serverTimestamp(),
                   }),
                   setDoc(doc(db, "chats", docId), { messages: [] })
                ])
                setIsAddRoomVisible(false);
              } catch (err) {
                console.log("thêm phòng thất bại !!!")
              }
            });
          });
            
          } catch (error) {
            console.log("thêm phòng thất bại !!!")
          }
          setroomName('')
          
        }
      
      };

    const handleCancel = () => {
        // reset form value
        // Form.resetFields();
        setroomName('')
        setFile('')
        setIsAddRoomVisible(false);
      };
    
  return (
    <Modal title='Tạo phòng'
    open={isAddRoomVisible}
    onOk={handleOk}
   
    onCancel={handleCancel}>
         <form>
                <input 
                  type="text" 
                  placeholder='nhập tên phòng'
                  value={roomName}
                  onChange={(e)=>setroomName(e.target.value)}
                />
                <p>{validateMsg.roomName}</p>
                <input required  
                type="file" 
                id="file" 
                onChange = {(e)=>setFile(e.target.files[0])}
                />
            </form>
    </Modal>
  )
}

export default AddRoomModal