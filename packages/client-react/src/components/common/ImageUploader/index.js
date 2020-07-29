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
    <div className="border-solid border-white border-4">{props.children}</div>
  );
};

const ImageUploader = props => {
  const { imageUrl, setImageUrl } = props;
  const [imagePreview, setImagePreview] = useState('');

  const inputRef = useRef();

  const _onImageClicked = e => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const _handleImageChange = e => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setImageUrl(file);
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } catch (e) {}
  };

  const _renderImagePlaceholder = () => {
    return (
      <div
        className="items-center justify-center flex opacity-25"
        style={{ width: '300px', height: '200px', overflow: 'hidden' }}
      >
        <img
          width={64}
          height="auto"
          alt=""
          src={icons.imageuploader_placeholder}
        />
      </div>
    );
  };

  const _renderImage = () => {
    return imagePreview ? (
      <div
        className="items-center justify-center flex"
        style={{ width: '300px', height: '200px', overflow: 'hidden' }}
      >
        <img alt="" src={imagePreview} />
      </div>
    ) : (
      _renderImagePlaceholder()
    );
  };

  return (
    <Container onClick={e => _onImageClicked(e)}>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={e => _handleImageChange(e)}
      />
      <ContentContainer>{_renderImage()}</ContentContainer>
    </Container>
  );
};

export default ImageUploader;
