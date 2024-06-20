import styled from "styled-components";

interface IMainSearch {
  $hasResult: boolean;
}

interface IMainLogo {
  $bgImg: string;
}

interface ISearchIcon {
  $isEnabled: boolean;
}

interface IMainSearchResult {
  $hasSelectedResult: boolean;
}

interface ISearchResultItem {
  $selected: boolean;
}

interface ISearchResultIcon {
  $bgColor: string;
}

interface ISearchResultText {
  $highlight: boolean;
}

export const MainNav = styled.main`
  position: sticky;
  top: 0px;
  left: 0px;
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  box-shadow: 0px 0px 5px
    ${({ theme: { textColor } }) => `${textColor.substring(0, 7)}1a`};
  background-color: ${({ theme: { blue03 } }) => `${blue03}`};
`;

export const MainLogo = styled.div<IMainLogo>`
  height: 70px;
  width: 120px;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-size: 100% auto;
`;

export const MainSearch = styled.main<IMainSearch>`
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  height: 45px;
  margin: 0px auto;
  opacity: ${({ $hasResult }) => ($hasResult ? "1" : "0.55")};
  padding: var(--three-px);
  border-radius: 30px;
  background-color: #ffffff31;
  transform: translate(-50%, -50%);

  &:hover {
    opacity: 1;
  }
`;

export const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 30px 0px 0px 30px;
  padding: 0px calc(var(--three-px) * 2) 0px calc(var(--three-px) * 4);
  background: ${({ theme: { blue03 } }) => `${blue03}`};
`;

export const SearchIcon = styled.img<ISearchIcon>`
  --size: 24px;
  height: var(--size);
  width: var(--size);

  &:hover {
    scale: ${({ $isEnabled }) => ($isEnabled ? 1.05 : 1)};
  }

  &:active {
    scale: ${({ $isEnabled }) => ($isEnabled ? 0.95 : 1)};
  }
`;

export const MainSearchResult = styled.main<IMainSearchResult>`
  position: absolute;
  top: calc(100% + 10px);
  left: 0px;
  width: 100%;
  height: fit-content;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 4px;
  overflow: ${({ $hasSelectedResult }) =>
    $hasSelectedResult ? "hidden" : "scroll"};
  box-shadow: 0px 0px 10px #0004;
  background-color: ${({ theme: { blue03 } }) => blue03};

  & > div {
    background-color: ${({ theme: { textColor } }) =>
      `${textColor.substring(0, 7)}15`};

    &:nth-of-type(1) {
      padding-top: calc(var(--seven-px) * 1.2);
    }
  }
`;

export const SearchResultCategoryTitle = styled.h4`
  font-family: "Source Sans Pro";
  font-size: 0.95rem;
  font-weight: bold;
  padding-left: calc(var(--seven-px) * 2);
  margin-bottom: var(--three-px);
`;

export const SearchResultItem = styled.div<ISearchResultItem>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: calc(var(--three-px) * 2) calc(var(--three-px) * 3.5);
  ${({ $selected }) =>
    $selected
      ? `
      opacity: 1;
    `
      : `
      opacity: 0.57;
    `};

  &:last-child {
    border-bottom: 2px solid ${({ theme: { blue03 } }) => blue03};
  }

  &:last-of-type {
    &:last-child {
      border-bottom: none;
    }
  }

  &:hover {
    background-color: ${({ theme: { textColor } }) =>
      `${textColor.substring(0, 7)}1E`};
  }
`;

export const SearchResultIcon = styled.div<ISearchResultIcon>`
  --size: 20px;
  height: var(--size);
  width: var(--size);
  border-radius: 30px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

export const SearchResultTokenId = styled.h4`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: "Nunito Sans";
  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme: { textColor } }) => `${textColor.substring(0, 7)}FE`};
  padding: 0px calc(var(--three-px) * 2);
  margin-right: auto;
`;

export const SearchResultTier = styled.h4`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: "Nunito Sans";
  font-size: 0.82rem;
  font-weight: bolder;
  text-align: right;
  color: ${({ theme: { textColor } }) => `${textColor.substring(0, 7)}FE`};
`;

export const SearchResultId = styled.h4`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: "Nunito Sans";
  font-size: 0.95rem;
  font-weight: 200;
  text-align: right;
  color: ${({ theme: { textColor } }) => `${textColor.substring(0, 7)}FE`};
`;

export const SearchResultText = styled.span<ISearchResultText>`
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: 0px ${({ $highlight }) => ($highlight ? "2px" : "0px")};
  background-color: ${({ $highlight, theme: { blue01 } }) =>
    $highlight ? `${blue01}56` : "transparent"};
`;
