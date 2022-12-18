import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { GoogleCircleFilled} from '@ant-design/icons';
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import './Auth.scss';
import { doc, setDoc } from 'firebase/firestore';
import { generateKeywords } from "../../firebase/services";

 const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validateMsg,setValidateMsg] = useState('');

  const navigate = useNavigate();

  // login with email
  const handleSubmit = async ()=> {
    const msg = {}
    if(!email) {
      msg.email = 'Vui lòng nhập email !'
      setValidateMsg(msg);
    //  return;
    }
    if(!password){
      msg.password = 'Vui lòng nhập mật khẩu !'
      setValidateMsg(msg);
     // return;
    }
    try {

      await signInWithEmailAndPassword(auth, email, password);
    
      navigate("/");
       
    }catch(err) {
     msg.mesasge = 'Email hoặc mật khẩu không chính xác !'
     setValidateMsg(msg)
    }
   
  };



  const handleSubmitGoogle = async ()=> {
    const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          displayName:auth.currentUser.uid,
          email:auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
          keywords: generateKeywords(auth.currentUser.displayName?.toLowerCase()),
        });

        await setDoc(doc(db, "userChats",auth.currentUser.uid), {}); 
        navigate("/");
      }catch(err) {
        
      }
  };


 

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">ZaloChat</span>
            <span className="title">Đăng nhập</span>

            <form>
                <input 
                  type="email" 
                  placeholder='abc@gmail.com'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <p className='errorMsg'>{validateMsg.email}</p>
                <input 
                  type="password" 
                  placeholder='mật khẩu'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
                   <p className='errorMsg'>{validateMsg.password}</p>
                <button type='button' className='btn' onClick={handleSubmit}>Đăng nhập</button>
            </form>
            
                <p className='errorMsg'>{validateMsg.mesasge}</p>
            <button className='btn' onClick={handleSubmitGoogle}>
                <span>Đăng nhập với google</span>
                <GoogleCircleFilled style={{color:"currentColor"}}/>
              </button>
            
            <p>Bạn chưa có tài khoản?<Link to="/register" style={{paddingLeft:4}}>Đăng ký</Link> </p>
        </div>
    </div>
  )
}
export default Login;
