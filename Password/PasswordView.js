/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/prop-types */
import React from 'react';
import './styles.scss';
import TopContainer from '../TopUIComponent/TopView';
import AccountCreatedSuccessFullyMessageContainer from '../AccountCreatedSuccessFullyMessage/AccountCreatedSuccessFullyMessageContainer';
import PrivacyPolicyAndUserAgreement from '../PrivacyPolicyAndUserAgreement/PrivacyPolicyAndUserAgreementView';
import ReCAPTCHA from 'react-google-recaptcha';

const Password = props => {
  //   const { submit } = props;
  const [
    change,
    submit,
    iconChangeHandler,
    backActionHandler,
    submitAction,
    error,
    toggleModalOpen,
  ] = [
    props.change,
    props.submit,
    props.iconChange,
    props.backHandler,
    props.submitAction,
    props.error,
    props.setModalOpen,
  ];
  const [onSubmitHandler, onChangeHandler, onBackActionHandler] = [
    submit,
    change,
    backActionHandler,
  ];
  const displayValue = true;
  const passwordOrEmail = (
    <>
      <TopContainer BackText={'/'} display={displayValue} backActionHandler={onBackActionHandler} />
      {/* // form container */}
      <form className='passwordFormContainer d-flex flex-column' onSubmit={onSubmitHandler}>
        <div>
          <p> Sign up as {JSON.parse(localStorage.getItem('typeOfUser'))} </p>
          <p className={'emailID'} data-testid='emailDisplay'>
            {JSON.parse(localStorage.getItem('email'))}
          </p>
          {error ? (
            <p className='errorText'>Please Enter Valid Password (FOLLOW HINTS)</p>
          ) : (
            <label htmlFor='password'>Enter Password</label>
          )}
        </div>

        <input
          type={props.state.iconShow ? 'text' : 'password'}
          maxLength='18'
          id='password'
          className={error && 'error'}
          placeholder='Enter password'
          onChange={onChangeHandler}
          data-testid='passwordInputField'
        />

        <i
          className={props.state.iconShow ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}
          onClick={iconChangeHandler}
          data-testid='icon'
        />
        <div className='passwordHint'>
          <p className='hintOption'>Password should contain</p>
          <ul className='list'>
            <li className={props.state.upper && 'green'}>
              <span className={props.state.upper && 'green'}>Uppercase char(s)</span>
            </li>
            <li className={props.state.lower && 'green'}>
              <span className={props.state.lower && 'green'}>Lowercase char(s)</span>
            </li>
            <li className={props.state.num && 'green'}>
              <span className={props.state.num && 'green'}>Number(s)</span>
            </li>
            <li className={props.state.special && 'green'}>
              <span className={props.state.special && 'green'}>Special char(s)</span>
            </li>
            <li className={props.state.min && 'green'}>
              <span className={props.state.min && 'green'}>Minimum 9 chars</span>
            </li>
            <li className={props.state.max && 'green'}>
              <span className={props.state.max && 'green'}>Maximum 18 chars</span>
            </li>
          </ul>
        </div>
        <PrivacyPolicyAndUserAgreement
          Text={'By clicking on Sign up, you agree to the FlexForce \t\n  '}
          toggleModal={toggleModalOpen}
        />
        <div className='d-flex justify-content-center align-items-center'>
          <div className='captcha'>
            <ReCAPTCHA
              sitekey='6Lez0JsdAAAAAOki0pAKuDCBdHKV0KsZfuuzigPf'
              onChange={props.onChange}
            />
          </div>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  );
  return (
    <>
      {submitAction ? (
        <>
          <AccountCreatedSuccessFullyMessageContainer
            name={name}
            emailID={JSON.parse(localStorage.getItem('email'))}
          />
        </>
      ) : (
        passwordOrEmail
      )}
    </>
  );
};

export default Password;
