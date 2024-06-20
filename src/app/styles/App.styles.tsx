import styled from "styled-components";

export const MainApp = styled.main`
  height: calc(100vh - calc(var(--bodyPadding) * 2));
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  z-index: 0;
  border-radius: 15px;
  background-color: ${({ theme: { blue03 } }) => `${blue03}9c`};

  &::after {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(
      circle at top,
      ${({ theme: { blue03, textColor } }) =>
        `${textColor}40, ${blue03}a0, ${textColor}40`}
    );
    background: transparent;
  }
`;
