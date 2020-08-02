import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadPID } from '../../slice/customerAuthSlice';
import VerifyPIDComponent from './VerifyPIDComponent';
import VerifyPIDDoneComponent from './VerifyPIDDoneComponent';
import useCustomerCheck from '../../utils/useCustomerCheck';

const VerifyPIDContainer = () => {
  const dispatch = useDispatch();
  const { token, user, loading } = useSelector(state => state.customerAuth);
  const [frontSidePIDImgUrl, setFrontSidePIDImgUrl] = useState('');
  const [rearSidePIDImgUrl, setRearSidePIDImgUrl] = useState('');

  const [{ status }] = useCustomerCheck(
    c => c.status === 'VERIFIED',
    '/dashboard/overview'
  );

  const onSubmit = () => {
    if (!frontSidePIDImgUrl || !rearSidePIDImgUrl) {
      alert('Need 2 image');
      return;
    }

    const fileData = new FormData();
    fileData.append('customer_id', user.id);
    fileData.append('front_image', frontSidePIDImgUrl, `${user.id}-frontimage`);
    fileData.append('back_image', rearSidePIDImgUrl, `${user.id}-backimage`);
    console.log('Sending', fileData);
    dispatch(
      uploadPID(
        { fileData, token },
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
          alert(error);
        }
      )
    );
  };

  let verifyPIDComponent = <div />;
  if (status === 'WAITING') {
    verifyPIDComponent = <VerifyPIDDoneComponent />;
  }
  if (status === 'UNVERIFIED') {
    verifyPIDComponent = (
      <VerifyPIDComponent
        loading={loading}
        setFrontSidePIDImgUrl={setFrontSidePIDImgUrl}
        setRearSidePIDImgUrl={setRearSidePIDImgUrl}
        onSubmit={onSubmit}
      />
    );
  }

  return verifyPIDComponent;
};

export default VerifyPIDContainer;
