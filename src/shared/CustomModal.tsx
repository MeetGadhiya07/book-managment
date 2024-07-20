import React from "react";
import { Modal } from "antd";

export interface ModalProps {
  show?: boolean;
  onCancel?: () => void | undefined;
  centered?: boolean;
  className?: string;
  modalTitle?: string;
  dataTestId?: string;
  children?: JSX.Element;
}
const CustomModal: React.FC<ModalProps> = (props) => {
  const { modalTitle, children, show, className, centered, onCancel } = props;
  return (
    <Modal
      title={modalTitle}
      open={show}
      footer={false}
      centered={centered}
      className={`${className || ""} p-0`}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};
export default CustomModal;
