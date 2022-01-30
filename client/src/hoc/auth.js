//import { Axios } from 'axios'
//import e from 'express';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null){
    //null -> 아무나 출입 가능한 페이지
    //true -> 로그인한 유저만 출입이 가능한 페이지
    //false -> 로그인한 유저는 출입 불가능한 페이지
    
    let navigate = useNavigate();

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            //Axios.get('/api/users/auth')

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인하지 않은 상태
                if(!response.payload.isAuth){
                    if(option) {
                        navigate('/login')
                        alert("로그인해야 합니다.")
                        //props.history.push('/login')
                    }
                } else{
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/')
                        alert("이미 로그인되어 있습니다.")
                        //props.history.push('/')
                    } else{
                        if(option == false){
                            navigate('/')
                            alert("이미 로그인되어 있습니다.")
                            //props.history.push('/')
                        }
                    }
                }

            })
        })
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}