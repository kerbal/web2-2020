import React, { useState, useRef } from 'react';
import { icons } from '../../../assets';

const Container = props => {
  return (
    <div onClick={props.onClick} className="mt-12 rounded-lg shadow-xl">
      {props.children}
    </div>
  );
};

const ContentContainer = props => {
  return (
    <div className="border-solid border-gray-300 border-2 rounded ">
      {props.children}
    </div>
  );
};

const ImageUploader = props => {
  const { setImageUrl } = props;
  const [imagePreview, setImagePreview] = useState('');

  const inputRef = useRef();

  const onImageClicked = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = e => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      const file = e.target.files[0];

      if (file.size > 5000000) {
        // 5 mb
        throw new Error('File size must under 5mb!');
      }

      reader.onloadend = () => {
        setImageUrl(file);
        setImagePreview(reader.result);
      };

      console.log(file);
      reader.readAsDataURL(file);
    } catch (error) {
      alert(error);
    }
  };
  const renderImage = (
    <div
      className="items-center  justify-center flex"
      style={{ width: '300px', height: '200px', overflow: 'hidden' }}
    >
      {imagePreview ? (
        <img alt="" src={imagePreview} className="object-cover" />
      ) : (
        <div className=" opacity-25">
          <img
            width={64}
            height="auto"
            alt=""
            src={icons.imageuploader_placeholder}
          />
        </div>
      )}
    </div>
  );

  return (
    <Container onClick={e => onImageClicked(e)}>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={e => handleImageChange(e)}
        accept="image/*"
      />
      <ContentContainer>{renderImage}</ContentContainer>
    </Container>
  );
};

export default ImageUploader;
