import PasteThemeProvider from './PasteThemeProvider';
import * as React from 'react';
import * as Flex from '@twilio/flex-ui';

jest.mock('@twilio/flex-ui', () => {
    return {
      Flex: {
       setProviders:jest.fn()
      },
      Manager: { getInstance: jest.fn() }
  }
    });

describe('paste theme provider',()=>{
    let flex;
    let manager: Flex.Manager = Flex.Manager.getInstance();
    flex = {setProviders:jest.fn()};
    it('paste theme provider test',()=>{
        const setProviderSpy = flex.setProviders;
        PasteThemeProvider(flex, manager)
        expect(setProviderSpy).toHaveBeenCalled();
    })
})