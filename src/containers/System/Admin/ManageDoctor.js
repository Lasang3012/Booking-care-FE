import React, { Component } from "react";
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
import "./ManageDoctor.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select, { createFilter } from "react-select";
import TableManageUser from "./TableManageUser";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentMarkdownHTML: "",
      selectedDoctor: {},
      description: "",
      listDoctor: [],
      listCode: [],
      hasDoctorId: false,
      optionsDoctor: [],
    };
  }

  componentDidMount() {
    try {
      this.props.getListCode({
        type: CODES.ROLE,
        key: ROLE_KEYS.DOCTOR,
      });
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const listDoctor = this.props.listDoctor;
    const listCode = this.props.listCode;
    if (prevProps.listDoctor !== listDoctor) {
      const dataSelect = this.handleDataInputSelect(listDoctor.data);
      this.setState({
        listDoctor: this.props.listDoctor.data,
        optionsDoctor: dataSelect,
      });
    }
    if (prevProps.listCode !== listCode) {
      this.setState({
        listCode: this.props.listCode,
      });
    }

    if (this.state.listCode.length > 0 && !this.state.hasDoctorId) {
      const doctorRoleId = this.state.listCode[0].id;
      this.props.getListDoctor({
        createdAt: ORDERBY.DESC,
        roleId: doctorRoleId,
      });

      this.setState({ hasDoctorId: true });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentMarkdownHTML: html,
    });
  };

  handleSaveContentMarkdown = async () => {
    const {
      contentMarkdown,
      contentMarkdownHTML,
      selectedDoctor,
      description,
    } = this.state;
    const result = await this.props.createMarkdownDoctor({
      contentMarkdown: contentMarkdown,
      contentMarkdownHTML: contentMarkdownHTML,
      selectedDoctor: selectedDoctor,
      description: description,
    });
  };

  handleOnChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSelectedDoctor = (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
  };

  handleDataInputSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((el) => {
        let object = { value: "", label: "" };
        object.value = el.id;
        object.label = el.name;
        result.push(object);
      });
    }
    return result;
  };

  render() {
    const language = this.props.language;
    const { selectedDoctor, listCode, listDoctor, optionsDoctor } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="more-info">
          <div className="content-left from-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={optionsDoctor[0]?.name}
              onChange={this.handleSelectedDoctor}
              options={optionsDoctor}
              className="form-control"
              filterOption={createFilter({ ignoreAccents: false })}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu:</label>
            <textarea
              className="form-control"
              rows={4}
              onChange={(event) => this.handleOnChangeDescription(event)}
              value={this.state.description}
            >
              Tạo thêm thông tin doctor
            </textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    listDoctor: state.user.listDoctor,
    listCode: state.user.listCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListCode: (query) => {
      return dispatch(actions.getAllCodeSuccess(query));
    },
    getListDoctor: (query) => {
      return dispatch(actions.getListDoctorSuccess(query));
    },
    createMarkdownDoctor: (data) => {
      return dispatch(actions.createMarkdownDoctorSuccess(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
