import styled from "styled-components";

interface ICard {
  $selected: boolean;
  $isGridView: boolean;
}

interface ICardHeaderId extends ICard {
  $color: string;
}

interface ISelectedCardHeaderId {
  $bgColor: string;
}

interface ICardImage extends ICard {
  $size?: string;
}

export const Card = styled.div<ICard>`
  cursor: pointer;
  overflow: hidden;
  position: relative;
  color: ${({ theme: { textColor } }) => textColor};
  margin: 0px auto;
  margin-bottom: ${({ $selected }) =>
    $selected ? "calc(var(--ten-px) * 3)" : "calc(var(--ten-px) * 2.5)"};
  background-color: #0006;
  scale: ${({ $selected }) => ($selected ? 1.15 : 1)};
  padding: ${({ $selected }) =>
    $selected ? "0px calc(var(--ten-px)*0.5)" : "0px"};
  border: ${({ $selected, theme: { navbarColor } }) =>
    $selected ? `2px solid ${navbarColor}` : "0px solid transparent"};

  ${({ $isGridView, $selected }) =>
    $isGridView
      ? `
  width: 250px;
  height: 250px;
  border-radius: 10px;

  * {
    ${
      $selected
        ? `
      height: 0px;
      overflow: hidden;
      padding: 0px;
    `
        : ``
    }
  }

  &:hover {
    & > div {
      &:nth-of-type(1) {
        height: 0px;
        background-color: #0002;

        * {
          height: 0px;
          display: none;
        }
      }
    }
  }
  `
      : `
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;
  scale: ${$selected ? 1.0 : 0.98};
  border-radius: 7px;
  padding: calc(var(--three-px)*2) calc(var(--ten-px) * 2);
  padding-left: calc(var(--three-px) * 3);
    background: ${$selected ? "#000a" : "#0006"};
  margin: ${
    $selected ? "calc(var(--three-px) * 2.5)" : "calc(var(--three-px) * 0.5)"
  } 0px;

  &:hover {
    scale: 1;
    background: #0003;
    background: ${$selected ? "#000a" : "#0008"};
  }
  `}
`;

export const SelectedCard = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 20px;
  background-color: ${({ theme: { textColor } }) =>
    `${textColor.substring(0, 7)}01`};
  border: 15px solid ${({ theme: { blue03 } }) => blue03};
  margin-bottom: calc(var(--ten-px) * 2);
  padding: calc(var(--ten-px) * 0.9) calc(var(--ten-px) * 1.5);
  overflow: hidden;
  transition: 350ms linear;
`;

export const CardHeader = styled.div<ICard>`
  ${({ $isGridView }) =>
    $isGridView
      ? `
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000d;
  padding: calc(var(--ten-px) * 1) 0px;
  transition: 350ms ease-in;
  `
      : `
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0px calc(var(--ten-px)*3);
  `}
`;

export const SelectedCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: calc(var(--ten-px) * 1.5);
`;

export const CardHeaderId = styled.h4<ICardHeaderId>`
  color: ${({ $color }) => $color};
  ${({ $isGridView }) =>
    $isGridView
      ? `
  font-size: 0.95rem;
  `
      : `
    font-size: 1.1rem;
  `}
`;

export const SelectedCardHeaderId = styled.h4<ISelectedCardHeaderId>`
  --size: 55px;
  width: fit-content;
  height: var(--size);
  font-size: 1.45rem;
  display: grid;
  place-items: center;
  background-color: ${({ $bgColor }) => `${$bgColor}AA`};
  padding: 0px calc(var(--ten-px) * 2);
  color: ${({ theme: { textColor } }) => `${textColor.substring(0, 7)}`};
  color: ${({ theme: { blue03 } }) => blue03};
  margin-right: calc(var(--ten-px) * 2.5);
  border-radius: 30px;
  transition: 350ms linear;
`;

export const CardHeaderName = styled.h4<ICard>`
  width: 100%;
  text-align: center;
  color: ${({ theme: { textColor } }) => textColor};
  ${({ $isGridView }) =>
    $isGridView
      ? `
  font-family: Roboto;
  font-size: 0.95rem;
  padding: calc(var(--three-px) * 1.6) calc(var(--seven-px) * 1) 0px;
    `
      : `
  font-family: "Nunito Sans";
  font-size: 1.2rem;
  font-weight: normal;
  `}
`;

export const SelectedCardHeaderName = styled.h4`
  color: ${({ theme: { navbarColor } }) => navbarColor};
  font-size: 1.15rem;
`;

export const SelectedCardHeaderTimestamp = styled.h4`
  color: ${({ theme: { textColor } }) => textColor};
  display: inline;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const CardBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SelectedCardBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: scroll;
  box-shadow: 1px 1px 8px ${({ theme: { blue02 } }) => `${blue02}14`} inset,
    1px 0px 8px ${({ theme: { blue03 } }) => `${blue03}4A`} inset;
`;

export const SelectedCardDetail = styled.h4`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
  width: fit-content;
  font-family: "Nunito Sans";
  font-size: 1.25rem;
  font-weight: normal;
  line-height: 1.9rem;
  opacity: 0.85;
  padding: calc(var(--ten-px) * 0.5) calc(var(--ten-px) * 2)
    calc(var(--ten-px) * 2);
`;

export const CardImage = styled.img<ICardImage>`
  ${({ $isGridView, $selected, $size }) => {
    if (!$isGridView) {
      return `
        height: 100%;
        width: auto;
      `;
    }
    if ($selected) {
      return `
        width: 110%;
        height: auto;
    `;
    } else {
      return `
        width: ${$size || "100%"};
        height: auto;

        &:hover {
            width: ${$size || "100%"};
        }
    `;
    }
  }}
`;

export const SelectedCardImage = styled.img`
  max-width: 80%;
  width: auto;
  height: auto;
`;

export const CardTierTag = styled.h4`
  --bgColor: ${({ theme: { blue03 } }) => blue03};
  position: relative;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  color: ${({ theme: { blue02 } }) => blue02};
  background-color: var(--bgColor);
  padding: calc(var(--ten-px) * 1.5);
  margin-left: var(--ten-px);
`;
