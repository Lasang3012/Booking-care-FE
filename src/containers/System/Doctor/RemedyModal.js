import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "../../../store/actions";
import Select, { createFilter } from "react-select";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
    };
  }

  async componentDidMount() {
    try {
      this.setState({ email: this.props.dataModal.patientEmail });
    } catch (e) {
      console.log("Lỗi ở component User redux");
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({ email: this.props.dataModal.patientEmail });
    }
  };

  saveBookingPatient = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  handelSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const base64 = await this.convertBase64(file);
      this.setState({ imageBase64: base64 });
    }
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  handleOnChangeInput = () => {};

  render() {
    const { userInfo, moreInfo, listGender, selectedGender } = this.state;
    const { isOpenRemedyModal, handleCloseRemedyModal, sendRemedy } =
      this.props;

    const {
      day,
      doctorId,
      patientEmail,
      patientId,
      patientName,
      patientPhone,
      time,
    } = this.props.dataModal;

    return (
      <>
        <Modal isOpen={isOpenRemedyModal} size="md" centered>
          <ModalHeader toggle={handleCloseRemedyModal}>
            Xác nhận lịch khám bệnh
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <span>
                  {" "}
                  <strong> {day} </strong> Vào lúc <strong>{time}</strong>
                </span>
              </div>

              <div className="col-12 form-group">
                <label>Email bệnh nhân: </label>
                <input
                  className="form-group email-input"
                  type="email"
                  value={patientEmail}
                  onChange={() => this.handleOnChangeInput()}
                />
              </div>

              <div className="col-12 form-group">
                <label>Chọn file đơn thuốc</label>
                <input
                  className="form-control-file"
                  type="file"
                  encType="multipart/form-data"
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.handelSendRemedy()}>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
