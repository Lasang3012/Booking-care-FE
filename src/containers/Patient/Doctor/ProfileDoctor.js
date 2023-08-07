import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProfileDoctor.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "../../../store/actions";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userInfoImage: "",
      isShowDescription: false,
    };
  }

  async componentDidMount() {
    try {
      const { dataSchedule } = this.props;
      const userId = dataSchedule.doctorId;
      this.props.getUserById(userId);
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const userInfo = this.props.userInfo;

    if (prevProps.userInfo !== userInfo) {
      this.setState({
        userInfo: this.props.userInfo.data,
      });
    }
  };

  showDataTime = () => {
    const dataSchedule = this.props.dataSchedule;
    const date = new Date();
    moment.locale("vi"); // Set locale to Vietnamese
    const formattedDate = moment(date)
      .format("dddd - DD/MM/YYYY")
      .replace(/^\w/, (c) => c.toUpperCase());
    return (
      <>
        <span
          style={{
            fontWeight: 600,
            fontSize: "18px",
            borderBottom: "1px solid #555",
          }}
        >
          {dataSchedule?.valueVi} - {formattedDate}
        </span>{" "}
        <br />
        <span style={{ fontWeight: 600, fontSize: "15px" }}>
          Miễn phí đặt lịch
        </span>
      </>
    );
  };

  render() {
    const { userInfo } = this.state;
    const markdown = userInfo.markdown;
    const { dataSchedule } = this.props;

    return (
      <>
        <div className="intro-doctor">
          <div className="content-left">
            <div
              className="image"
              style={{
                backgroundImage: userInfo.name
                  ? `url(http://localhost:8088/images/${userInfo?.image})`
                  : "",
              }}
              title="Fitness Centre"
            ></div>
          </div>
          <div className="content-right">
            <div className="up">
              {userInfo?.name} <span> ({userInfo?.positionName})</span>
            </div>
            <div className="down">
              {this.state.isShowDescription ? (
                markdown?.description
              ) : (
                <>{this.showDataTime()}</>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserById: (userId) => {
      return dispatch(actions.getUserByIdSuccess(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
