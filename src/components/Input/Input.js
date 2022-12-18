import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FileAddOutlined,SendOutlined} from '@ant-design/icons';
import InputEmoji from 'react-input-emoji'
import './Input.scss';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  
  const handleChange = (text)=> {
    setText(text)
  }

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                
                 date: Date.now(),

                img: downloadURL,
              }),
            });
            
          });
        }

      );
    } else {

      setText("");
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Date.now(),
        }),
      });
    }

    if(data.chatId.length === 56){
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

    } else {
      await updateDoc(doc(db, "rooms", data.chatId), {
        lastMessage: {
          text,
        },
        date: serverTimestamp(),
      });
    }
    

  
     setImg(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
    console.log(text);
  };

  return (
    <div className="input">
     
        <InputEmoji

          value={text}
          style={{
          width:250}}
          onChange={handleChange }
          onKeyDown={handleKey}
  
                
        />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <span><FileAddOutlined /></span>
        </label>
        <button onClick={handleSend}>
        <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default Input;