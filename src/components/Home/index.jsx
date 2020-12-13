import React, { useContext } from 'react';
import { If, Then, Else } from 'react-if';
import Landing from '../landingPage';
import MyCourses from '../myCourses';
import { RegisterContext } from '../../context/auth';

function Home() {
  const context = useContext(RegisterContext);
  console.log(context.loggedIn);
  return (
    <>
      <If condition={context.loggedIn}>
        <Then>
          <MyCourses />
        </Then>
        <Else>
          <Landing />
        </Else>
      </If>
    </>
  );
}

export default Home;
