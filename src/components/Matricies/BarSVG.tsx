import React, {FC} from 'react';

interface Props{

}
const BarSVG:FC<Props> = () => {


  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 2 14" 
        width="2" 
        height="14" 
        fill="currentColor"
        className="text-gray-3 dark:text-dark-gray-3 transition -translate-y-6 group-hover:text-white dark:group-hover:text-white">
        <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"/>
        <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"/>
        <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"/>
    </svg>
  );
};

export default BarSVG;