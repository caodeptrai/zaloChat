import React, { useContext } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import InfoGroup from '../../components/InfoGroup/InfoGroup';

import { Col, Row } from 'antd';
import { AppContext } from '../../context/AppContext';


const Home = () => {
    const { isInfoGroupVisible } = useContext(AppContext);
  return (
    <div className='container' style={{height:'100vh'}}>
        <Row style={{height:'100%'}}>
            {isInfoGroupVisible ? (
                <>
                <Col span={6}><SideBar/></Col>
                <Col span={12} ><ChatWindow/></Col>
                <Col span={6} ><InfoGroup/></Col>
                </>
            ):(
                <>
                <Col span={8}><SideBar/></Col>
                <Col span={16} ><ChatWindow/></Col>
                </>
            )}
            
        </Row>
    
    </div>
  )
}

export default Home