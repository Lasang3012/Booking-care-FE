import React, { Component } from "react";
import { connect } from "react-redux";
import { userService } from "../../../services";
import { CODES, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

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
    this.props.getGenderStart();
    try {
      const listGender = await userService.getAllCode(CODES.GENDER);
      const listRole = await userService.getAllCode(CODES.ROLE);
      const listPosition = await userService.getAllCode(CODES.POSITION);
      // this.setState({
      //   gender: listGender.data,
      //   role: listRole.data,
      //   position: listPosition.data,
      // });
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({ gender: this.props.genderRedux });
    }
  }

  render() {
    const language = this.props.language;
    this.props.getGenderStart();
    // const listGender = this.props.genderRedux;
    // console.log(listGender);
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
                  {this.state.gender.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {language == LANGUAGES.VI ? el.valueVi : el.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-3">
                <label>Role Id:</label>
                <select className="form-select">
                  {this.state.role.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {language == LANGUAGES.VI ? el.valueVi : el.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-3">
                <label>Position Id:</label>
                <select className="form-select">
                  {this.state.position.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {language == LANGUAGES.VI ? el.valueVi : el.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-3">
                <label htmlFor="formFile" className="form-label">
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
    genderRedux: state.admin.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => {
      return dispatch(actions.getGenderStart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
