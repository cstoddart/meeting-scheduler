import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as accessTokenActions from '../../actions/accesTokenActions';
// import { googleSignIn } from '../../auth';
const googleSignIn = () => undefined;

class SignIn extends Component {
  handleSignIn = async () => {
    const { credential: { accessToken } } = await googleSignIn();
    this.props.accessTokenActions.setAccessToken(accessToken);
    // this.props.history.push("/calendar");
  }

  render() {
    return (
      <div>
        <a onClick={this.handleSignIn}>Sign In</a>
      </div>
    )
  };
}

SignIn.propTypes = {
  stuffActions: PropTypes.object,
  stuff: PropTypes.array
};

function mapStateToProps(state) {
  return {
    accessToken: state.accessToken
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accessTokenActions: bindActionCreators(accessTokenActions, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn));
