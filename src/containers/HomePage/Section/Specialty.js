import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ORDERBY } from "../../../utils";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      listCode: [],
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

  handleViewDetailsSpecialty = (specialtyInfo) => {
    this.props.history.push(`/details-specialty/${specialtyInfo.id}`);
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
              listSpecialty?.length > 0 &&
              listSpecialty.map((el) => {
                return (
                  <div
                    className="slider-item slider-item-outstanding-doctor"
                    onClick={() => this.handleViewDetailsSpecialty(el)}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Specialty));
