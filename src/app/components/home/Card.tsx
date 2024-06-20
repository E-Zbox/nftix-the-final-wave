"use client";
import React, { useState } from "react";
// store
import { useTokenSCStore, useViewStore } from "@/store";
// styles
import {
  CardBody,
  CardHeader,
  CardHeaderId,
  CardHeaderName,
  CardImage,
  Card as MainCard,
  SelectedCardHeaderName,
} from "@/app/styles/home/Card.styles";
// utils
import { screens } from "@/utils/data";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
import { classifyTokenId, stringifyDate } from "@/utils/transform";

interface ICardProps {
  blockTimestamp: string;
  id: string;
  owner: string;
  tier: string;
  tokenId: string;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Card = ({
  blockTimestamp,
  id,
  owner,
  selected,
  tier,
  tokenId,
  onClick,
}: ICardProps) => {
  const {
    default: {
      assets: { loaderGif },
    },
  } = screens;

  const [showHeaderId, setShowHeaderId] = useState(false);

  const { tokenSCState, setTokenSCState } = useTokenSCStore(
    ({ tokenSCState, setTokenSCState }) => ({ tokenSCState, setTokenSCState })
  );

  const { isGridViewState } = useViewStore(({ isGridViewState }) => ({
    isGridViewState,
  }));

  const token = tokenSCState[tokenId];

  const color = classifyTokenId(Number(tokenId.substring(1)));

  if (token) {
    const { image, name } = token;
    const dateTime = stringifyDate(Number(blockTimestamp) * 1000);

    return (
      <MainCard
        $isGridView={isGridViewState}
        $selected={selected}
        onClick={onClick}
      >
        <CardHeader $isGridView={isGridViewState} $selected={selected}>
          <CardHeaderId
            onClick={() => setShowHeaderId((prevState) => !prevState)}
            title={tokenId}
            $color={color}
            $isGridView={isGridViewState}
            $selected={selected}
          >
            {tokenId}
          </CardHeaderId>
          <FlexContainer $alignItems="flex-start">
            <CardHeaderName
              $isGridView={isGridViewState}
              $selected={selected}
            >{`${
              isGridViewState === false
                ? name
                : selected
                ? name
                : name.substring(0, 26)
            }${
              !isGridViewState ? "" : name.length > 26 ? "..." : ""
            }`}</CardHeaderName>
          </FlexContainer>
          {!isGridViewState ? (
            <SelectedCardHeaderName>{tier}</SelectedCardHeaderName>
          ) : (
            <></>
          )}
        </CardHeader>
        <CardBody>
          <CardImage
            $isGridView={isGridViewState}
            $selected={false}
            src={image}
          />
        </CardBody>
      </MainCard>
    );
  }

  return (
    <MainCard $isGridView={isGridViewState} $selected={false}>
      <CardHeader $isGridView={isGridViewState} $selected={false}>
        <CardHeaderId $color={color} $isGridView={true} $selected={false}>
          {tokenId}
        </CardHeaderId>
      </CardHeader>
      <CardBody>
        <FlexContainer
          $height={"100%"}
          $justifyContent="center"
          $alignItems="center"
        >
          <CardImage
            $isGridView={true}
            $selected={false}
            $size={"60px"}
            src={loaderGif.src}
          />
        </FlexContainer>
      </CardBody>
    </MainCard>
  );
};

export default Card;
