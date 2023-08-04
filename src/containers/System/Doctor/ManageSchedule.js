import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select, { createFilter } from "react-select";
import * as actions from "../../../store/actions";
import { ORDERBY, CODES, ROLE_KEYS } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDoctor: {},
      listDoctor: [],
      optionsDoctor: [],
      currentDate: "",
      rangTime: [],
    };
  }

  componentDidMount() {
    try {
      this.props.getListDoctor({
        createdAt: "desc",
        roleId: "abc2",
      });
      this.props.getListCode({
        type: CODES.TIME,
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
        rangTime: listCode,
      });
    }
  };

  handleSelectedDoctor = async (selectedDoctor) => {
    const userInfo = await this.props.getUserById(selectedDoctor.value);
    const userData = userInfo.data.data;
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

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  render() {
    const {
      listDoctor,
      listCode,
      userInfo,
      optionsDoctor,
      currentDate,
      rangTime,
    } = this.state;
    console.log(this.state);
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label>Chọn bác sĩ</label>
              <Select
                value={optionsDoctor.length > 0 ? optionsDoctor[0]?.name : ""}
                onChange={this.handleSelectedDoctor}
                options={optionsDoctor}
                className="form-control form-control-custom"
                filterOption={createFilter({ ignoreAccents: false })}
                styles={{ padding: "0 0 0 0 !important" }}
              />
            </div>
            <div className="col-6">
              <label>Chọn ngày </label>
              <DatePicker
                className="form-control form-control-custom"
                minDate={new Date()}
                onChange={this.handleOnChangeDatePicker}
                value={currentDate}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangTime &&
                rangTime.length > 0 &&
                rangTime.map((el) => {
                  return (
                    <button className="btn btn-schedule" key={el.id}>
                      {el.valueVi}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary btn-save-schedule">Lưu thông tin</button>
          </div>
        </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
