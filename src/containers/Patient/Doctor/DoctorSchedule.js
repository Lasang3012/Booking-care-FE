import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import Select, { createFilter } from "react-select";
import chroma from "chroma-js";
import moment from "moment/moment";
import * as actions from "../../../store/actions";
import vi from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataSchedule: {},
      dateChoose: "",
    };
  }

  componentDidMount() {
    try {
      let allDays = [];
      let colorDays = [
        "#00B8D9",
        "#0052CC",
        "#5243AA",
        "#FF5630",
        "#FF8B00",
        "#FFC400",
        "#36B37E",
      ];

      for (let i = 0; i < 7; i++) {
        let object = {};
        object.label = moment(new Date())
          .locale("vi", vi)
          .add(i, "days")
          .format("dddd - DD/MM")
          .replace(/^\w/, (c) => c.toUpperCase());
        object.value = moment(new Date())
          .add(i, "days")
          .startOf("day")
          .valueOf();
        object.color = colorDays[i];
        allDays.push(object);
      }

      this.setState({
        allDays: allDays,
      });
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  handleOnChangeSelectDate = async (selectedDate) => {
    const date = selectedDate.value;
    // convert epoch -> DateTime -> epoch -> DateTime
    const dateChoose = new Date(date);
    const epochToDateTime = new Date(dateChoose.toISOString());
    epochToDateTime.setHours(epochToDateTime.getHours() + 7);
    // get schedule by doctorId and date choose
    const results = await this.props.getSchedules({
      doctorId: this.props.userId,
      date: epochToDateTime.toISOString(),
    });
    const availableSchedules = results.data.data;
    let availableTimeArray = [];
    for (let i = 0; i < availableSchedules.length; i++) {
      const { timeKey, timeType } = availableSchedules[i];
      const availableSchedule = await this.props.getListCode({
        key: timeKey,
        type: timeType,
      });
      availableTimeArray.push(availableSchedule.data[0]);
    }
    //
    this.setState({
      allAvailableTime: availableTimeArray,
      dateChoose: dateChoose,
      dateChooseEpoch: date,
    });
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {};

  handleClickScheduleTime = (el) => {
    const doctorId = this.props.userId;
    this.setState({
      isOpenModalBooking: true,
      dataSchedule: { ...el, doctorId: doctorId },
    });
  };

  handleCloseBookingModal = () => {
    this.setState({ isOpenModalBooking: false });
  };

  render() {
    const dot = (color = "transparent") => ({
      alignItems: "center",
      display: "flex",

      ":before": {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginRight: 8,
        height: 10,
        width: 10,
      },
    });

    const colorStyles = {
      control: (styles) => ({
        ...styles,
        width: 200,
        backgroundColor: "white",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? data.color
            : isFocused
            ? color.alpha(0.1).css()
            : undefined,
          color: isDisabled
            ? "#ccc"
            : isSelected
            ? chroma.contrast(color, "white") > 2
              ? "white"
              : "black"
            : data.color,
          cursor: isDisabled ? "not-allowed" : "default",

          ":active": {
            ...styles[":active"],
            backgroundColor: !isDisabled
              ? isSelected
                ? data.color
                : color.alpha(0.3).css()
              : undefined,
          },
        };
      },
      container: (provided) => ({
        ...provided,
        width: 200,
      }),

      input: (styles) => ({ ...styles, ...dot() }),
      placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
      singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };
    const { allAvailableTime, isOpenModalBooking } = this.state;
    const language = this.props.language;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <Select
              options={this.state?.allDays}
              styles={colorStyles}
              key={this.state?.allDays.color}
              value={this.state?.allDays?.value}
              onChange={(value) => this.handleOnChangeSelectDate(value)}
            />
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt"></i>
                Lịch khám
              </span>
            </div>
            <div className="time-content">
              <div className="time-content-btn">
                {allAvailableTime && allAvailableTime.length > 0
                  ? allAvailableTime.map((el) => {
                      return (
                        <button
                          key={el.id}
                          onClick={() => this.handleClickScheduleTime(el)}
                        >
                          {language === LANGUAGES.VI ? el.valueVi : el.valueEn}
                        </button>
                      );
                    })
                  : "Hôm nay không có lịch khám"}
              </div>

              <div className="book-free">
                <span>
                  Chọn <i className="far fa-hand-point-up"></i> và đặt (miễn
                  phí)
                </span>
              </div>
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          dataSchedule={this.state.dataSchedule}
          handleCloseBookingModal={this.handleCloseBookingModal}
          dateChoose={this.state.dateChoose}
          dateChooseEpoch={this.state.dateChooseEpoch}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    listCode: state.user.listCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSchedules: (data) => {
      return dispatch(actions.getSchedulesSuccess(data));
    },
    getListCode: (query) => {
      return dispatch(actions.getAllCodeSuccess(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
