import React, { Component } from "react";
import { connect } from "react-redux";
import { userService } from "../../../services";
import { CODES, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: [],
      role: [],
      position: [],
      previewImageUrl: "",
      isOpen: false,
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
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({ gender: this.props.genderRedux });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({ role: this.props.roleRedux });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({ position: this.props.positionRedux });
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

  render() {
    const language = this.props.language;
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
                        {language === LANGUAGES.VI ? el.valueVi : el.valueEn}
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
                        {language === LANGUAGES.VI ? el.valueVi : el.valueEn}
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
                <button type="submit" className="btn btn-primary mb-3">
                  Submit
                </button>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.gender,
    roleRedux: state.admin.role,
    positionRedux: state.admin.position,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
