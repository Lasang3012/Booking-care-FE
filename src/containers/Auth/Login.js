import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { userService } from "../../services/";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUserEmail = (event) => {
    return this.setState({
      email: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    return this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      const userToken = await userService.handleLogin(
        this.state.email,
        this.state.password
      );
      this.props.userLoginSuccess(userToken.token);
    } catch (e) {
      if (e.data) {
        this.setState({
          errMessage: e.data.status,
        });
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeUserEmail(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      !this.state.isShowPassword
                        ? "fas fa-eye-slash"
                        : "fas fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 btn-login">
              <button onClick={() => this.handleLogin()}>Login</button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-order-login">Or login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userToken) =>
      dispatch(actions.userLoginSuccess(userToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
