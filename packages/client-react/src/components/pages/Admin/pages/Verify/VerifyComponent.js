import React from 'react';
import { icons } from '../../../../../assets';

const ImgContainer = ({ children }) => {
  return (
    <div className="border-solid border-gray-300 border-2 rounded h-full justify-center items-center overflow-hidden">
      {children}
    </div>
  );
};

const ImgPlaceholder = () => {
  return (
    <div
      className="flex items-center justify-center p-12"
      style={{ width: '400px', height: '300px' }}
    >
      <div className="opacity-25">
        <img
          width={64}
          height="auto"
          alt=""
          src={icons.imageuploader_placeholder}
        />
      </div>
    </div>
  );
};

const FrontImg = ({ img }) => {
  return (
    <ImgContainer>
      {img ? (
        <img
          className="object-contain"
          width={400}
          height={300}
          src={img}
          alt="front-pid-img"
        />
      ) : (
          <ImgPlaceholder />
        )}
    </ImgContainer>
  );
};

const RearImg = ({ img }) => {
  return (
    <div className="pl-6">
      <ImgContainer>
        {img ? (
          <img
            className="object-contain"
            width={400}
            height={300}
            src={img}
            alt="rear-pid-img"
          />
        ) : (
            <ImgPlaceholder />
          )}
      </ImgContainer>
    </div>
  );
};

const VerifyComponent = ({ frontImg, rearImg }) => {
  return (
    <div>
      Make sure that the PID photos updated are valid.
      <br />
      If they indeed are, click OK to verify this customer. Otherwise, click
      Cancel.
      <div className="flex flex-row py-6">
        <FrontImg img={frontImg} />
        <RearImg img={rearImg} />
      </div>
    </div>
  );
};

export default VerifyComponent;
