import axios from "axios"
import { toast } from "react-toastify"
import { ADD_USER, DELETE_USER, FAIL_REQUEST, GET_USER_LIST, GET_USER_OBJ, MAKE_REQUEST, UPDATE_USER } from "./ActionType"

//(makeRequest, failRequest, etc.) son las que despachan los cambios en el estado de Redux directamente.
 
export const makeRequest=()=>{
    return{
        type:MAKE_REQUEST
    }
}
export const failRequest=(err)=>{
    return{
        type:FAIL_REQUEST,
        payload:err
    }
}
export const geUserList=(data)=>{
    return{
        type:GET_USER_LIST,
        payload:data
    }
}
export const deleteUser=()=>{
    return{
        type:DELETE_USER
    }
}
export const addUser=()=>{
    return{
        type:ADD_USER
    }
}
export const updateUser=()=>{
    return{
        type:UPDATE_USER
    }
}
export const getUserObj=(data)=>{  //Despacha los datos de un usuario específico como payload
    return{
        type:GET_USER_OBJ,
        payload:data
    }
}


//Acciones asíncronas con redux-thunk:

export const FetchUserList=()=>{
    return (dispatch)=>{
      dispatch(makeRequest());  //// Indica que se está realizando una solicitud
      //setTimeout(() => {
        axios.get('http://localhost:7000/user').then(res=>{
            const userlist=res.data;
            dispatch(geUserList(userlist));
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
};

export const Removeuser=(code)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.delete('http://localhost:7000/user/'+code).then(res=>{
            dispatch(deleteUser());
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
}

export const FunctionAddUser=(data)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.post('http://localhost:7000/user',data).then(res=>{
            dispatch(addUser());
            toast.success('User Added successfully.')
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
}

export const FunctionUpdateUser=(data,code)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.put('http://localhost:7000/user/'+code,data).then(res=>{
            //dispatch(updateUser());
            toast.success('User Updated successfully.')
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
    }
}
export const FetchUserObj=(code)=>{ //Realiza una solicitud GET para obtener los datos de un usuario específico.
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.get('http://localhost:7000/user/'+code).then(res=>{
            const userlist=res.data;
            dispatch(getUserObj(userlist));
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
}