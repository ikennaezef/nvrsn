import React, { ReactNode } from "react";

type ContainerProps = React.ComponentProps<"div"> & {
  children: ReactNode;
};

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={`max-w-6xl mx-auto px-4 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
