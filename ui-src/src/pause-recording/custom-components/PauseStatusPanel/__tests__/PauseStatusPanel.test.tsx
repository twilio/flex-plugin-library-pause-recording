import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PauseStatusPanel from '../PauseStatusPanel';
import '@testing-library/jest-dom';
import { ITask, Actions } from '@twilio/flex-ui';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: () => ({
    isCompletingCallbackAction: {},
    isRequeueingCallbackAction: {},
  }),
  useDispatch: () => jest.fn(),
}));

jest.mock('@twilio/flex-ui', () => {
  return {
    __esModule: true,
    Actions: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      invokeAction: jest.fn(),
    },
  };
});

describe('Pause Status Button', () => {
  it('should render correct snapshot', () => {
    const wrapper = render(<PauseStatusPanel />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correct snapshot', () => {
    const wrapper = render(<PauseStatusPanel />);
    expect(wrapper).toMatchSnapshot();
  });
});
