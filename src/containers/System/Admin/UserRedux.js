import React, { Component } from "react";
import { connect } from "react-redux";
import { userService } from "../../../services";
import { CODES, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: [],
      role: [],
      position: [],
      previewImageUrl: "",
      isOpen: false,

      name: "",
      email: "",
      image: "",
      password: "",
      passwordConfirm: "",
      positionId: "",
      genderId: "",
      roleId: "",
      phone: "",
    };
  }

  async componentDidMount() {
    try {
      this.props.getGenderStart();
      this.props.getRoleSuccess();
      this.props.getPositionSuccess();
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const listGender = this.props.genderRedux;
    const listRole = this.props.roleRedux;
    const listPosition = this.props.positionRedux;
    if (prevProps.genderRedux !== listGender) {
      this.setState({
        gender: listGender,
        genderId: listGender && listGender.length > 0 ? listGender[0]?.id : "",
      });
    }
    if (prevProps.roleRedux !== listRole) {
      this.setState({
        role: listRole,
        roleId: listRole && listRole.length > 0 ? listRole[0]?.id : "",
      });
    }
    if (prevProps.positionRedux !== listPosition) {
      this.setState({
        position: listPosition,
        positionId:
          listPosition && listPosition.length > 0 ? listPosition[0]?.id : "",
      });
    }

    if (prevProps.listUserRedux !== this.props.listUserRedux) {
      this.setState({
        name: "",
        email: "",
        image: "",
        password: "",
        passwordConfirm: "",
        phone: "",
      });
    }
  }

  handleOnChangeImage = (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageUrl: objectUrl,
      });
    }
  };

  openPreviewImage = () => {
    this.setState({ isOpen: true });
  };

  checkValidateInput = () => {
    const arrCheck = ["name", "email", "password", "passwordConfirm"];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        console.log("nhap vao di");
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    const isEmpty = this.checkValidateInput();
    if (!isEmpty) {
      return;
    }

    this.props.createUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      positionId: this.state.positionId,
      genderId: this.state.genderId,
      roleId: this.state.roleId,
      phone: this.state.phone,
    });
  };

  onChangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    const language = this.props.language;
    const {
      name,
      email,
      image,
      password,
      passwordConfirm,
      positionId,
      roleId,
      genderId,
      phone,
    } = this.state;

    return (
      <>
        <div className="user-redux-container">
          <div className="title">User redux</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">Thêm mới người dùng</div>
                <div className="col-3">
                  <label>Email:</label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(event) => this.onChangeInput(event, "email")}
                  />
                </div>
                <div className="col-3">
                  <label>Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(event) => this.onChangeInput(event, "name")}
                  />
                </div>
                <div className="col-3">
                  <label>Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) => this.onChangeInput(event, "password")}
                  />
                </div>
                <div className="col-3">
                  <label>Confirm password:</label>
                  <input
                    className="form-control"
                    type="password"
                    value={passwordConfirm}
                    onChange={(event) =>
                      this.onChangeInput(event, "passwordConfirm")
                    }
                  />
                </div>
                <div className="col-3">
                  <label>Phone Number:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={(event) => this.onChangeInput(event, "phone")}
                  />
                </div>
                <div className="col-3">
                  <label>Gender:</label>
                  <select
                    className="form-select"
                    onChange={(event) => this.onChangeInput(event, "genderId")}
                  >
                    {this.state.gender.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {language === LANGUAGES.VI ? el.valueVi : el.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label>Role Id:</label>
                  <select
                    className="form-select"
                    onChange={(event) => this.onChangeInput(event, "roleId")}
                  >
                    {this.state.role.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {language === LANGUAGES.VI ? el.valueVi : el.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-3">
                  <label>Position Id:</label>
                  <select
                    className="form-select"
                    onChange={(event) =>
                      this.onChangeInput(event, "positionId")
                    }
                  >
                    {this.state.position.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {language === LANGUAGES.VI ? el.valueVi : el.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-3">
                  <label>Ảnh đại diện:</label>
                  <div className="image-content">
                    <div className="upload-image">
                      <label htmlFor="formFile" className="label-upload">
                        Tải ảnh <i className="fas fa-upload"></i>
                      </label>
                      <input
                        type="file"
                        id="formFile"
                        hidden
                        onChange={(event) => this.handleOnChangeImage(event)}
                      />
                    </div>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImageUrl})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary mb-3"
                    onClick={() => this.handleSaveUser()}
                  >
                    Submit
                  </button>
                </div>
                <div className="col-12">
                  <TableManageUser />
                </div>
              </div>
            </div>
          </div>

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImageUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.gender,
    roleRedux: state.admin.role,
    positionRedux: state.admin.position,
    listUserRedux: state.admin.listUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => {
      return dispatch(actions.getGenderStart());
    },
    getRoleSuccess: () => {
      return dispatch(actions.getRoleSuccess());
    },
    getPositionSuccess: () => {
      return dispatch(actions.getPositionSuccess());
    },
    createUser: (data) => {
      return dispatch(actions.createUser(data));
    },
    getListUser: () => {
      return dispatch(actions.getListUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
