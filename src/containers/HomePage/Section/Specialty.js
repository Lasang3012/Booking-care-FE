import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ORDERBY } from "../../../utils";

class Specialty extends Component {
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
      this.props.getListSpecialty({
        createdAt: ORDERBY.DESC,
      });
    } catch (e) {
      console.log("Lỗi ở component Specialty redux");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { listSpecialty } = this.props;
    if (prevProps.listSpecialty !== listSpecialty) {
      this.setState({
        listSpecialty: this.props.listSpecialty,
      });
    }
  };

  render() {
    const { listSpecialty } = this.props;

    return (
      <div className="section-share section-specialty">
        <div className="section-header">
          <span>Chuyên khoa phổ biến</span>
          <button>Xem thêm</button>
        </div>
        <div className="section-content">
          <Slider {...this.props.settings}>
            {listSpecialty &&
              listSpecialty?.data?.length > 0 &&
              listSpecialty.data.map((el) => {
                return (
                  <div
                    className="slider-item slider-item-outstanding-doctor"
                    onClick={() => this.handleViewDetailsDoctor(el)}
                    key={el.id}
                  >
                    <div className="outer-bg">
                      <div
                        className="image image-outstanding-doctor"
                        style={{
                          backgroundImage: `url(http://localhost:8088/images/specialty/${el.image})`,
                        }}
                      ></div>
                    </div>
                    <div className="name">
                      <div>{el.name}</div>
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
    listSpecialty: state.user.listSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListSpecialty: (query) => {
      return dispatch(actions.getListSpecialty(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
