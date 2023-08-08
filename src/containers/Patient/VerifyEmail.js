import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { withRouter } from "react-router";
import HomeHeader from "../HomePage/HomeHeader";
import * as actions from "../../store/actions";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { token, doctorId } = this.props.match.params;
    if (token && doctorId) {
      this.props.verifyPatientBooking(token, doctorId);
    }
  };

  render() {
    return (
      <>
        <HomeHeader />
        <div className="verify-notification">
          Thông báo: Bạn đã đặt lịch thành công
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyPatientBooking: (token, doctorId) => {
      return dispatch(actions.verifyPatientBooking(token, doctorId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
