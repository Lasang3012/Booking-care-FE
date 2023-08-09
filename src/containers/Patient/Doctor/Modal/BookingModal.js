import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../../store/actions";
import * as reactSelect from "../../../../utils/CustomReactSelect";
import Select, { createFilter } from "react-select";
import { LANGUAGES, ROLE_ID, STATUS_BOOKING } from "../../../../utils";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: {},
      userInfo: {},
      listGender: [],
      name: "",
      phone: "",
      email: "",
      genderId: "",
      roleId: "",
      statusId: "",
      doctorId: "",
      date: "",
    };
  }

  async componentDidMount() {
    try {
      this.props.getGenderStart();
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const listGender = this.props.genderRedux;
    const language = this.props.language;

    if (prevProps.userDoctorInfo !== this.props.userDoctorInfo) {
      const doctorId = this.props.dataSchedule.doctorId;
      await this.props.getDoctorUserMoreInfoById(doctorId);
      this.setState({ moreInfo: this.props.userDoctorInfo.data });
    }

    // list gender
    if (prevProps.genderRedux !== listGender) {
      const newListGender = [];
      for (let i = 0; i < listGender.length; i++) {
        const genderObj = {
          id: "",
          key: "",
          value: "",
          label: "",
          color: "",
        };
        genderObj.id = listGender[i].id;
        genderObj.key = listGender[i].key;
        genderObj.value = listGender[i].id;
        genderObj.label =
          language === LANGUAGES.VI
            ? listGender[i].valueVi
            : listGender[i].valueEn;
        genderObj.color = reactSelect.colorOptionsData[i].color;
        newListGender.push(genderObj);
      }
      this.setState({
        listGender: newListGender,
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

  handleOnChangeSelectData = async (selectedData, id) => {
    const copyState = { ...this.state };
    copyState[id] = selectedData;
    this.setState({
      ...copyState,
    });
  };

  saveBookingPatient = async () => {
    try {
      const { name, email, phone, selectedGender, roleId } = this.state;
      const { dataSchedule, dateChoose, dateChooseEpoch, userDoctorInfo } =
        this.props;
    

      const result = await this.props.saveBookingPatient({
        name: name,
        email: email,
        phone: phone,
        genderId: selectedGender.id,
        roleId: ROLE_ID.PATIENT,
        statusId: STATUS_BOOKING.NEW,
        doctorId: dataSchedule.doctorId
          ? dataSchedule.doctorId
          : userDoctorInfo.data.doctorId,
        timeType: "abc1",
        date: dateChooseEpoch + "",
      });
      if (result) {
        this.setState({ selectedGender: {} });
        this.props.handleCloseBookingModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { userInfo, moreInfo, listGender, selectedGender } = this.state;
    const {
      isOpenModalBooking,
      handleCloseBookingModal,
      dataSchedule,
      dateChoose,
      dateChooseEpoch,
    } = this.props;

    return (
      <>
        <Modal isOpen={isOpenModalBooking} size="xl" centered>
          <ModalHeader
            toggle={handleCloseBookingModal}
            cssModule={styles.formtext}
          >
            Thông tin đặt lịch khám bệnh
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 custom-profile">
                <ProfileDoctor
                  dataSchedule={dataSchedule}
                  dateChoose={dateChoose}
                  dateChooseEpoch={dateChooseEpoch}
                />
              </div>
              <div className="col-12">
                Giá khám{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(moreInfo?.priceNameVi)}{" "}
                vnđ
              </div>
              <div className="col-6 form-group">
                <label> Họ tên </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnChangeInput(event, "name")}
                />
              </div>
              <div className="col-6 form-group">
                <label> Số điện thoại </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnChangeInput(event, "phone")}
                />
              </div>
              <div className="col-6 form-group">
                <label> Địa chỉ email </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label> Giới tính </label>
                <Select
                  options={
                    listGender && listGender.length > 0 ? listGender : []
                  }
                  styles={reactSelect.colorStyles}
                  key={listGender?.id}
                  value={
                    listGender.length > 0
                      ? listGender.find((el) => el.id === selectedGender?.id)
                      : ""
                  }
                  placeholder={"Chọn giới tính"}
                  onChange={(value) =>
                    this.handleOnChangeSelectData(value, "selectedGender")
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.saveBookingPatient()}>
              Xác nhận
            </Button>
            <Button color="warning">Hủy</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userDoctorInfo: state.user.userDoctorInfo,
    genderRedux: state.admin.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorUserMoreInfoById: (userId) => {
      return dispatch(actions.getDoctorUserMoreInfoByIdSuccess(userId));
    },
    getGenderStart: () => {
      return dispatch(actions.getGenderStart());
    },
    saveBookingPatient: (data) => {
      return dispatch(actions.saveBookingPatient(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
