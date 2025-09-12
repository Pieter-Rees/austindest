import '@testing-library/jest-dom';

// Suppress specific React warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('React does not recognize the `activeClass` prop') ||
        args[0].includes('Received `true` for a non-boolean attribute `spy`') ||
        args[0].includes(
          'Received `true` for a non-boolean attribute `smooth`'
        ) ||
        args[0].includes('Unknown event handler property `onSetActive`') ||
        args[0].includes('In HTML, <html> cannot be a child of <div>'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
