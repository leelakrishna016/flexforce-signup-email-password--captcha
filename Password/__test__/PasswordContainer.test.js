import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordContainer from '../PasswordContainer';

jest.mock('../../TopUIComponent/TopView', () => () => 'TopComponent');
jest.mock(
  '../../PrivacyPolicyAndUserAgreement/PrivacyPolicyAndUserAgreementView',
  () => () => 'PrivacyPolicyAndUserAgreementView',
);

describe('Testing PasswordContainer Component', () => {
  test('initial Sign Up heading render test', () => {
    render(<PasswordContainer />);

    const signupHeading = screen.getByText('Sign up as', { exact: false });
    expect(signupHeading).toBeInTheDocument();
  });

  test('Checking lable When initial render', () => {
    render(<PasswordContainer />);

    const EnterPasswordLable = screen.getByText('Enter Password', { exact: false });
    expect(EnterPasswordLable).toBeInTheDocument();
  });

  test('test emailId display check not empty', () => {
    render(<PasswordContainer />);
    const emailIdDiaplayElement = screen.getByTestId('emailDisplay');
    expect(emailIdDiaplayElement).not.toBe('');
  });

  test('Checking lable as error text if inputfield if empty', () => {
    render(<PasswordContainer />);
    const inputElement = screen.getByTestId('passwordInputField');
    const signupButton = screen.getByText('Sign Up');

    fireEvent.change(inputElement, {
      target: {
        value: '',
      },
    });
    fireEvent.click(signupButton);

    const InvalidEmailError = screen.getByText('Please Enter Valid Password', { exact: false });
    expect(InvalidEmailError).toBeInTheDocument();
  });

  test('test password show icon', () => {
    render(<PasswordContainer />);

    const iconElement = screen.getByTestId('icon');
    expect(iconElement.className).toBe('bi bi-eye-slash-fill');
  });

  test('test password show icon when click', () => {
    render(<PasswordContainer />);

    const iconElement = screen.getByTestId('icon');

    fireEvent.click(iconElement);

    expect(iconElement.className).toBe('bi bi-eye-fill');
  });

  test('testing password hints heading', () => {
    render(<PasswordContainer />);

    const passwordHintHeading = screen.getByText('Password should contain');
    expect(passwordHintHeading).toBeInTheDocument();
  });
});
