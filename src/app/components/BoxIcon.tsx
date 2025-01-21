import React from 'react';

interface BoxIconProps {
  name: string;
}

const BoxIcon: React.FC<BoxIconProps> = ({ name }) => {
  return <i className={`bx bx-${name} text-black text-[1.7rem]`} aria-hidden="true"></i>; // Use boxicons class
};

export default BoxIcon; 