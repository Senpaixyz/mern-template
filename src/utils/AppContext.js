import {createContext } from 'react';

const ApplicationContext = createContext(null)

const ApplicationDefaultContext = {
  title: 'My Application',
  description: 'Lorem ipsum dolor',
}

export {
  ApplicationContext,
  ApplicationDefaultContext
}