import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, ROLE_KEYS } from "../../utils";
import { FormattedMessage } from "react-intl";
import { userService } from "../../services/";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      menuApp: [],
    };
  }
  async componentDidMount() {
    try {
      const userTokenFromRedux = this.props.userToken;
      const result = await userService.getUserInfoByToken(userTokenFromRedux);
      const userInfo = result.userInfo;
      this.setState({
        userInfo: userInfo,
      });
      const codeData = await this.props.getCodeById(userInfo.roleId);
      let menu = [];
      if (codeData.data.data.key === ROLE_KEYS.ADMIN) {
        menu = adminMenu;
      }
      if (codeData.data.data.key === ROLE_KEYS.DOCTOR) {
        menu = doctorMenu;
      }
      this.setState({
        menuApp: menu,
      });
    } catch (e) {
      console.log(e);
    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    const { processLogout } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />,{" "}
            {this.state.userInfo?.name} !
          </span>
          <span
            className={
              this.props.language === LANGUAGES.VI
                ? "language-vi active"
                : "language-vi"
            }
            onClick={() => this.changeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={
              this.props.language === LANGUAGES.EN
                ? "language-en active"
                : "language-en"
            }
            onClick={() => this.changeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userToken: state.user.userToken,
    codeData: state.user.codeData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => {
      return dispatch(actions.changeLanguageApp(language));
    },
    getCodeById: (codeId) => {
      return dispatch(actions.getCodeByIdSuccess(codeId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
