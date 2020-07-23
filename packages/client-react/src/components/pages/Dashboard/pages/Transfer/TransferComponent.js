import React from 'react';
import ComboBox from '../../../../common/ComboBox';

const Container = props => {
  return <div className="flex-1 p-6">{props.children}</div>;
};

const Transfer = () => {
  let options = ['A', 'B']
  return (
    <Container>
      <div>abc</div>
      <div className="w-1/3">
      <ComboBox label="Source Account" options={options} />
      </div>
    </Container>
  );
};

export default Transfer;
