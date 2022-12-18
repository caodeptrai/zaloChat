import React, { useState } from "react";
import Add from "../../imgs/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import './Auth.scss';
import { generateKeywords } from "../../firebase/services";
import { Spin } from "antd";


const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    console.log("file",file)
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      
      await uploadBytesResumable(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
        .then(async (downloadURL) => {
          try {
            
            await Promise.all([
              //Update profile
              updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
              }),
               //create user on firestore
              setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
                keywords: generateKeywords(displayName),
              }),
              //create empty user chats on firestore
              setDoc(doc(db, "userChats", res.user.uid), {})])
              navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ZaloChat</span>
        <span className="title">Đăng ký</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Tên hiển thị" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="mật khẩu" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Thêm ảnh đại diện</span>
          </label>
          <button disabled={loading} className='btn'>
            {loading ? <Spin/> : 'Đăng ký'}
            </button>
          {loading && "Đang tải lên và nén hình ảnh vui lòng đợi..."}
          {err && <span>Đã có lỗi vui lòng thử lại</span>}
        </form>
        <p>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;