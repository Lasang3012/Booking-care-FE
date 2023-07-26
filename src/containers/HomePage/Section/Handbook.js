import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-header">
          <span>Cẩm nang</span>
          <button>Xem thêm</button>
        </div>
        <div className="section-content">
          <Slider {...this.props.settings}>
            <div className="slider-item">
              <div className="image image-medical-facility"></div>
              <div className="name">
                <span>Bệnh viện lão khoa trung ương</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-medical-facility"></div>
              <div className="name">
                <span>Bệnh viện lão khoa trung ương</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-medical-facility"></div>
              <div className="name">
                <span>Bệnh viện lão khoa trung ương</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-medical-facility"></div>
              <div className="name">
                <span>Bệnh viện lão khoa trung ương</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-medical-facility"></div>
              <div className="name">
                <span>Bệnh viện lão khoa trung ương</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-medical-facility"></div>
              <div className="name">
                <span>Bệnh viện lão khoa trung ương</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
