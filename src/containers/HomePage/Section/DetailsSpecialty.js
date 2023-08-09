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
import { Link, withRouter } from "react-router-dom";

class DetailsSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      specialtyInfo: {},
    };
  }

  componentDidMount = async () => {
    try {
      const specialtyId = this.props.match.params.id;
      if (specialtyId) {
        const listDoctor = await this.props.getListDoctorByQuery({
          specialtyId: specialtyId,
        });
        const specialtyInfo = await this.props.getSpecialtyById(specialtyId);
        if (listDoctor) {
          this.setState({
            listDoctor: listDoctor.data.data,
            specialtyInfo: specialtyInfo.data.data,
          });
        }
      }
    } catch (e) {
      console.log("Lỗi ở component DetailsSpecialty redux");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {};

  render() {
    const { listDoctor, specialtyInfo } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="description-specialty">
          <h3
            style={{ textAlign: "center", fontSize: "30px", fontWeight: 600 }}
          >
            {specialtyInfo.name}
          </h3>
          <div
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{
              __html: specialtyInfo?.descriptionHTML,
            }}
          ></div>
        </div>

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
                    <div>
                      <Link
                        to={`/details-doctor/${el?.doctorId}`}
                        style={{
                          textDecoration: "none",
                          fontSize: "15px",
                          fontWeight: 600,
                          paddingLeft: "90px",
                          paddingTop: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Xem thêm
                      </Link>
                    </div>
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
    getSpecialtyById: (specialtyId) => {
      return dispatch(actions.getSpecialtyById(specialtyId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty);
