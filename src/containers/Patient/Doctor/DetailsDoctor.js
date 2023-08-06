import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailsDoctor.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailsDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id;
      this.props.getUserById(userId);
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const userInfo = this.props.userInfo;
    if (prevProps.userInfo !== userInfo) {
      this.setState({
        userInfo: this.props.userInfo.data,
      });
    }
  };

  render() {
    const paramId = this.props.match.params.id;
    const userInfo = this.state.userInfo;
    const markdown = userInfo.markdown;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left">
              <div
                className="image"
                style={{
                  backgroundImage: `url(http://localhost:8088/images/${userInfo.image})`,
                }}
              ></div>
            </div>
            <div className="content-right">
              <div className="up">
                {userInfo?.name} <span> ({userInfo?.positionName})</span>
              </div>
              <div className="down">{markdown?.description}</div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule userId={paramId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfo doctorIdFromParent={userInfo.id} />
            </div>
          </div>
          <div className="detail-info-doctor">
            <div
              dangerouslySetInnerHTML={{
                __html: markdown?.contentHTML,
              }}
            ></div>
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDoctor);
