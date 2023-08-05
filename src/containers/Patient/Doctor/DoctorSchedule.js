import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import Select, { createFilter } from "react-select";
import chroma from "chroma-js";
import moment from "moment/moment";
import * as actions from "../../../store/actions";
import vi from "moment/locale/vi";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDays: [],
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
    //
    console.log(results);
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {};

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
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <Select
              options={this.state?.allDays}
              styles={colorStyles}
              key={this.state?.color}
              value={this.state?.value}
              onChange={(value) => this.handleOnChangeSelectDate(value)}
            />
          </div>
          <div className="all-available-time"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSchedules: (data) => {
      return dispatch(actions.getSchedulesSuccess(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
