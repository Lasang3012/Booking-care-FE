import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { ORDERBY, CODES, ROLE_KEYS } from "../../../utils";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      listCode: [],
      hasDoctorId: false,
    };
  }

  componentDidMount = () => {
    try {
      this.props.getListCode({
        type: CODES.ROLE,
        key: ROLE_KEYS.DOCTOR,
      });
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const listDoctor = this.props.listDoctor;
    const listCode = this.props.listCode;
    if (prevProps.listDoctor !== listDoctor) {
      this.setState({
        listDoctor: this.props.listDoctor,
      });
    }
    if (prevProps.listCode !== listCode) {
      this.setState({
        listCode: this.props.listCode,
      });
    }
    if (this.state.listCode.length > 0 && !this.state.hasDoctorId) {
      const doctorRoleId = this.state.listCode[0].id;
      this.props.getListDoctor({
        createdAt: ORDERBY.DESC,
        roleId: doctorRoleId,
      });

      this.setState({ hasDoctorId: true });
    }
  };

  handleViewDetailsDoctor = (doctorInfo) => {
    this.props.history.push(`/details-doctor/${doctorInfo.id}`);
  };

  render() {
    const listDoctor = this.props.listDoctor;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-header">
          <span>Bác sĩ nổi bật tuần qua</span>
          <button>Xem thêm</button>
        </div>
        <div className="section-content">
          <Slider {...this.props.settings}>
            {listDoctor &&
              listDoctor?.data?.length > 0 &&
              listDoctor.data.map((el) => {
                return (
                  <div
                    className="slider-item slider-item-outstanding-doctor"
                    onClick={() => this.handleViewDetailsDoctor(el)}
                  >
                    <div className="outer-bg">
                      <div
                        className="image image-outstanding-doctor"
                        style={{
                          backgroundImage: `url(http://localhost:8088/images/${el.image})`,
                        }}
                      ></div>
                    </div>
                    <div className="name">
                      <div>{el.name}</div>
                      <div>{el.positionName}</div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    listDoctor: state.user.listDoctor,
    listCode: state.user.listCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListCode: (query) => {
      return dispatch(actions.getAllCodeSuccess(query));
    },
    getListDoctor: (query) => {
      return dispatch(actions.getListDoctorSuccess(query));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
