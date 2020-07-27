import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerifyPIDComponent from './VerifyPIDComponent';
import VerifyPIDDoneComponent from './VerifyPIDDoneComponent';
import { withRouter } from 'react-router-dom';

const VerifyPIDContainer = props => {
  const [isDoneUploadingInfo, setIsDoneUploadingInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  const [frontSidePIDImgUrl, setFrontSidePIDImgUrl] = useState('');
  const [rearSidePIDImgUrl, setRearSidePIDImgUrl] = useState('');

  const uploadImage = async selectedFile => {
    try {
      let fileData = new FormData();
      fileData.set(
        'image',
        selectedFile,
        `${selectedFile.lastModified}-${selectedFile.name}`
      );
      let res = await axios({
        method: 'post',
        url: process.env.REACT_APP_UPLOAD_API_URL,
        data: fileData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res && res.data) {
        return res.data.fileLocation + '?alt=media';
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onGoHome = () => {
    props.history.replace('/');
  };

  const onSubmit = async () => {
    console.log(frontSidePIDImgUrl, rearSidePIDImgUrl);
    setLoading(true);
    const frontSidePIDCDNUrl = await uploadImage(frontSidePIDImgUrl);
    const rearSidePIDCDNUrl = await uploadImage(rearSidePIDImgUrl);
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

export default withRouter(VerifyPIDContainer);
