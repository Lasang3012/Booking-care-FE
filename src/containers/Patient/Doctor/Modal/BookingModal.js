import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../../store/actions";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: {},
      userInfo: {},
    };
  }

  async componentDidMount() {
    try {
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.userDoctorInfo !== this.props.userDoctorInfo) {
      const doctorId = this.props.dataSchedule.doctorId;
      await this.props.getDoctorUserMoreInfoById(doctorId);
      this.setState({ moreInfo: this.props.userDoctorInfo.data });
    }
  };

  render() {
    const { userInfo, moreInfo } = this.state;
    const { isOpenModalBooking, handleCloseBookingModal, dataSchedule } =
      this.props;

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
                <ProfileDoctor dataSchedule={dataSchedule} />
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
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label> Số điện thoại </label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label> Địa chỉ email </label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label> Địa chỉ liên hệ </label>
                <input className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label> Lý do khám </label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label> Đặt cho ai </label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label> Giới tính </label>
                <input className="form-control" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success">Xác nhận</Button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorUserMoreInfoById: (userId) => {
      return dispatch(actions.getDoctorUserMoreInfoByIdSuccess(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
