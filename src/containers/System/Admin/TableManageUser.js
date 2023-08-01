import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserRedux: [],
    };
  }

  componentDidMount = async () => {
    try {
      await this.props.getListUser();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const listUser = this.props.listUserRedux;
    if (prevProps.listUserRedux !== listUser) {
      this.setState({
        listUserRedux: listUser && listUser.length > 0 ? listUser : "",
      });
    }
  };

  deleteUser = async (userId) => {
    try {
      await this.props.deleteUser(userId);
    } catch (e) {
      console.log(e);
    }
  };

  editUser = async (user) => {
    try {
      this.props.handleEditUserFromParent(user);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const listUser = this.state.listUserRedux;
    return (
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender Id</th>
            <th>Role Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((el) => {
              return (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.status}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>{el.genderId}</td>
                  <td>{el.roleId}</td>
                  <td className="action-button">
                    <button
                      type="submit"
                      className="btn btn-primary mb-3"
                      style={{ marginRight: "5px" }}
                      onClick={() => this.editUser(el)}
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="btn btn-warning mb-3"
                      onClick={() => this.deleteUser(el.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { listUserRedux: state.admin.listUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListUser: () => {
      return dispatch(actions.getListUser());
    },
    deleteUser: (userId) => {
      return dispatch(actions.deleteUserSuccess(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
