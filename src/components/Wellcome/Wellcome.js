import React from 'react'
import './Wellcome.scss'

function Wellcome() {
  return (
    <div className='wellcome'>
        <div className='container'>

            <h3 className='wellcomeTitle'>Chào mừng bạn đến với ZaloChat!</h3>
            <p className='wellcomeDes'>Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè
                của bạn.
            </p>
            <img className='wellcomeImg' src='https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png' alt=''/>
            <h4 className='wellcomeSubTitle'>Nhắn nhiều hơn,soạn thảo ít hơn..!! </h4>
        </div>
    </div>
  )
}

export default Wellcome