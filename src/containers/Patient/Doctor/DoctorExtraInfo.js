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
      moreInfo: {},
    };
  }

  async componentDidMount() {
    try {
      if (this.props.doctorIdFromParent) {
        const doctorUserMoreInfo = await this.props.getDoctorUserMoreInfoById(
          this.props.doctorIdFromParent
        );
        this.setState({ moreInfo: doctorUserMoreInfo.data.data });
      }
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      const doctorUserMoreInfo = await this.props.getDoctorUserMoreInfoById(
        this.props.doctorIdFromParent
      );
      this.setState({ moreInfo: doctorUserMoreInfo.data.data });
    }
  };

  handleShowOrHideDetail = () => {
    this.setState({
      isShowDetailInfo: !this.state.isShowDetailInfo,
    });
  };

  render() {
    const { isShowDetailInfo, moreInfo } = this.state;
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <h3>ĐỊA CHỈ KHÁM</h3>
            <div className="name">{moreInfo?.nameClinic}</div>
            <div className="address">{moreInfo?.addressClinic}</div>
          </div>
          <div className="content-down">
            {!isShowDetailInfo ? (
              <div>
                Giá khám:{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(moreInfo?.priceNameVi)}{" "}
                vnđ
                <span
                  onClick={() => this.handleShowOrHideDetail()}
                  className="view-detail"
                >
                  xem chi tiet
                </span>
              </div>
            ) : (
              <>
                <div className="detail-info">
                  <div className="price">
                    <span className="left">Giá khám</span>
                    <span className="right">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(moreInfo?.priceNameVi)}
                    </span>
                  </div>
                  <div className="note">{moreInfo?.note}</div>
                </div>
                <div className="payment">{moreInfo?.paymentNameVi}</div>
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
    userDoctorInfo: state.user.userDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorUserMoreInfoById: (userId) => {
      return dispatch(actions.getDoctorUserMoreInfoByIdSuccess(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
