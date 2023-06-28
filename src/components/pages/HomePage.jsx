import {useState, useContext } from 'react';
import {ApplicationContext} from '../../utils/AppContext'

const HomePage = () => {
  const {title} = useContext(ApplicationContext);


  return (
    <>
        <h1>{title}</h1>
    </>
  )
}

export default HomePage;