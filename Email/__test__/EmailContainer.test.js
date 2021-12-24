import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailContainer from '../EmailContainer';
// import Email from './EmailView';
// import Modal from '../Modal/Modal';

jest.mock('../../Modal/Modal', () => () => 'Modal');
// jest.mock('./EmailView', () => () => 'EmailView');

jest.mock('../../TopUIComponent/TopView', () => () => 'TopComponent');
jest.mock('../../SocialMediaButtons/SocialMediaButtonView', () => () => 'SocialMediaButton');

describe('Testing EmailContainer Component', () => {
  test('Checking "Sign up as" heading', () => {
    render(<EmailContainer />);

    const signupHeading = screen.getByText('Sign up as', { exact: false });
    expect(signupHeading).toBeInTheDocument();
  });

  test('Checking lable When initial render', () => {
    render(<EmailContainer />);

    const YourEmailLable = screen.getByText('Your Email', { exact: false });
    expect(YourEmailLable).toBeInTheDocument();
  });

  test('Checking lable as error text if inputfield if empty', () => {
    render(<EmailContainer />);
    const inputElement = screen.getByTestId('emailInputField');
    const nextButton = screen.getByText('Next');
    fireEvent.change(inputElement, {
      target: {
        value: '',
      },
    });
    fireEvent.click(nextButton);

    const InvalidEmailError = screen.getByText('Invalid Email ', { exact: false });
    expect(InvalidEmailError).toBeInTheDocument();
  });

  test('Checking lable as error text if wrong input', () => {
    render(<EmailContainer />);
    const inputElement = screen.getByTestId('emailInputField');
    const nextButton = screen.getByText('Next');
    fireEvent.change(inputElement, {
      target: {
        value: 'leelakrishna.@gmail',
      },
    });

    fireEvent.click(nextButton);
    // inputElement.blur();

    const InvalidEmailError = screen.getByText('Invalid Email ', { exact: false });
    expect(InvalidEmailError).toBeInTheDocument();
  });
});
