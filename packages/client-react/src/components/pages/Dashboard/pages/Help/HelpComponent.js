import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Container = props => {
  return <div className="w-screen h-screen">{props.children}</div>;
};

const ContentContainer = props => {
  return <div className="flex flex-row flex-1">{props.children}</div>;
};

const Content = () => {
  return <div className="flex-1 bg-gray-600 p-6">Help</div>;
};

const Help = () => {
  return (
    <Container>
      <Header title="Help" />
      <ContentContainer>
        <Sidebar currentItem="Help" />
        <Content />
      </ContentContainer>
    </Container>
  );
};

export default Help;
