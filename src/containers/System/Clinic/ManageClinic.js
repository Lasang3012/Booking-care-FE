import React, { Component } from "react";
import * as reactSelect from "../../../utils/CustomReactSelect";
import { connect } from "react-redux";
import { userService } from "../../../services";
import {
  CODES,
  LANGUAGES,
  CRUD_ACTIONS,
  ROLE_KEYS,
  ORDERBY,
} from "../../../utils";
import * as actions from "../../../store/actions";
import "./ManageClinic.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select, { createFilter } from "react-select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicName: "",
      image: "",
      urlImage: "",
      descriptionMarkdown: "",
      descriptionHTML: "",
      previewImageUrl: "",
      clinicAddress: "",
      isOpen: false,
    };
  }

  componentDidMount() {
    try {
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {};

  openPreviewImage = () => {
    this.setState({ isOpen: true });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  saveClinicData = async () => {
    const {
      clinicName,
      image,
      descriptionMarkdown,
      descriptionHTML,
      clinicAddress,
    } = this.state;
    await this.props.saveClinicData({
      name: clinicName,
      image: image,
      descriptionMarkdown: descriptionMarkdown,
      descriptionHTML: descriptionHTML,
      address: clinicAddress,
      description: descriptionMarkdown,
    });

    toast.success("Tạo thông tin phòng khám thành công");
    this.setState({
      clinicName: "",
      image: "",
      urlImage: "",
      descriptionMarkdown: "",
      descriptionHTML: "",
      previewImageUrl: "",
      clinicAddress: "",
    });
  };

  handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageUrl: objectUrl,
      });
    }
    const imageFileData = await this.props.uploadImageClinic(file);
    if (imageFileData) {
      const fileName = imageFileData.data.data.filename;
      this.setState({
        image: fileName,
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    const language = this.props.language;
    const {
      clinicName,
      image,
      urlImage,
      descriptionMarkdown,
      descriptionHTML,
      clinicAddress,
    } = this.state;

    return (
      <>
        <div className="clinic-container">
          <div className="title">Quản lý phòng khám</div>
          <div className="row">
            <div className="col-6">
              <label>Tên phòng khám:</label>
              <input
                className="form-control"
                type="text"
                value={clinicName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "clinicName")
                }
              />
            </div>
            <div className="col-6">
              <label>Ảnh phòng khám:</label>
              <div className="image-content">
                <div className="upload-image" encType="multipart/form-data">
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
                  style={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? {
                          backgroundImage: `url(http://localhost:8088/images/clinics/${image})`,
                        }
                      : {
                          backgroundImage: `url(${this.state.previewImageUrl})`,
                        }
                  }
                  onClick={() => this.openPreviewImage()}
                ></div>
              </div>
            </div>

            <div className="col-12">
              <label>Địa chỉ phòng khám:</label>
              <input
                className="form-control"
                type="text"
                value={clinicAddress}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "clinicAddress")
                }
              />
            </div>

            <div className="col-12 md-editor">
              <MdEditor
                style={{ height: "400px" }}
                renderHTML={(text) => mdParser.render(text)}
                value={descriptionMarkdown}
                onChange={this.handleEditorChange}
              />
            </div>

            <div className="col-12">
              <button
                className="save-clinic"
                onClick={() => this.saveClinicData()}
              >
                <span>Lưu thông tin</span>
              </button>
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImageClinic: (file) => {
      return dispatch(actions.uploadImageClinic(file));
    },

    saveClinicData: (data) => {
      return dispatch(actions.saveClinicData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
