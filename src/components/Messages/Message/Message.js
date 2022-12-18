import React, { useContext, useEffect, useRef, useState} from "react";
import { AuthContext } from "../../../context/AuthContext";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago'
 import './Message.scss';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const [chat,SetChat] = useState([])
  const ref = useRef();

  TimeAgo.addLocale(en);


  useEffect(() => {
     const q = query(
      collection(db, "users"),
      where("uid", "==", message.senderId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        SetChat(doc.data());
     
      });
      
    });
  
    ref.current?.scrollIntoView({ behavior: "smooth" });
    return unsubscribe;


  }, [message]);

  return (
   
    <div className="messageWrap">
     
      <div
        ref={ref}
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
      
        <div className="messageInfo">
            <img
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : chat.photoURL
              }
              alt=""
            />
            
          </div>
          <div className="messageContent">
           
            <p className="text">{message.text}
            </p>
              <p className="messageTime">
              <ReactTimeAgo date={message.date} locale="en-US"/>
              </p>
            {message.img && <img src={message.img} alt="" />}
          </div>
      </div>
    </div>

  );
};

export default Message;