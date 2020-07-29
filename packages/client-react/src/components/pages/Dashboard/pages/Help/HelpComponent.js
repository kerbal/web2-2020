import React from 'react';

const Container = ({ children }) => {
  return <div className="w-screen h-screen">{children}</div>;
};

const Content = () => {
  return <div className="flex-1 bg-gray-600 p-6">Help</div>;
};

const Help = () => {
  return (
    <Container>
      <Content />
    </Container>
  );
};

export default Help;
