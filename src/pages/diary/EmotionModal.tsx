import React, { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
`;

interface EmotionModalProps {
  onClose: () => void;
  onSelect: (emotion: string, maintain: boolean) => void;
}

const EmotionModal: React.FC<EmotionModalProps> = ({ onClose, onSelect }) => {
  const [showMaintainOptions, setShowMaintainOptions] = useState(false);

  const handleNegativeClick = () => {
    setShowMaintainOptions(true);
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h3>감정을 선택하세요</h3>
        {!showMaintainOptions ? (
          <>
            <Button onClick={() => onSelect("positive", false)}>긍정</Button>
            <Button onClick={() => onSelect("neutral", false)}>중립</Button>
            <Button onClick={handleNegativeClick}>부정</Button>
            <Button onClick={onClose}>취소</Button>
          </>
        ) : (
          <>
            <h4>부정 감정 유지 여부</h4>
            <Button onClick={() => onSelect("negative", false)}>유지 안 함</Button>
            <Button onClick={() => onSelect("negative", true)}>유지</Button>
            <Button onClick={() => setShowMaintainOptions(false)}>뒤로</Button>
          </>
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default EmotionModal;
