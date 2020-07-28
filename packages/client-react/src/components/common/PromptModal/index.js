import React, { useEffect } from 'react';
import { icons } from '../../../assets';
import './style.css';

const Container = props => {
  const { children, modalName } = props;
  return (
    <div
      id={modalName}
      className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center modal-show"
    >
      <div className="bg-gray-700 absolute top-0 bottom-0 left-0 right-0 opacity-50" />
      {children}
    </div>
  );
};

const ModalContainer = props => {
  const { children } = props;
  return (
    <div className="bg-white p-6 z-10 rounded-md shadow-md">{children}</div>
  );
};

const Title = props => {
  const { children } = props;
  return <div className="font-bold">{children}</div>;
};

const Content = props => {
  const { children } = props;
  return <div className="py-6">{children}</div>;
};

const OKButton = props => {
  const { children } = props;
  return <div className="text-blue-500 cursor-pointer">OK</div>;
};

const CancelButton = props => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="ml-6 text-blue-500 cursor-pointer">
      Cancel
    </div>
  );
};

const CloseButton = () => {
  return (
    <div className="opacity-50">
      <img src={icons.modal_close} alt="" width={16} height="auto" />
    </div>
  );
};

const PromptFunction = props => {
  const { title, content, onAccept, onDismiss, enabled, modalName } = props;

  useEffect(() => {
    const modal = document.getElementById(modalName);
    if (enabled) {
      if (modal.classList.contains('modal-hide')) {
        modal.classList.remove('modal-hide');
      }
      modal.classList.add('modal-show');
    }
    if (!enabled) {
      modal.classList.add('modal-hide');
    }
  }, [enabled]);

  return (
    <Container modalName={modalName}>
      <ModalContainer>
        <div className="flex flex-row items-center justify-between">
          <Title>{title}</Title>
          <CloseButton onClick={() => onDismiss && onDismiss()} />
        </div>
        <Content>{content}</Content>
        <div className="flex flex-row justify-end">
          <OKButton onClick={() => onAccept && onAccept()} />
          <CancelButton onClick={() => onDismiss && onDismiss()} />
        </div>
      </ModalContainer>
    </Container>
  );
};

export default PromptFunction;
