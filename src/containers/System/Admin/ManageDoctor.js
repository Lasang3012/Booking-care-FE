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
      userInfo: {},

      // save doctor info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: {},
      selectedPayment: {},
      selectedProvince: {},
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    try {
      this.props.getListCode({
        type: CODES.ROLE,
        key: ROLE_KEYS.DOCTOR,
      });
      this.props.getDoctorInfoRequire();
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const listDoctor = this.props.listDoctor;
    const listCode = this.props.listCode;
    const language = this.props.language;
    const listDoctorInfo = this.props.listDoctorInfo;
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
    if (prevProps.listDoctorInfo !== listDoctorInfo) {
      const listPrice = listDoctorInfo.listPrice;
      const listPayment = listDoctorInfo.listPayment;
      const listProvince = listDoctorInfo.listProvince;
      // price
      const newListPrice = [];
      for (let i = 0; i < listPrice.length; i++) {
        const priceObj = {
          id: "",
          key: "",
          label: "",
          color: "",
        };
        priceObj.id = listPrice[i].id;
        priceObj.key = listPrice[i].key;
        priceObj.label =
          language === LANGUAGES.VI
            ? listPrice[i].valueVi
            : listPrice[i].valueEn;
        priceObj.color = reactSelect.colorOptionsData[i].color;
        newListPrice.push(priceObj);
      }
      // payment
      const newListPayment = [];
      for (let i = 0; i < listPayment.length; i++) {
        const priceObj = {
          id: "",
          key: "",
          label: "",
          color: "",
        };
        priceObj.value = listPayment[i].id;
        priceObj.label =
          language === LANGUAGES.VI
            ? listPayment[i].valueVi
            : listPayment[i].valueEn;
        priceObj.color = reactSelect.colorOptionsData[i].color;
        newListPayment.push(priceObj);
      }
      // province
      const newListProvince = [];
      for (let i = 0; i < listProvince.length; i++) {
        const provinceObj = {
          id: "",
          key: "",
          label: "",
          color: "",
        };
        provinceObj.id = listProvince[i].id;
        provinceObj.label =
          language === LANGUAGES.VI
            ? listProvince[i].valueVi
            : listProvince[i].valueEn;
        provinceObj.color = reactSelect.colorOptionsData[i].color;
        newListProvince.push(provinceObj);
      }
      // set State
      this.setState({
        listPrice: newListPrice,
        listPayment: newListPayment,
        listProvince: newListProvince,
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
    this.setState({
      contentMarkdown: "",
      contentMarkdownHTML: "",
      selectedDoctor: "",
      description: "",
      optionsDoctor: [],
    });
  };

  handleOnChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSelectedDoctor = async (selectedDoctor) => {
    const userInfo = await this.props.getUserById(selectedDoctor.value);
    const userData = userInfo.data.data;
    if (userData.name && userData.markdown !== null && userData) {
      this.setState({
        contentMarkdown: userData.markdown.contentMarkdown,
        contentMarkdownHTML: userData.markdown.contentHTML,
        description: userData.markdown.description,
        userInfo: userData,
      });
    } else {
      this.setState({ selectedDoctor: selectedDoctor });
    }
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

  handleOnChangeSelectDate = (selectedDate) => {
    console.log(selectedDate);
  };

  render() {
    const language = this.props.language;
    const {
      selectedDoctor,
      listCode,
      listDoctor,
      optionsDoctor,
      userInfo,
      listPrice,
      listPayment,
      listProvince,
    } = this.state;
    console.log(listPrice);

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="more-info">
          <div className="content-left from-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={optionsDoctor.length > 0 ? optionsDoctor[0]?.name : ""}
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

        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá</label>
            <Select
              options={listPrice && listPrice.length > 0 ? listPrice : []}
              styles={reactSelect.colorStyles}
              key={listPrice?.id}
              value={listPrice?.valueVi}
              placeholder={"Chọn giá"}
              onChange={(value) => this.handleOnChangeSelectDate(value)}
            />
          </div>

          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán</label>
            <Select
              options={listPayment && listPayment.length > 0 ? listPayment : []}
              styles={reactSelect.colorStyles}
              key={listPayment?.id}
              value={listPayment?.valueVi}
              placeholder={"Chọn phương thức thanh toán"}
              onChange={(value) => this.handleOnChangeSelectDate(value)}
            />
          </div>

          <div className="col-4 form-group">
            <label>Chọn tỉnh thành</label>
            <Select
              options={
                listProvince && listProvince.length > 0 ? listProvince : []
              }
              styles={reactSelect.colorStyles}
              key={listProvince?.id}
              value={listProvince?.valueVi}
              placeholder={"Chọn tỉnh thành"}
              onChange={(value) => this.handleOnChangeSelectDate(value)}
            />
          </div>

          <div className="col-4 form-group">
            <label>Tên phòng khám</label>
            <input className="form-control" />
          </div>

          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám</label>
            <input className="form-control" />
          </div>

          <div className="col-4 form-group">
            <label>Note (ghi chú)</label>
            <input className="form-control" />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            value={this.state.contentMarkdown}
            onChange={this.handleEditorChange}
          />
        </div>

        <button
          className={
            userInfo.name && userInfo.markdown !== null && userInfo
              ? "save-content-doctor"
              : "edit-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {userInfo.name && userInfo.markdown !== null && userInfo ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
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
    userInfo: state.user.userInfo,
    listDoctorInfo: state.user.listDoctorInfo,
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
    getUserById: (userId) => {
      return dispatch(actions.getUserByIdSuccess(userId));
    },
    getDoctorInfoRequire: () => {
      return dispatch(actions.getDoctorInfoRequire());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
