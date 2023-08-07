import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {};

  render() {
    const { isShowDetailInfo, moreInfo } = this.state;
    const { isOpenModalBooking, handleCloseBookingModal, dataSchedule } =
      this.props;
    console.log(dataSchedule);

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
            <div className="price">Giá khám 300.000vnd</div>
            <div className="row">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
