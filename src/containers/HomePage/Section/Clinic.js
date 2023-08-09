import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { ORDERBY } from "../../../utils";
import { withRouter } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }

  componentDidMount = () => {
    try {
      this.props.getListClinic({
        createdAt: ORDERBY.DESC,
      });
    } catch (e) {
      console.log("Lỗi ở component Specialty redux");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { listClinic } = this.props;
    if (prevProps.listClinic !== listClinic) {
      this.setState({
        listClinic: this.props.listClinic,
      });
    }
  };

  handleViewDetailsClinic = (clinicInfo) => {
    this.props.history.push(`/details-clinic/${clinicInfo.id}`);
  };

  render() {
    const { listClinic } = this.props;

    return (
      <div className="section-share section-clinic">
        <div className="section-header">
          <span>Cơ sở y tế nổi bật</span>
          <button>Xem thêm</button>
        </div>
        <div className="section-content">
          <Slider {...this.props.settings}>
            {listClinic &&
              listClinic?.length > 0 &&
              listClinic.map((el) => {
                return (
                  <div
                    className="slider-item slider-item-outstanding-doctor"
                    onClick={() => this.handleViewDetailsClinic(el)}
                    key={el.id}
                  >
                    <div
                      className="image image-clinic"
                      style={{
                        backgroundImage: `url(http://localhost:8088/images/clinic/${el.image})`,
                      }}
                    ></div>
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
    listClinic: state.user.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinic: (query) => {
      return dispatch(actions.getListClinic(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Clinic));
