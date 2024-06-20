import React, { useEffect, useState } from "react";
// api
import { getTokenByTokenId, getTokenGeneric } from "@/api/subgraph";
// components
import SearchResultCard from "./SearchResultCard";
// store
import { useSearchStore } from "@/store";
// styles
import { Loader } from "@/app/styles/Loader.styles";
import {
  MainSearch,
  MainSearchResult,
  SearchIcon,
  SearchInput,
  SearchResultCategoryTitle,
} from "@/app/styles/Navbar.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import { getTokenIdDetails } from "@/api/abi";

const Searchbar = () => {
  const [loading, setLoading] = useState(true);
  const [searchButtonEnabled, setSearchButtonEnabled] = useState(false);

  const {
    default: {
      assets: { loaderGif },
    },
    navbar: {
      images: { searchbarIcon },
    },
  } = screens;

  const {
    formState,
    updateFormState,
    tokenIdResult,
    setTokenIdResult,
    genericResult,
    setGenericResult,
    selectedTokenIdResult,
    setSelectedTokenIdResult,
    searchTokenSCState,
    setSearchTokenSCState,
  } = useSearchStore(
    ({
      formState,
      updateFormState,
      tokenIdResult,
      setTokenIdResult,
      genericResult,
      setGenericResult,
      selectedTokenIdResult,
      setSelectedTokenIdResult,
      searchTokenSCState,
      setSearchTokenSCState,
    }) => ({
      formState,
      updateFormState,
      tokenIdResult,
      setTokenIdResult,
      genericResult,
      setGenericResult,
      selectedTokenIdResult,
      setSelectedTokenIdResult,
      searchTokenSCState,
      setSearchTokenSCState,
    })
  );

  let hasResult = false;

  if (genericResult.length > 0) {
    hasResult = true;
  } else if (tokenIdResult !== null) {
    hasResult = true;
  } else {
    hasResult = false;
  }

  const onSearchResultCardClick = (
    arrayIndex: number,
    isInTokenIdResult: boolean
  ) => {
    if (selectedTokenIdResult) return;

    setSelectedTokenIdResult({ arrayIndex, isInTokenIdResult, loading: true });
  };

  const handleSubmit = () => {
    const { input_search } = formState;

    if (input_search.length == 0 || loading) {
      return;
    }

    const inputSearchAsNumber = parseInt(input_search);

    if (Number.isNaN(inputSearchAsNumber)) {
      setLoading(true);
      // this means input_search is just text. we'd search tokens' `ID` and `tier` fields
      getTokenGeneric(input_search)
        .then((res) => {
          const { data, error, success } = res;

          if (!success) throw error;

          setGenericResult(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }

    if (!Number.isNaN(inputSearchAsNumber)) {
      setLoading(true);
      // this means input_search is a number and we're going to search only for the `tokenId` field
      getTokenByTokenId(inputSearchAsNumber.toString())
        .then((res) => {
          const { data, error, success } = res;

          if (!success) throw error;

          setTokenIdResult(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const renderSearchResults = () => {
    let tokenIDResultCard: React.ReactNode | null;
    let genericResultCard: React.ReactNode | null;
    if (tokenIdResult) {
      const { id, tier, tokenId } = tokenIdResult;

      tokenIDResultCard = (
        <FlexContainer $padding={"3px 0px"}>
          <SearchResultCategoryTitle>
            Matched token (1)
          </SearchResultCategoryTitle>
          <SearchResultCard
            arrayIndex={0}
            id={id}
            isInTokenIdResult={true}
            tier={tier}
            tokenId={tokenId}
            onClick={() => onSearchResultCardClick(0, true)}
          />
        </FlexContainer>
      );
    }

    if (genericResult.length > 0) {
      genericResultCard = (
        <FlexContainer $padding={"3px 0px 0px"}>
          <SearchResultCategoryTitle>
            Contains search query "{formState.input_search}"
          </SearchResultCategoryTitle>
          {genericResult.map(({ id, tier, tokenId }, key) => (
            <SearchResultCard
              key={key}
              arrayIndex={key}
              id={id}
              isInTokenIdResult={false}
              tier={tier}
              tokenId={tokenId}
              onClick={() => onSearchResultCardClick(key, false)}
            />
          ))}
        </FlexContainer>
      );
    }

    if (tokenIDResultCard || genericResultCard) {
      return (
        <MainSearchResult $hasSelectedResult={selectedTokenIdResult !== null}>
          {tokenIDResultCard || <></>}
          {genericResultCard || <></>}
        </MainSearchResult>
      );
    }

    if (loading) {
      console.log({ loading });
      return (
        <MainSearchResult $hasSelectedResult={selectedTokenIdResult !== null}>
          <FlexContainer
            $height="60px"
            $alignItems="center"
            $justifyContent="center"
          >
            <Loader $size={"60px"} src={loaderGif.src} />
          </FlexContainer>
        </MainSearchResult>
      );
    }
  };

  useEffect(() => {
    if (loading) {
      setSearchButtonEnabled(false);
    } else if (formState.input_search.length > 0) {
      setSearchButtonEnabled(true);
    } else {
      setSearchButtonEnabled(false);
    }
  }, [formState]);

  useEffect(() => {
    setLoading(false);
  }, [tokenIdResult, genericResult]);

  useEffect(() => {
    if (selectedTokenIdResult) {
      const { arrayIndex, isInTokenIdResult } = selectedTokenIdResult;

      let tokenId;

      if (isInTokenIdResult) {
        tokenId = Number(tokenIdResult?.tokenId);
      } else {
        genericResult.forEach((token, index) => {
          if (index == arrayIndex) {
            tokenId = Number(token.tokenId);
          }
        });
      }

      if (tokenId) {
        getTokenIdDetails([tokenId])
          .then((res) => {
            const { data, error, success } = res;

            if (!success) throw error;

            data.forEach((_data) => {
              const tokenIdName = `#${_data.tokenId}`;

              setSearchTokenSCState({ [tokenIdName]: _data });
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setSelectedTokenIdResult(null);
          });
      }
    }
  }, [selectedTokenIdResult]);

  useEffect(() => {
    const searchTokenSCStateKeys =
      Object.getOwnPropertyNames(searchTokenSCState);

    // empty search results
    if (searchTokenSCStateKeys.length > 0) {
      setGenericResult([]);
      setTokenIdResult(null);
    }
  }, [searchTokenSCState]);

  return (
    <MainSearch $hasResult={hasResult}>
      <SearchInput
        name="input_search"
        value={formState.input_search}
        onChange={(e) => {
          if (loading) {
            return;
          }
          updateFormState(e);
        }}
      />
      <FlexContainer
        $width="50px"
        $height="100%"
        $alignItems="center"
        $justifyContent="center"
      >
        <SearchIcon
          src={searchbarIcon.src}
          aria-disabled={searchButtonEnabled}
          $isEnabled={searchButtonEnabled}
          onClick={handleSubmit}
        />
      </FlexContainer>
      {renderSearchResults()}
    </MainSearch>
  );
};

export default Searchbar;
