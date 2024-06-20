import styled, { keyframes } from "styled-components";

interface ISortItem {
  $selected: boolean;
}

interface IOrderIcon {
  $height?: string;
}

interface IViewButton {
  $bgImg: string;
  $selected: boolean;
}

const animateHeight = keyframes`
  0% {
    height: 0%;
    padding: 0px;
  }
  100% {
    height: fit-content;
  padding: calc(var(--seven-px) * 1.5) calc(var(--ten-px) * 1.3);
  }
`;

export const MainModal = styled.main`
  height: 80px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Title = styled.h4`
  font-size: 0.85rem;
  font-weight: bold;
  opacity: 0.85;
`;

export const SortButton = styled.div`
  --color: ${({ theme: { navbarColor } }) => navbarColor};
  --width: 150px;
  position: relative;
  border: none;
  outline: none;
  background: none;
  height: fit-content;
  width: var(--width);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  font-size: 1.1rem;
  margin-top: var(--ten-px);
  color: var(--color);
  padding: calc(var(--seven-px) * 1.5) calc(var(--ten-px) * 1.3);
  padding-left: calc(var(--seven-px) * 1.6);
  border: 1px solid var(--color);
  cursor: pointer;

  &:active {
    scale: 0.97;
  }

  &:hover {
    background-color: ${({ theme: { textColor } }) =>
      `${textColor.substring(0, 7)}2A`};
  }
`;

export const MainSortModal = styled.main`
  position: absolute;
  top: 0px;
  left: 0%;
  height: fit-content;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  padding: calc(var(--ten-px) * 1.5) calc(var(--three-px) * 1.2);
  transform: translate(-110%, 0%);
  background-color: ${({ theme: { blue03 } }) => blue03};
  box-shadow: 0px 0px 4px
    ${({ theme: { textColor } }) => `${textColor.substring(0, 7)}1A`};
  overflow: hidden;
  animation: ${animateHeight} forwards 450ms linear;
  z-index: 1;
  cursor: pointer;

  & > h4 {
    padding-left: calc(var(--three-px));
    font-family: "Source Sans Pro";
    font-weight: bolder;
    text-transform: uppercase;
    color: ${({ theme: { textColor } }) => `${textColor.substring(0, 7)}5A`};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-color: ${({ theme: { navbarColor } }) => `${navbarColor}0A`};

    &:hover {
      background-color: red;
    }
  }
`;

export const SortItem = styled.button<ISortItem>`
  outline: none;
  border: none;
  background: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  margin: 1px 0px;
  font-size: 1rem;
  font-weight: ${({ $selected }) => ($selected ? "bold" : "normal")};
  scale: ${({ $selected }) => ($selected ? "1.05" : "0.98")};
  padding: calc(var(--ten-px) * 1.45) calc(var(--seven-px) * 1.2)
    calc(var(--ten-px) * 1.5) calc(var(--ten-px) * 1.2);
  color: ${({ $selected, theme: { navbarColor, textColor } }) =>
    $selected ? navbarColor : textColor};
  z-index: 1;
  cursor: pointer;

  &:nth-of-type(1) {
    margin-top: var(--seven-px);
  }

  &:hover {
    background: ${({ theme: { textColor } }) =>
      `${textColor.substring(0, 7)}0F`};
  }
`;

export const OrderIcon = styled.img<IOrderIcon>`
  height: ${({ $height }) => $height || "35px"};
  width: auto;
`;

export const MainView = styled.main`
  --size: 100px;
  height: calc(var(--size) * 0.5);
  width: var(--size);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ViewButton = styled.button<IViewButton>`
  outline: none;
  border: none;
  height: 100%;
  width: calc(50% - 1px);
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  scale: ${({ $selected }) => ($selected ? 1 : 0.85)};
  opacity: ${({ $selected }) => ($selected ? 1 : 0.5)};

  &:nth-of-type(1) {
    margin-right: 1px;
  }

  &:hover {
    scale: ${({ $selected }) => (!$selected ? 0.95 : 1)};
    opacity: 1;
  }

  &:active {
    scale: ${({ $selected }) => (!$selected ? 0.93 : 1)};
  }
`;
