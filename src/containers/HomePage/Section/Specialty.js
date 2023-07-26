import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    return (
      <div className="section-specialty">
        <div className="specialty-header">
          <span>Chuyên khoa phổ biến</span>
          <button>Xem thêm</button>
        </div>
        <div className="specialty-content">
          <Slider {...settings}>
            <div className="slider-item">
              <div className="image"></div>
              <div className="name">Khám thai</div>
            </div>
            <div className="slider-item">
              <div className="image"></div>
              <div className="name">Khám thai</div>
            </div>
            <div className="slider-item">
              <div className="image"></div>
              <div className="name">Khám thai</div>
            </div>
            <div className="slider-item">
              <div className="image"></div>
              <div className="name">Khám thai</div>
            </div>
            <div className="slider-item">
              <div className="image"></div>
              <div className="name">Khám thai</div>
            </div>
            <div className="slider-item">
              <div className="image"></div>
              <div className="name">Khám thai</div>
            </div>
          </Slider>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
