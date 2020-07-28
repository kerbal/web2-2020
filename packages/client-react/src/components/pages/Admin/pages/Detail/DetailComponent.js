import React, {useState} from 'react';
import PromptModal from '../../../../common/PromptModal';
import FunctionButtom from '../../../../common/FunctionButton';

const DetailComponent = () => {
  const [isLockModalShown, setIsLockModalShown] = useState(true);
  return (
    <div>
      <FunctionButtom
        label="Update"
        onClick={() => {
          setIsLockModalShown(true);
        }}
      />
      <PromptModal
        enabled={isLockModalShown}
        onDismiss={() => {
          setIsLockModalShown(false);
        }}
        modalName="lock-confirm-modal"
        title="Alert"
        content={"Are you sure locking this user?"}
      />
    </div>
  )
}

export default DetailComponent
