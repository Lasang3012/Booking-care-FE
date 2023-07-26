import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {

    return (
      <div className="section-share section-specialty">
        <div className="section-header">
          <span>Chuyên khoa phổ biến</span>
          <button>Xem thêm</button>
        </div>
        <div className="section-content">
          <Slider {...this.props.settings}>
            <div className="slider-item">
              <div className="image image-specialty"></div>
              <div className="name">
                <span>Khám thai</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-specialty"></div>
              <div className="name">
                <span>Khám thai</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-specialty"></div>
              <div className="name">
                <span>Khám thai</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-specialty"></div>
              <div className="name">
                <span>Khám thai</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-specialty"></div>
              <div className="name">
                <span>Khám thai</span>
              </div>
            </div>
            <div className="slider-item">
              <div className="image image-specialty"></div>
              <div className="name">
                <span>Khám thai</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
