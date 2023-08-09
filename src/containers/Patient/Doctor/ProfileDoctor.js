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
      const { dataSchedule, isShowDescription, userInfo } = this.props;
      if (isShowDescription) {
        this.setState({
          isShowDescription: isShowDescription,
        });
      }
      if (dataSchedule?.doctorId) {
        const result = await this.props.getUserByIdForListSpecialty(
          dataSchedule?.doctorId
        );
        this.setState({
          userInfo: result.data.data,
        });
      }
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {};

  showDataTime = () => {
    const dataSchedule = this.props.dataSchedule;
    const dateChoose = this.props.dateChoose;
    // const date = new Date();
    moment.locale("vi"); // Set locale to Vietnamese
    const formattedDate = moment(dateChoose)
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
    getUserByIdForListSpecialty: (userId) => {
      return dispatch(actions.getUserByIdForListSpecialty(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
