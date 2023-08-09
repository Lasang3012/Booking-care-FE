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

class ManageBookingPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    try {
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {};

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

  handleSaveSchedule = async () => {};

  render() {
    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">Quản lý lịch hẹn của bệnh nhân</div>
          <div className="m-p-body row">
            <div className="col-4 form-group">
              <label>Chọn ngày khám </label>
              <input />
            </div>

            <div className="col-12 table-manage-patient">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>aaa</th>
                  <th>aaa</th>
                  <th>aaa</th>
                  <th>aaa</th>
                </tr>
                <tr>
                  <td>11111</td>
                  <td>11111</td>
                  <td>11111</td>
                  <td>11111</td>
                </tr>
              </table>
            </div>
          </div>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBookingPatient);
