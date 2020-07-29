import React, { useState } from 'react';
import axios from 'axios';
import VerifyPIDComponent from './VerifyPIDComponent';
import VerifyPIDDoneComponent from './VerifyPIDDoneComponent';

const VerifyPIDContainer = props => {
  const [isDoneUploadingInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  const [frontSidePIDImgUrl, setFrontSidePIDImgUrl] = useState('');
  const [rearSidePIDImgUrl, setRearSidePIDImgUrl] = useState('');

  const uploadImage = async selectedFile => {
    try {
      const fileData = new FormData();
      fileData.set(
        'image',
        selectedFile,
        `${selectedFile.lastModified}-${selectedFile.name}`
      );
      const res = await axios({
        method: 'post',
        url: process.env.REACT_APP_UPLOAD_API_URL,
        data: fileData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res && res.data) {
        return `${res.data.fileLocation}?alt=media`;
      }
      return null;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const onGoHome = () => {
    props.history.replace('/');
  };

  const onSubmit = async () => {
    console.log(frontSidePIDImgUrl, rearSidePIDImgUrl);
    setLoading(true);
    await uploadImage(frontSidePIDImgUrl);
    await uploadImage(rearSidePIDImgUrl);
  };

  return isDoneUploadingInfo ? (
    <VerifyPIDDoneComponent onGoHome={onGoHome} />
  ) : (
    <VerifyPIDComponent
      loading={loading}
      setLoading={setLoading}
      frontSidePIDImgUrl={frontSidePIDImgUrl}
      setFrontSidePIDImgUrl={setFrontSidePIDImgUrl}
      rearSidePIDImgUrl={rearSidePIDImgUrl}
      setRearSidePIDImgUrl={setRearSidePIDImgUrl}
      onSubmit={onSubmit}
    />
  );
};

export default VerifyPIDContainer;
