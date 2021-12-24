/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-set-state */
import React, { useState } from 'react';
// import { render } from 'sass';
import Email from './EmailView';
import LandingContainer from '../LandingComponent/LandingContainer';
import Modal from '../Modal/Modal';
import { authActions } from '../../../../states/reducers/authReducers';
import { useDispatch } from 'react-redux';

const stateEmailValues = {
  emailError: false,
  value: '',
  verification: false,
  submitAction: false,
  isModelOpen: false,
  backAction: false,
  modalTitle: '',
  body: '',
};

const EmailContainer = props => {
  const [state, setState] = useState(stateEmailValues);
  const dispatch = useDispatch();
  // constructor(props) {
  //   super(props);
  //   state = stateEmailValues;

  //   isEmailValid = isEmailValid.bind(this);
  //   onBlurHandler = onBlurHandler.bind(this);
  //   isEmailValid = isEmailValid.bind(this);
  //   onSubmitHandler = onSubmitHandler.bind(this);
  //   toggleModalOpen = toggleModalOpen.bind(this);
  //   backActionHandler = backActionHandler.bind(this);
  // }

  const backActionHandler = () => {
    setState({ backAction: true });
  };

  const toggleModalOpen = text => {
    setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
      modalTitle: text,
    }));
  };

  const isEmailValid = value => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!value || regex.test(value) === false || !value.includes('.')) {
      setState({
        emailError: true,
        value: value,
      });
      return false;
    } else {
      setState({
        emailError: false,
        value: value,
      });
      return true;
    }
  };

  const onBlurHandler = event => {
    isEmailValid(event.target.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    isEmailValid(state.value);
    if (state.emailError !== true) {
      localStorage.setItem('email', JSON.stringify(state.value));
      dispatch(authActions.userEmail(state.value));
      setState({ submitAction: true });
    }
  };

  const name = props.name;
  const email = (
    <>
      <Email
        name={name}
        submit={onSubmitHandler}
        error={state.emailError}
        OnBlurHandler={onBlurHandler}
        submitAction={state.submitAction}
        setModalOpen={toggleModalOpen}
        backHandler={backActionHandler}
      />
      {state.isModelOpen && <Modal setModalOpen={toggleModalOpen} modalTitle={state.modalTitle} />}
    </>
  );
  return <>{state.backAction ? <LandingContainer /> : email}</>;
};

export default EmailContainer;
