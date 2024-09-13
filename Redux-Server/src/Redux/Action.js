import { DELETE_USER, FAIL_REQUEST, GET_USER_LIST, MAKE_REQUEST } from "./ActionType"
import axios from "axios"

export const makeRequest = ()=> {
return{
        type:MAKE_REQUEST
    }
}

export const failRequest = (err)=> {
return{
        type:FAIL_REQUEST,
        payload:err
    }
}

export const getUserList = (data)=> {
return{
        type:GET_USER_LIST,
        payload:data
    }
}

export const deleteUser = (data)=> {
    return{
        type:DELETE_USER
    }
}

export const FetchUserList=() => {
    return (dispatch)=> {
        dispatch(makeRequest()); 
        
        //setTimeout(()=>{
            axios.get('http://localhost:3000/user').then(res => {
                const userlist = res.data;
                dispatch(getUserList(userlist));
            }).catch(err => {
                dispatch(failRequest(err.message))
            })
        //},1000);
    }
}

export const Removeuser=(code) => {
    return (dispatch)=> {
        dispatch(makeRequest()); 
        axios.delete(`http://localhost:3000/user/${code}`)
            .then(res => {
                const userlist = res.data;
                dispatch(deleteUser(userlist));
            })
            .catch(err => {
                dispatch(failRequest(err.message))
            })
    }
}