import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        let variable = { userTo: props.userTo }

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })


    }, []);

    const onSubscribe = () => {

        let subscribedVariable = { 
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if(Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber - 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소하는데 실패했습니다')
                }
            })
        } else {
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독하는데 실패했습니다')
                }
            })
        }
    }

  return (
    <div>
    <button
    style={{
        backgroundColor: `${Subscribed ?  '#AAAAAA' : '#CC0000'}`,
        borderRadius: '4px', color: 'white',
        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
    }}
        onClick={onSubscribe}
    >  
    {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
    </button>
    </div>
  )
}

export default Subscribe
