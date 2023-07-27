import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền thông nói về ngành IT</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/lNF3_A6GWYg"
              title="6-HOUR STUDY WITH ME with MAXIMUM 100% BATTERY OF SAMSUNG S23 ULTRA (speed of 2.5)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Hello everyone, today is my first day being laid off. Now I am
              unemployed and in the process of retraining myself to apply for a
              new job. Allow me to introduce myself. I am an IT engineer with
              nearly 1 year of experience. My main expertise lies in the field
              of information technology, and I have primarily worked with
              TypeScript as the programming language and NestJS as the
              framework.This is a coffee shop near my residential area where we
              can spend nearly 8 hours together studying and working. Today, how
              do you feel? Regardless of the circumstances, both you and I are
              continuously striving for wonderful things ahead.
            </p>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
