/* eslint-disable react/prop-types */
import React from 'react';
import './styles.scss';
import SocialMediaButtons from '../SocialMediaButtons/SocialMediaButtonView';
import TopContainer from '../TopUIComponent/TopView';
import PasswordContainer from '../Password/PasswordContainer';
// import { Link } from 'react-router-dom';

const Email = props => {
  const [onSubmitHandler, error, OnBlurHandler, submitAction, toggleModalOpen, backActionHandler] =
    [
      props.submit,
      props.error,
      props.OnBlurHandler,
      props.submitAction,
      props.setModalOpen,
      props.backHandler,
    ];
  const needToDisplayPasswordComp = submitAction && !error;
  const displayValue = true;
  return (
    <>
      {/* // form container */}
      {!needToDisplayPasswordComp ? (
        <>
          <TopContainer
            BackText={'/'}
            display={displayValue}
            backActionHandler={backActionHandler}
          />
          <form className='emailFormContainer' onSubmit={onSubmitHandler}>
            <div>
              <p>Sign up as {JSON.parse(localStorage.getItem('typeOfUser'))} </p>

              {error ? (
                <p className={'emailErrorText'}>*Invalid Email (Ex:- XXXXXX@gmail.com)</p>
              ) : (
                <label htmlFor='email'>Your Email</label>
              )}
            </div>
            <input
              type='text'
              id='email'
              maxLength='300'
              className={error && 'emailError'}
              placeholder='Enter Email ID'
              data-testid='emailInputField'
              onBlur={OnBlurHandler}
            />
            <button type='submit'>Next</button>
          </form>
          <SocialMediaButtons toggleModal={toggleModalOpen} />
        </>
      ) : (
        <PasswordContainer />
      )}
    </>
  );
};

export default Email;
