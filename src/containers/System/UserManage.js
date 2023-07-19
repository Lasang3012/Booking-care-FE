import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services/";

class UserManage extends Component {
  state = {
    listUser: [],
  };

  async componentDidMount() {
    const listUser = await userService.getListUser();
    this.setState({
      listUser: listUser.data,
    });
  }

  render() {
    return <div className="text-center">Manage users</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
