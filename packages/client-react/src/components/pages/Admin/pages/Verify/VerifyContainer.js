import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import VerifyComponent from './VerifyComponent';
import { getPIDImages } from '../../api/adminCustomer';

const VerifyContainer = ({ customerId }) => {
  const token = useSelector(state => state.adminAuth.token);
  console.log(token);
  const [imgSrc, setImgSrc] = useState({
    rearImgSrc: '',
    frontImgSrc: '',
  });

  const getImages = async () => {
    const result = {
      rearImgSrc: '',
      frontImgSrc: '',
    };
    try {
      const frontImgScrFromApi = await getPIDImages(
        customerId,
        'front_image',
        token
      );
      console.log(frontImgScrFromApi);
      if (
        frontImgScrFromApi &&
        frontImgScrFromApi.data &&
        !frontImgScrFromApi.data.error
      ) {
        result.frontImgSrc = `data:image/jpg;base64,${window.btoa(
          frontImgScrFromApi.data
        )}`;
      }
    } catch (e) {
      console.log('front_image fetch error', e);
    }
    try {
      const rearImgScrFromApi = await getPIDImages(
        customerId,
        'back_image',
        token
      );
      result.rearImgSrc = rearImgScrFromApi;
      if (
        rearImgScrFromApi &&
        rearImgScrFromApi.data &&
        !rearImgScrFromApi.data.error
      ) {
        result.rearImgSrc = rearImgScrFromApi.data;
      }
    } catch (e) {
      console.log('rear_image fetch error', e);
    }
    setImgSrc(result);
  };

  useEffect(() => {
    getImages();
  }, []);

  const { rearImgSrc, frontImgSrc } = imgSrc;
  return <VerifyComponent frontImg={frontImgSrc} rearImg={rearImgSrc} />;
};

export default VerifyContainer;
