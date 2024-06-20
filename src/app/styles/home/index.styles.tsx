import styled from "styled-components";

interface IViewContainer {
  $isGridView: boolean;
}

export const MainHome = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: calc(var(--ten-px) * 4);
  overflow: scroll;
`;

export const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
  width: 100%;
`;

export const Title = styled.h4`
  font-family: "Nunito Sans";
  font-size: 2rem;
  font-weight: 400;
`;

export const ViewContainer = styled.div<IViewContainer>`
  width: auto;
  height: fit-content;
  padding-bottom: 0px;
  border: 1px solid #ffffff05;
  display: flex;
  ${({ $isGridView }) =>
    $isGridView
      ? `
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  padding: calc(var(--ten-px) * 2);
    `
      : `
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: calc(var(--three-px) * 2);
  `}
`;
