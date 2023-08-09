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
      listDoctor: [],
    };
  }

  componentDidMount = async () => {
    try {
      const specialtyId = this.props.match.params.id;
      if (specialtyId) {
        const listDoctor = await this.props.getListDoctorByQuery({
          specialtyId: specialtyId,
        });
        if (listDoctor) {
          this.setState({ listDoctor: listDoctor.data.data });
        }
      }
    } catch (e) {
      console.log("Lỗi ở component DetailsSpecialty redux");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {};

  render() {
    const { listDoctor } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="description-specialty"></div>

        {listDoctor &&
          listDoctor.length > 0 &&
          listDoctor.map((el) => {
            return (
              <div className="each-doctor" key={el.id}>
                <div className="content-left">
                  <div className="profile-doctor">
                    <ProfileDoctor
                      dataSchedule={{
                        doctorId: el.doctorId,
                      }}
                      isShowDescription={true}
                    />
                  </div>
                </div>
                <div className="content-right">
                  <div className="doctor-schedule">
                    <DoctorSchedule arrayDoctorId={el.doctorId} />
                  </div>
                  <div className="doctor-extra-info">
                    <DoctorExtraInfo doctorIdFromParent={el.doctorId} />
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
  return {
    getListDoctorByQuery: (query) => {
      return dispatch(actions.getListDoctorByQuery(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty);
