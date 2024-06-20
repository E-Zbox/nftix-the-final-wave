"use client";
import React, { useState } from "react";
// store
import { useTokenSCStore } from "@/store";
// styles
import {
  CardTierTag,
  SelectedCard as MainCard,
  SelectedCardBody,
  SelectedCardDetail,
  SelectedCardHeader,
  SelectedCardHeaderId,
  SelectedCardHeaderName,
  SelectedCardHeaderTimestamp,
  SelectedCardImage,
} from "@/app/styles/home/Card.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import {
  TOKENID_IS_EVEN,
  TOKENID_IS_ODD,
  TOKENID_IS_PERFECT_SQUARE,
  TOKENID_IS_PRIME,
  classifyTokenId,
  stringifyDate,
} from "@/utils/transform";

interface ISelectedCardProps {
  blockTimestamp: string;
  id: string;
  owner: string;
  tier: string;
  tokenId: string;
  tokenIdName: string;
}

const SelectedCard = ({
  blockTimestamp,
  id,
  owner,
  tier,
  tokenId,
  tokenIdName,
}: ISelectedCardProps) => {
  const [showHeaderId, setShowHeaderId] = useState(false);

  const { tokenSCState, setTokenSCState } = useTokenSCStore(
    ({ tokenSCState, setTokenSCState }) => ({ tokenSCState, setTokenSCState })
  );

  const { attributes, description, image, name } = tokenSCState[tokenIdName];

  const dateTime = stringifyDate(Number(blockTimestamp) * 1000);

  const bgColor = classifyTokenId(Number(tokenId));

  return (
    <MainCard>
      <SelectedCardHeader>
        <SelectedCardHeaderId
          $bgColor={bgColor}
          onClick={() => setShowHeaderId((prevState) => !prevState)}
          title={tokenIdName}
        >
          {showHeaderId ? tokenIdName : tokenIdName.substring(0, 1)}
        </SelectedCardHeaderId>
        <FlexContainer
          $alignItems="flex-start"
          $justifyContent="center"
          $height="100%"
        >
          <SelectedCardHeaderName>{name}</SelectedCardHeaderName>
          <SelectedCardHeaderTimestamp>{dateTime}</SelectedCardHeaderTimestamp>
        </FlexContainer>
      </SelectedCardHeader>
      <SelectedCardBody>
        <SelectedCardDetail>{description}</SelectedCardDetail>
        <FlexContainer
          $flexDirection="row"
          $alignItems="center"
          $height="100%"
          $width="100%"
          $padding="0px 20px"
          $miscellaneous="margin: 0px 0px calc(var(--ten-px) * 3);"
        >
          <SelectedCardHeaderName>Tier:</SelectedCardHeaderName>
          <CardTierTag>{tier}</CardTierTag>
        </FlexContainer>
        <SelectedCardImage src={image}></SelectedCardImage>
      </SelectedCardBody>
    </MainCard>
  );
};

export default SelectedCard;
