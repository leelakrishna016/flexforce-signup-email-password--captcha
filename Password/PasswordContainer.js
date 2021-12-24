/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-set-state */
import React, { useState } from 'react';
import Password from './PasswordView';
import EmailContainer from '../Email/EmailContainer';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from '../../../../states/reducers/authReducers';
import { signUpStartAsync } from '../../../../states/actions/authActions';

// import axios from 'axios';
// import EmailContainer from '../Email/EmailContainer';
const statePasswordValues = {
  iconShow: false,
  min: false,
  max: false,
  special: false,
  num: false,
  upper: false,
  lower: false,
  backAction: false,
  submitAction: false,
  error: false,
  isModelOpen: false,
  modalTitle: '',
  body: '',
};
let inputValue;
const PasswordContainer = props => {
  const [state, setState] = useState(statePasswordValues);
  const dispatch = useDispatch();
  const { email } = useSelector(state => state.auth);

  // constructor() {
  //   super();

  //   state = statePasswordValues;

  //   onSubmitHandler = onSubmitHandler.bind(this);
  //   onChangeHandler = onChangeHandler.bind(this);
  //   iconChangeHandler = iconChangeHandler.bind(this);
  //   backActionHandler = backActionHandler.bind(this);
  //   toggleModalOpen = toggleModalOpen.bind(this);
  //   onChange = onChange.bind(this);
  //   axiosApiCalls = axiosApiCalls.bind(this);
  // }

  //  function async axiosApiCalls() {
  //     const data = {
  //       email: JSON.parse(localStorage.getItem('email')),
  //       password: inputValue,
  //       accountType: 'CLIENT',
  //       mode: 'USERNAME_AND_PASSWORD',
  //       verificationCode: 'string',
  //     };

  //     const url =
  //       'https://9kt2o5rxx2.execute-api.us-east-1.amazonaws.com/dev/profile/api/users/sign-up';
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     };

  //     try {
  //       const response = await axios.post(url, JSON.stringify(data), { headers });
  //       console.log(response.status);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  const backActionHandler = () => {
    setState({ backAction: true });
  };

  const onChange = value => {
    console.log('Captcha value:', value);
  };

  const onChangeHandler = event => {
    inputValue = event.target.value;
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const upperChar = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]+/;
    const lowerCase = /[abcdsefghijklmnopqrstuvwxyz]+/;
    const number = /[1234567890]+/;

    isNaN(inputValue.charAt(inputValue.length - 1))
      ? setState({ num: false })
      : setState({ num: true });

    // var isNum=inputValue.find(element => isNaN(element));
    // isNum ? setState({num:false}):setState({num:true});

    upperChar.test(inputValue) ? setState({ upper: true }) : setState({ upper: false });
    lowerCase.test(inputValue) ? setState({ lower: true }) : setState({ lower: false });
    number.test(inputValue) ? setState({ num: true }) : setState({ num: false });
    format.test(inputValue) ? setState({ special: true }) : setState({ special: false });
    inputValue.length >= 9 ? setState({ min: true }) : setState({ min: false });
    inputValue.length === 18 ? setState({ max: true }) : setState({ max: false });

    console.log(statePasswordValues);
  };

  const iconChangeHandler = () => {
    setState({ iconShow: !state.iconShow });
  };

  const isPasswordStrong = () => {
    if (
      state.min === false ||
      state.lower === false ||
      state.num === false ||
      state.special === false ||
      state.upper === false
    ) {
      setState({ error: true });
      return false;
    } else {
      setState({ error: false });
      return true;
    }
  };

  const toggleModalOpen = text => {
    setState({
      isModelOpen: !state.isModelOpen,
      modalTitle: text,
    });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    // console.log(state.iconShow);
    if (isPasswordStrong()) {
      // localStorage.setItem('password', JSON.stringify(inputValue));
      // axiosApiCalls();
      localStorage.setItem('password', JSON.stringify(inputValue));
      // dispatch(authActions.userPassword(inputValue));
      dispatch(
        signUpStartAsync({
          email,
          password: inputValue,
          accountType: JSON.parse(localStorage.getItem('typeOfUser')).toUpperCase(),
          mode: 'USERNAME_AND_PASSWORD',
        }),
      );
      setState({ submitAction: true });
    }
  };

  const name = props.name;
  const passwordComponent = (
    <>
      <Password
        name={name}
        submit={onSubmitHandler}
        change={onChangeHandler}
        state={state}
        iconChange={iconChangeHandler}
        backHandler={backActionHandler}
        error={state.error}
        submitAction={state.submitAction}
        setModalOpen={toggleModalOpen}
        onChangr={onChange}
      />
      {state.isModelOpen && <Modal setModalOpen={toggleModalOpen} modalTitle={state.modalTitle} />}
    </>
  );
  return <>{state.backAction ? <EmailContainer /> : passwordComponent}</>;
};

export default PasswordContainer;
