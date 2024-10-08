import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../../Redux/Action";

const Userlisting = (props) => {

  const [refresh, refreshSet] = useState(""); //Hace que renderize al eliminar

  //renderiza la lista de usuarios apenas ingresar
  useEffect(() => {
    props.loaduser();
  }, [refresh]);

  const handledelete = (code) => {
    if (window.confirm("¿Quieres eliminar este elemento?")) {
      props.removeuser(code);
      refreshSet(code) //Vuelve a montar la web
      toast.success("User removed successfully.");
    }
  };

  return props.user.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.user.errmessage ? (
    <div>
      <h2>{props.user.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div className="card">
        <div className="card-header">
          <Link to={"/user/add"} className="btn btn-success">
            Add User [+]
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
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
              {props.user.userlist &&
                props.user.userlist.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      <Link
                        to={"/user/edit/" + item.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>{" "}
                      |
                      <button
                        onClick={() => {
                          handledelete(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => { //Mapea el estado de Redux al componente como props. En este caso, el estado state.user se asigna a la prop user.

  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: () => dispatch(FetchUserList()), // Carga la lista de usuarios
    removeuser: (code) => dispatch(Removeuser(code)), // Elimina un usuario
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);