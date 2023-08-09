import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select, { createFilter } from "react-select";
import * as actions from "../../../store/actions";
import { CODES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDoctor: {},
      listDoctor: [],
      optionsDoctor: [],
      currentDate: "",
      rangeTime: [],
      arrayDate: [],
      newDataCreateSchedule: [],
    };
  }

  componentDidMount() {
    try {
      this.props.getListDoctor({
        createdAt: "desc",
        roleId: "role_2",
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
      if (listCode && listCode.length > 0) {
        const newListCode = listCode.map((el) => ({
          ...el,
          isSelected: false,
        }));
        this.setState({
          rangeTime: newListCode,
        });
      }
    }
  };

  handleSelectedDoctor = async (selectedDoctor) => {
    const userInfo = await this.props.getUserById(selectedDoctor.value);
    const userData = userInfo.data.data;
    this.setState({ selectedDoctor: userInfo.data.data });
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
    const newDate = moment(date[0]).format("DD/MM/YYYY");
    let arrayDate = this.state.arrayDate;
    arrayDate.push(newDate);
    if (arrayDate.length > 1) {
      this.setState({
        currentDate: arrayDate[arrayDate.length - 2],
      });
    }
  };

  handleClickBtnTime = (time) => {
    const listRangeTime = this.state.rangeTime;
    listRangeTime.filter((obj) => {
      if (obj.id === time.id) {
        obj.isSelected = !obj.isSelected;
      }
    });
    this.setState({ rangeTime: listRangeTime });
  };

  handleSaveSchedule = async () => {
    const { selectedDoctor, rangeTime, currentDate } = this.state;
    if (!currentDate) {
      toast.warn("Invalid date!");
    }
    if (!selectedDoctor.id) {
      toast.warn("Invalid selected doctor!");
    }
    if (!rangeTime) {
      toast.warn("Invalid range time!");
    }
    if (rangeTime && rangeTime.length > 0) {
      const isSelectedTime = rangeTime.filter((obj) => {
        if (obj.isSelected) {
          return obj;
        }
      });

      const newDataCreateSchedule = isSelectedTime.map((el) => {
        return {
          doctorId: selectedDoctor.id,
          date: currentDate,
          timeId: el.id,
          timeKey: el.key,
          timeType: el.type,
        };
      });
      await this.props.createDoctorSchedule(newDataCreateSchedule);
      rangeTime.map((el) => (el.isSelected = false));
      this.setState({
        optionsDoctor: [],
        currentDate: new Date(),
        rangeTime: rangeTime,
      });
    }
  };

  render() {
    const { optionsDoctor, rangeTime } = this.state;
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
                value={this.state.currentDate}
                onChange={this.handleOnChangeDatePicker}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((el) => {
                  if (!el.isSelected) {
                    return (
                      <button
                        className="btn btn-schedule"
                        key={el.id}
                        onClick={() => this.handleClickBtnTime(el)}
                      >
                        {el.valueVi}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        className="btn btn-schedule-is-selected"
                        key={el.id}
                        onClick={() => this.handleClickBtnTime(el)}
                      >
                        {el.valueVi}
                      </button>
                    );
                  }
                })}
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary btn-save-schedule"
              onClick={() => this.handleSaveSchedule()}
            >
              Lưu thông tin
            </button>
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
    createDoctorSchedule: (data) => {
      return dispatch(actions.createDoctorScheduleSuccess(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
