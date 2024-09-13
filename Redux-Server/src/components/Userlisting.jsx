import { connect } from "react-redux"
import { FetchUserList, Removeuser } from "../Redux/Action"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

const Userlisting = (props) => {

    useEffect(() => {
        console.log("ss");
        
        props.loaduser();
    }, []);

    const handledelete = (code) => {
        if(window.confirm('Do you want to remove?')){
            props.removeuser(code);
            props.loaduser();
            toast.success('User removed successfully')
        }
    }

  return (
    props.user.loading ? <div><h2>Loading...</h2></div> :
    props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :
    
    <div className='card'>
        <div className='card-header'>
            <Link  to={"/user/add"} className="btn btn-success">Add User [+]</Link>

        </div>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <td>Code</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Role</td>
                        <td>Action</td>
                    </tr>
                    
                </thead>
                <tbody>
                    {props.user.userlist && props.user.userlist.map(items => 
                        <tr key={items.id}>
                            <td>{items.id}</td>
                            <td>{items.name}</td>
                            <td>{items.email}</td>
                            <td>{items.phone}</td>
                            <td>{items.role}</td>
                            <td>
                                <Link to={`user/edir/${items.id}`} className= "btn btn-primary">Edit</Link>
                                <button onClick={()=>{handledelete(items.id)}} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        user:state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loaduser:() => dispatch(FetchUserList()),
        removeuser:(code)=> dispatch(Removeuser(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);