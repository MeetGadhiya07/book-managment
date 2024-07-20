import { Button, Spin } from "antd";
import React from "react";

interface ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "large" | "middle" | "small";
  shape?: "default" | "circle" | "round";
  type?: "button" | "submit";
}

const CustomButton = (props: ButtonProps) => {
  const {
    children,
    isLoading,
    disabled,
    onClick,
    className,
    size,
    shape,
    type = "button",
  } = props;
  return (
    <>
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`${className}`}
        size={size}
        shape={shape}
        htmlType={type}
      >
        <span>{children}</span>
        {isLoading && <Spin />}
      </Button>
    </>
  );
};

export const ButtonSpinner = () => <Spin />;

export default CustomButton;
