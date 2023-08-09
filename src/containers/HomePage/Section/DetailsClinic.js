import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ORDERBY } from "../../../utils";
import HomeHeader from "../HomeHeader";
import DoctorSchedule from "../../Patient/Doctor/DoctorSchedule";
import "./DetailsClinic.scss";
import DetailsDoctor from "../../Patient/Doctor/DetailsDoctor";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor";
import { Link, withRouter } from "react-router-dom";
import DoctorExtraInfo from "../../Patient/Doctor/DoctorExtraInfo";

class DetailsClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicInfo: {},
      listDoctor: [],
    };
  }

  componentDidMount = async () => {
    try {
      const clinicId = this.props.match.params.id;
      if (clinicId) {
        const clinicInfo = await this.props.getClinicById(clinicId);
        const listDoctor = await this.props.getListDoctorByQuery({
          clinicId: clinicId,
        });
        this.setState({
          clinicInfo: clinicInfo.data.data,
          listDoctor: listDoctor.data.data,
        });
      }
    } catch (e) {
      console.log("Lỗi ở component DetailsClinic redux");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {};

  render() {
    const { clinicInfo, listDoctor } = this.state;
    return (
      <div className="detail-clinic-container">
        <HomeHeader />

        <div className="description-clinic">
          <h3
            style={{ textAlign: "center", fontSize: "30px", fontWeight: 600 }}
          >
            {clinicInfo?.name}
          </h3>
          <div className="clinic-info">
            <div
              className="content-left"
              dangerouslySetInnerHTML={{
                __html: clinicInfo?.descriptionHTML,
              }}
            ></div>
            <div
              className="content-right image-clinic"
              style={{
                backgroundImage: `url(http://localhost:8088/images/clinic/${clinicInfo.image})`,
              }}
            ></div>
          </div>
        </div>

        <div className="clinic-list-doctor">
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
    getClinicById: (specialtyId) => {
      return dispatch(actions.getClinicById(specialtyId));
    },
    getListDoctorByQuery: (query) => {
      return dispatch(actions.getListDoctorByQuery(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsClinic);
