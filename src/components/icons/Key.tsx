import * as React from "react";

interface KeyProps {}

const Key: React.FC<IconProps> = ({
  fill = "#e8e8e8",
  width = 10,
  height = 10,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M10 3.43752C10 5.336 8.46098 6.875 6.5625 6.875C6.34336 6.875 6.1291 6.85426 5.92135 6.81506L5.45236 7.34268C5.40839 7.39215 5.35443 7.43175 5.29404 7.45887C5.23365 7.48598 5.16821 7.5 5.10201 7.5H4.375V8.28125C4.375 8.54014 4.16514 8.75 3.90625 8.75H3.125V9.53125C3.125 9.79014 2.91514 10 2.65625 10H0.46875C0.209863 10 0 9.79014 0 9.53125V8.00666C0 7.88234 0.0493945 7.76311 0.137285 7.6752L3.29748 4.515C3.1857 4.17605 3.125 3.81389 3.125 3.4375C3.125 1.53902 4.664 1.95314e-05 6.56248 1.86574e-10C8.46656 -1.95311e-05 10 1.53342 10 3.43752ZM6.5625 2.5C6.5625 3.01777 6.98223 3.4375 7.5 3.4375C8.01777 3.4375 8.4375 3.01777 8.4375 2.5C8.4375 1.98223 8.01777 1.5625 7.5 1.5625C6.98223 1.5625 6.5625 1.98223 6.5625 2.5Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Key;
