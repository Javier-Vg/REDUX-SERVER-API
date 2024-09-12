import { connect } from "react-redux"
import { FetchUserList } from "../Redux/Action"
import { useEffect } from "react"

function Userlisting(props) {

    useEffect(() => {
        props.loaduser();
    },[]);

  return (
    props.user.loading ? <div><h2>Loading...</h2></div> :
    props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :
    
    <div className='card'>
        <div className='card-header'>
            <h2>User Listing</h2>

        </div>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <td>Code</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Action</td>
                    </tr>
                    
                </thead>
                <tbody>

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
        loaduser:() => dispatch(FetchUserList()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Userlisting)