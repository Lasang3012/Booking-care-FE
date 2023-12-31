import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  handleBackToHome = () => {
    this.props?.history?.push("/home");
  };
  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.handleBackToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </div>
                <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div className="sub-title">Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div className="sub-title">Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div className="sub-title">Khám sức khỏe tổng quát</div>
              </div>
            </div>

            <div className="right-content">
              <div className="support">
                <i className="fas fa-question support-icon"></i> Hỗ trợ
              </div>
              <div
                className={
                  this.props.language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  this.props.language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">NỀN TẢNG Y TẾ</div>
              <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="search" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option1">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Khám <br />
                    Chuyên khoa
                  </div>
                </div>
                <div className="option2">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Khám <br />
                    từ xa
                  </div>
                </div>
                <div className="option3">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Khám <br />
                    tổng quát
                  </div>
                </div>
                <div className="option4">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Xét nghiệm <br />y học
                  </div>
                </div>
                <div className="option5">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Sức khỏe <br />
                    tinh thần
                  </div>
                </div>
                <div className="option6">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Khám <br />
                    nha khoa
                  </div>
                </div>
                <div className="option7">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Gói <br />
                    phẫu thuật
                  </div>
                </div>
                <div className="option8">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Sản phẩm <br />Y tế
                  </div>
                </div>
                <div className="option9">
                  <div className="icon">
                    <div className="image"></div>
                  </div>
                  <div className="text">
                    Bài test <br />
                    Sức khỏe
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      return dispatch(actions.changeLanguageApp(language));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeHeader));
