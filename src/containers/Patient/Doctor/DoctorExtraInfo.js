import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import * as actions from "../../../store/actions";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
    };
  }

  async componentDidMount() {
    try {
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState) => {};

  handleShowOrHideDetail = () => {
    this.setState({
      isShowDetailInfo: !this.state.isShowDetailInfo,
    });
    console.log(this.state.isShowDetailInfo);
  };

  render() {
    const { isShowDetailInfo } = this.state;
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <h3>aaaaaa</h3>
            <div className="name">bbbbbb</div>
            <div className="address">vvvvvvvvv</div>
          </div>
          <div className="content-down">
            {!isShowDetailInfo ? (
              <div>
                Giá khám Giá tư vấn 15 phút: 250.000vnđ
                <span onClick={() => this.handleShowOrHideDetail()}>
                  xem chi tiet
                </span>
              </div>
            ) : (
              <>
                <div className="title-price">Giá khám</div>
                <div className="detail-info">
                  <div className="price">
                    <span className="left">Giá khám</span>
                    <span className="right">11111</span>
                  </div>
                  <div className="note">
                    Giá khám Giá tư vấn 15 phút: 250.000vnđ Giá tư vấn 30 phút:
                    500.000vnđ 250.000đ - 500.000đ
                  </div>
                </div>
                <div className="payment">Giá khám Giá t</div>
                <span
                  onClick={() => this.handleShowOrHideDetail()}
                  className="hide-detail"
                >
                  Ẩn bảng giá
                </span>
              </>
            )}
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
