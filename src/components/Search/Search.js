import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { AuthContext } from "../../context/AuthContext";
import './Search.scss';
import { AutoComplete, Avatar, Spin } from "antd";
import { debounce } from 'lodash';



function DebounceSearch({
  fetchOptions,
  debounceTimeout = 300,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
 
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  


  return (
    <AutoComplete
    className = 'custom'
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
       
      { options?.map((opt) => (
        <AutoComplete.Option 
          key={opt.uid} 
          value={opt.displayName} 
          title={opt.displayName}
          user = {opt}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.displayName}`}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  );
}




const Search = () => {
  const [value, setValue] = useState([]);

   const { currentUser } = useContext(AuthContext);


    const handleSelect = async (value,option) => {

      setValue("")
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > option.user.uid
        ? currentUser.uid + option.user.uid
        : option.user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          
          [combinedId]:{
            userInfo:{
              uid: option.user.uid,
              displayName: option.user.displayName,
              email:option.user.email,
              photoURL: option.user.photoURL,
            },
            date:serverTimestamp(),
          }

          // viet tat
        //   [combinedId + ".userInfo"]: { 
        //     uid: user.uid,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //   },
        //  [combinedId + ".date"]: serverTimestamp(),
        });

       
        await updateDoc(doc(db, "userChats", option.user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            email:option.user.email,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

  };

  

  async function fetchUserList(search) {
    
    const q = query(
        collection(db, "users"),
        where("keywords", "array-contains", search)
      );
      const querySnapshot = await getDocs(q);
    
      const data = [];
      let res = {}
      querySnapshot.forEach((doc) => {
        res = {
          ...doc.data()
        }
        data.push(res);
     });
         return data
    }

    

  return (
   <DebounceSearch
      placeholder='Nhập từ khóa tìm kiếm...'
      fetchOptions={fetchUserList}
       onChange={(newValue) => setValue(newValue)}
      onSelect={handleSelect}
       value={value}
      
      allowClear = {true}
      className = 'custom'
       >
       
       </DebounceSearch>
  );
};

export default Search;