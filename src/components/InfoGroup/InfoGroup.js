import { DashOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import React, { useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import SearchMember from '../Search/SearchMember'
import './InfoGroup.scss'

function InfoGroup() {
    const {setIsInviteMemberVisible,members} = useContext(AppContext)

   
    
    const content = (
        <div className='optionItem' onClick={()=>console.log('click') }>
          <p>Xóa khỏi nhóm</p>
        </div>
      );

    const handleInviteMember = () => {
        setIsInviteMemberVisible(true)
    };

  return (
    <div className='infoGroupWrap'>
        <h3 className='groupTitle'>Thành viên</h3>
        <button className='inviteMemberBtn' onClick={handleInviteMember}>
            <UsergroupAddOutlined className='inviteMemberIcon'/>
            Thêm thành viên
            </button>
        <h5 className='listDes'>{ `Danh sách thành viên (${members.length})`} </h5>
        <SearchMember/>
        <div className='memberList'>
            {members.map((member)=>(
                <div className='infoMember' key={member.uid}>
                    <div>
                        <img className='avatarMember' src={member.photoURL} alt=''/>
                        <span className='displayNameMember'>{member.displayName}</span>
                    </div>
                    <Popover className='memberOption' placement="bottomLeft" title='Tùy chọn' content={content} trigger="click">
                        <button className='optionBtn'>
                            <DashOutlined />
                        </button>
                    </Popover>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default InfoGroup