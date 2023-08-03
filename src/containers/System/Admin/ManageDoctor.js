import React, { Component } from "react";
import { connect } from "react-redux";
import { userService } from "../../../services";
import { CODES, LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select, { createFilter } from "react-select";
import TableManageUser from "./TableManageUser";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentMarkdownHTML: "",
      selectedDoctor: "",
      description: "",
    };
  }

  componentDidMount() {
    try {
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {};

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentMarkdownHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    console.log("handleSaveContentMarkdown aaaaa", this.state);
  };

  handleOnChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSelectedDoctor = (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor.value });
  };

  render() {
    const language = this.props.language;
    const { selectedDoctor } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="more-info">
          <div className="content-left from-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={selectedDoctor}
              onChange={this.handleSelectedDoctor}
              options={options}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
