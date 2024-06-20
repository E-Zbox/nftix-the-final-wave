"use client";
import { useEffect, useState } from "react";
// store
import { useSearchStore } from "@/store";
// styles
import { Loader } from "@/app/styles/Loader.styles";
import {
  SearchResultIcon,
  SearchResultId,
  SearchResultItem,
  SearchResultText,
  SearchResultTier,
  SearchResultTokenId,
} from "@/app/styles/Navbar.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import {
  classifyTokenId,
  splitAndHighlightSearchText,
} from "@/utils/transform";

interface ISearchResultCardProps {
  arrayIndex: number;
  id: string;
  isInTokenIdResult: boolean;
  tier: string;
  tokenId: string;
  onClick: () => void;
}

interface IResultText {
  text: string;
  highlight: boolean;
}

const SearchResultCard = ({
  arrayIndex,
  id,
  isInTokenIdResult,
  tier,
  tokenId,
  onClick,
}: ISearchResultCardProps) => {
  const {
    default: {
      assets: { loaderGif },
    },
  } = screens;

  const [isSelected, setIsSelected] = useState(false);

  const { formState, selectedTokenIdResult } = useSearchStore(
    ({ formState, selectedTokenIdResult }) => ({
      formState,
      selectedTokenIdResult,
    })
  );

  const { input_search } = formState;

  const inputSearchAsNumber = parseInt(input_search);

  let idTexts: IResultText[] = splitAndHighlightSearchText(input_search, id);

  let tierTexts: IResultText[] = splitAndHighlightSearchText(
    input_search,
    tier
  );

  let tokenIdTexts: IResultText[] = [];

  if (!Number.isNaN(inputSearchAsNumber)) {
    let searchText = inputSearchAsNumber.toString();
    tokenIdTexts = splitAndHighlightSearchText(searchText, tokenId);

    tierTexts = splitAndHighlightSearchText(input_search, tier);

    idTexts = splitAndHighlightSearchText(input_search, id);
  }

  const bgColor = classifyTokenId(Number(tokenId));

  const renderIcon = () => {
    if (isSelected) {
      return <Loader src={loaderGif.src} $size={"40px"} />;
    }

    return <SearchResultIcon $bgColor={bgColor} />;
  };

  useEffect(() => {
    if (
      selectedTokenIdResult &&
      selectedTokenIdResult.arrayIndex == arrayIndex &&
      selectedTokenIdResult.loading
    ) {
      if (selectedTokenIdResult.isInTokenIdResult == isInTokenIdResult) {
        setIsSelected(true);
      }
    } else {
      setIsSelected(false);
    }
  }, [selectedTokenIdResult]);

  return (
    <SearchResultItem $selected={isSelected} onClick={onClick}>
      {renderIcon()}
      <SearchResultTokenId>
        {tokenIdTexts.length > 0 ? (
          tokenIdTexts.map(({ text, highlight }, key) => (
            <SearchResultText key={key} $highlight={highlight}>
              {text}
            </SearchResultText>
          ))
        ) : (
          <SearchResultText $highlight={false}>{tokenId}</SearchResultText>
        )}
      </SearchResultTokenId>
      <FlexContainer $alignItems={"flex-end"} $width="fit-content">
        <SearchResultTier>
          {tierTexts.length > 0 ? (
            tierTexts.map(({ text, highlight }, key) => (
              <SearchResultText key={key} $highlight={highlight}>
                {text}
              </SearchResultText>
            ))
          ) : (
            <SearchResultText $highlight={false}>{tier}</SearchResultText>
          )}
        </SearchResultTier>
        <SearchResultId>
          {idTexts.length > 0 ? (
            idTexts.map(({ text, highlight }, key) => (
              <SearchResultText key={key} $highlight={highlight}>
                {text}
              </SearchResultText>
            ))
          ) : (
            <SearchResultText $highlight={false}>{id}</SearchResultText>
          )}
        </SearchResultId>
      </FlexContainer>
    </SearchResultItem>
  );
};

export default SearchResultCard;
