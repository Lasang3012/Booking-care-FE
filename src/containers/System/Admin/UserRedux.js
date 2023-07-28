import React, { Component } from "react";
import { connect } from "react-redux";
import { userService } from "../../../services";
import { CODES, LANGUAGES } from "../../../utils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: [],
      role: [],
      position: [],
    };
  }

  async componentDidMount() {
    try {
      const listGender = await userService.getAllCode(CODES.GENDER);
      const listRole = await userService.getAllCode(CODES.ROLE);
      const listPosition = await userService.getAllCode(CODES.POSITION);
      this.setState({
        gender: listGender.data,
        role: listRole.data,
        position: listPosition.data,
      });
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  render() {
    const language = this.props.language;
    console.log(language);
    return (
      <div className="user-redux-container">
        <div className="title">User redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">Thêm mới người dùng</div>
              <div className="col-3">
                <label>Email:</label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-3">
                <label>Name:</label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-3">
                <label>Password:</label>
                <input className="form-control" type="password" />
              </div>
              <div className="col-3">
                <label>Confirm password:</label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-3">
                <label>Phone Number:</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label>Gender:</label>
                <select className="form-select">
                  <option selected>Choose...</option>
                  {this.state.gender.map((el) => {
                    return (
                      <option key={el.id}>
                        {language == LANGUAGES.VI ? el.valueVi : el.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-3">
                <label>Role Id:</label>
                <select className="form-select">
                  <option selected>Choose...</option>
                  {this.state.role.map((el) => {
                    return (
                      <option key={el.id}>
                        {language == LANGUAGES.VI ? el.valueVi : el.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-3">
                <label>Position Id:</label>
                <select className="form-select">
                  <option selected>Choose...</option>
                  {this.state.position.map((el) => {
                    return (
                      <option key={el.id}>
                        {language == LANGUAGES.VI ? el.valueVi : el.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-3">
                <label for="formFile" className="form-label">
                  file input example
                </label>
                <input className="form-control" type="file" id="formFile" />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary mb-3">
                  Submit
                </button>
              </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
