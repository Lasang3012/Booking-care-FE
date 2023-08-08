import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ORDERBY } from "../../../utils";
import HomeHeader from "../HomeHeader";
import DoctorSchedule from "../../Patient/Doctor/DoctorSchedule";
import "./DetailsSpecialty.scss";
import DoctorExtraInfo from "../../Patient/Doctor/DoctorExtraInfo";
import DetailsDoctor from "../../Patient/Doctor/DetailsDoctor";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor";

class DetailsSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayDoctorId: ["7c802da9-8665-4158-89a7-e97a73728c1e"],
    };
  }

  componentDidMount = () => {
    try {
    } catch (e) {
      console.log("Lỗi ở component DetailsSpecialty redux");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {};

  render() {
    const { arrayDoctorId } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="description-specialty"></div>

        {arrayDoctorId &&
          arrayDoctorId.length > 0 &&
          arrayDoctorId.map((el) => {
            return (
              <div className="each-doctor" key={el}>
                <div className="content-left">
                  <div className="profile-doctor">
                    <ProfileDoctor
                      dataSchedule={{
                        doctorId: "7c802da9-8665-4158-89a7-e97a73728c1e",
                      }}
                      isShowDescription={true}
                    />
                  </div>
                </div>
                <div className="content-right">
                  <div className="doctor-schedule">
                    <DoctorSchedule arrayDoctorId={el} />
                  </div>
                  <div className="doctor-extra-info">
                    <DoctorExtraInfo doctorIdFromParent={el} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty);
