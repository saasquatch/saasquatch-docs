import * as React from "react";
import styled from "styled-components";

type Direction = "up" | "down" | "left" | "right";
interface ChevronIconProps extends IconProps {
  direction?: Direction;
}

const RotateWrapper = styled.span<{ direction: Direction }>`
  display: inline-flex;
  height: auto;
  transform: ${({ direction }) => {
    switch (direction) {
      case "up":
        return "rotate(0deg);";
      case "down":
        return "rotate(180deg);";
      case "left":
        return "rotate(270deg);";
      case "right":
        return "rotate(90deg);";
      default:
        return "rotate(0deg);";
    }
  }};
`;

const Chevron: React.FC<ChevronIconProps> = ({
  direction = "up",
  fill = "#c2c2c2",
  width = "13",
  height = "6",
}) => {
  return (
    <RotateWrapper direction={direction}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5L6.5 0.999999L1 5"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </RotateWrapper>
  );
};

export default Chevron;
