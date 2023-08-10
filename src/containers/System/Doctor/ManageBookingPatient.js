import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageBookingPatient.scss";
import Select, { createFilter } from "react-select";
import * as actions from "../../../store/actions";
import { CODES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import { userService } from "../../../services";
//
import chroma from "chroma-js";
import vi from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";

class ManageBookingPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listPatient: [],
      allDays: [],
      doctorInfo: {},
      dataModal: {},
      isOpenRemedyModal: false,
    };
  }

  async componentDidMount() {
    try {
      const userToken = this.props.userToken;
      const getUserByTOken = await userService.getUserInfoByToken(userToken);
      const doctorInfo = getUserByTOken.userInfo;
      const listPatientBooking = await this.props.getListPatientBooking({
        doctorId: doctorInfo.id,
      });
      this.setState({
        listPatient: listPatientBooking.data.data,
        doctorInfo: doctorInfo,
      });

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
    const dateChoose = new Date(date + 7 * 3600000);
    const dayUTC = dateChoose.getUTCDate();
    const monthUTC = dateChoose.getUTCMonth() + 1;
    const yearUTC = dateChoose.getUTCFullYear();
    // filter date
    const doctorInfo = this.state.doctorInfo;
    const listPatientBooking = await this.props.getListPatientBooking({
      doctorId: doctorInfo.id,
    });
    console.log(listPatientBooking);
    const results = listPatientBooking.data.data.filter((el) => {
      const epochToTime = new Date(+el.bookingDate + 7 * 3600000);
      const dayUTCFromPatient = epochToTime.getUTCDate();
      const monthUTCFromPatient = epochToTime.getUTCMonth() + 1;
      const yearUTCFromPatient = epochToTime.getUTCFullYear();
      if (
        dayUTCFromPatient == dayUTC &&
        monthUTCFromPatient == monthUTC &&
        yearUTCFromPatient == yearUTC
      ) {
        return el;
      }
    });
    this.setState({
      listPatient: results,
    });
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {};
  handleCloseRemedyModal = () => {
    this.setState({ isOpenRemedyModal: false });
  };

  sendRemedy = async (dataModal) => {
    await this.props.sendRemedy(dataModal);
  };

  handleBtnConfirm = (item) => {
    const {
      patientId,
      doctorId,
      patientEmail,
      time,
      day,
      patientName,
      patientPhone,
    } = item;
    this.setState({
      isOpenRemedyModal: true,
      dataModal: {
        patientId: patientId,
        doctorId: doctorId,
        patientEmail: patientEmail,
        time: time,
        day: day,
        patientName: patientName,
        patientPhone: patientPhone,
      },
    });
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
    //
    const { listPatient, dataModal, isOpenRemedyModal } = this.state;
    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">Quản lý lịch hẹn của bệnh nhân</div>
          <div className="m-p-body row">
            <div className="col-4 form-group">
              <label>Chọn ngày khám </label>
              <Select
                options={this.state?.allDays}
                styles={colorStyles}
                key={this.state?.allDays.color}
                value={this.state?.allDays?.value}
                onChange={(value) => this.handleOnChangeSelectDate(value)}
              />
            </div>

            <div className="col-12 table-manage-patient">
              <table className="table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Định danh</th>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Giới tính</th>
                    <th>Ngày đặt</th>
                    <th>Thời gian</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listPatient &&
                    listPatient.length > 0 &&
                    listPatient.map((el) => {
                      const formatDate = new Date(+el.bookingDate);
                      const vietNamDate = moment(formatDate)
                        .locale("vi")
                        .format("dddd - DD/MM/YYYY")
                        .replace(/^\w/, (c) => c.toUpperCase());
                      return (
                        <tr key={el.patientId}>
                          <td
                            style={{
                              width: "350px",
                            }}
                          >
                            {el.patientId}
                          </td>
                          <td>{el.patientName}</td>
                          <td
                            style={{
                              width: "150px",
                            }}
                          >
                            {el.patientPhone}
                          </td>
                          <td
                            style={{
                              width: "250px",
                            }}
                          >
                            {el.patientEmail}
                          </td>
                          <td
                            style={{
                              width: "100px",
                            }}
                          >
                            {el.patientGender}
                          </td>
                          <td
                            style={{
                              width: "250px",
                            }}
                          >
                            {vietNamDate}
                          </td>
                          <td
                            style={{
                              width: "150px",
                            }}
                          >
                            {el.getTime}
                          </td>
                          <td>
                            <button
                              style={{
                                width: "100px",
                              }}
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                this.handleBtnConfirm({
                                  ...el,
                                  time: el.getTime,
                                  day: vietNamDate,
                                })
                              }
                            >
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <RemedyModal
          isOpenRemedyModal={isOpenRemedyModal}
          dataModal={dataModal}
          sendRemedy={this.sendRemedy}
          handleCloseRemedyModal={this.handleCloseRemedyModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userToken: state.user.userToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getListPatientBooking: (query) => {
      return dispatch(actions.getListPatientBooking(query));
    },
    sendRemedy: (data) => {
      return dispatch(actions.sendRemedy(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBookingPatient);
