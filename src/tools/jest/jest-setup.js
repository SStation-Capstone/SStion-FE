/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';

import mswServer from './mock-response/msw-server';

const user = userEvent.setup({ pointerEventsCheck: PointerEventsCheckLevel.Never });

window.render = render;
window.userEvent = user;

beforeAll(() => {
  mswServer.listen();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
    })),
  });
});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
