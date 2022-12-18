import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../context/AppContext';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { ChatContext } from '../../context/ChatContext';





function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value,curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions,curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options?.map((opt) => (
        <Select.Option key={opt.uid} value={opt.uid} title={opt.displayName}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`  ${opt?.displayName} `}
          
        </Select.Option>
      ))}
      
    </Select>
  );
}

async function fetchUserList(search,curMembers) {

  
    const q = query(
        collection(db, "users"),
        where("keywords", "array-contains", search?.toLowerCase())
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
       return data.filter((opt) => !curMembers.includes(opt.uid))
    }

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoom,
  } = useContext(AppContext);
  const {data} = useContext(ChatContext)
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();


  const handleOk = async () => {
    // reset form value
    form.resetFields();
    setValue([]);

    // update members in current room
    const roomRef = doc(db,"rooms",data.user.id);

    await updateDoc(roomRef,{
      members: [...data.user.members, ...value.map((val) => val.value)],
    });

    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
  //  reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberVisible(false);
  };
  
  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            value={value}
            placeholder='Nhập tên thành viên'
           fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers = {selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}