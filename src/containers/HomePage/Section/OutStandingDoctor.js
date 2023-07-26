import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-header">
          <span>Bác sĩ nổi bật tuần qua</span>
          <button>Xem thêm</button>
        </div>
        <div className="section-content">
          <Slider {...this.props.settings}>
            <div className="slider-item slider-item-outstanding-doctor">
              <div className="outer-bg">
                <div className="image image-outstanding-doctor"></div>
              </div>
              <div className="name">
                <div>Bác sĩ Sang</div>
                <div>Sức khỏe tâm thần</div>
              </div>
            </div>
            <div className="slider-item slider-item-outstanding-doctor">
              <div className="outer-bg">
                <div className="image image-outstanding-doctor"></div>
              </div>
              <div className="name">
                <div>Bác sĩ Sang</div>
                <div>Sức khỏe tâm thần</div>
              </div>
            </div>
            <div className="slider-item slider-item-outstanding-doctor">
              <div className="outer-bg">
                <div className="image image-outstanding-doctor"></div>
              </div>
              <div className="name">
                <div>Bác sĩ Sang</div>
                <div>Sức khỏe tâm thần</div>
              </div>
            </div>
            <div className="slider-item slider-item-outstanding-doctor">
              <div className="outer-bg">
                <div className="image image-outstanding-doctor"></div>
              </div>
              <div className="name">
                <div>Bác sĩ Sang</div>
                <div>Sức khỏe tâm thần</div>
              </div>
            </div>
            <div className="slider-item slider-item-outstanding-doctor">
              <div className="outer-bg">
                <div className="image image-outstanding-doctor"></div>
              </div>
              <div className="name">
                <div>Bác sĩ Sang</div>
                <div>Sức khỏe tâm thần</div>
              </div>
            </div>
            <div className="slider-item slider-item-outstanding-doctor">
              <div className="outer-bg">
                <div className="image image-outstanding-doctor"></div>
              </div>
              <div className="name">
                <div>Bác sĩ Sang</div>
                <div>Sức khỏe tâm thần</div>
              </div>
            </div>
          </Slider>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
