"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
// api
import { getTokenIdDetails } from "@/api/abi";
import { getTokens } from "@/api/subgraph";
// components
import Card from "../components/home/Card";
import Modal from "../components/home/Modal";
import SelectedCard from "../components/home/SelectedCard";
// store
import {
  ITokenSCRecord,
  useOrderByStore,
  useSearchStore,
  useTokenSCStore,
  useTokenStore,
  useViewStore,
} from "@/store";
// styles
import { Loader } from "../styles/Loader.styles";
import {
  HomeContainer,
  MainHome,
  Title,
  ViewContainer,
} from "../styles/home/index.styles";
import {
  FlexContainer,
  PositionContainer,
} from "../styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

const LOCAL_STORAGE_ORDER_BY_STATE = "orderByState";
const LOCAL_STORAGE_TOKEN_STATE = "tokenState";
const LOCAL_STORAGE_TOKENSC_STATE = "tokenSCState";
const TOKEN_FETCH_LIMIT = 40;

const HomeScreen = () => {
  const intervalIdRef = useRef() as MutableRefObject<NodeJS.Timeout>;

  const tokenSCStateRef = useRef() as MutableRefObject<ITokenSCRecord>;

  const [loading, setLoading] = useState(false);

  const { orderByState, setOrderByState } = useOrderByStore(
    ({ orderByState, setOrderByState }) => ({ orderByState, setOrderByState })
  );

  const {
    selectedTokenIdResult,
    searchTokenSCState,
    setSearchTokenSCState,
    searchHistory,
    setSearchHistory,
  } = useSearchStore(
    ({
      selectedTokenIdResult,
      searchTokenSCState,
      setSearchTokenSCState,
      searchHistory,
      setSearchHistory,
    }) => ({
      selectedTokenIdResult,
      searchTokenSCState,
      setSearchTokenSCState,
      searchHistory,
      setSearchHistory,
    })
  );

  const { tokenSCState, setTokenSCState } = useTokenSCStore(
    ({ tokenSCState, setTokenSCState }) => ({ tokenSCState, setTokenSCState })
  );

  const { tokenState, setTokenState, updateSelectedTokenState } = useTokenStore(
    ({ tokenState, setTokenState, updateSelectedTokenState }) => ({
      tokenState,
      setTokenState,
      updateSelectedTokenState,
    })
  );

  const { isGridViewState } = useViewStore(({ isGridViewState }) => ({
    isGridViewState,
  }));

  const {
    default: {
      assets: { loaderGif },
    },
  } = screens;

  let lastCardTokenHasLoaded;

  if (tokenState.length > 0) {
    lastCardTokenHasLoaded =
      tokenSCState[`#${tokenState[tokenState.length - 1].tokenId}`];
  }

  const getMissingTokenIdDetails = async () => {
    const tokens: number[] = [];

    // console.log(intervalIdRef);

    if (!intervalIdRef.current) return;

    tokenState.forEach(({ tokenId }) => {
      const tokenIdName = `#${tokenId}`;

      // console.log({ [tokenIdName]: tokenSCState[tokenIdName] });

      if (!tokenSCStateRef.current[tokenIdName]) {
        tokens.push(Number(tokenId));
      }
    });

    // console.log(tokens);

    if (tokens.length > 0) {
      const selectedTokens = tokens.splice(0, 5);

      // console.log({ selectedTokens });

      const { data, error, success } = await getTokenIdDetails(selectedTokens);

      if (!success) throw error;

      data.forEach((_data) => {
        const tokenIdName = `#${_data.tokenId}`;

        setTokenSCState({ [tokenIdName]: _data });
      });
    } else {
      clearInterval(intervalIdRef.current);
    }
  };

  const renderSelectedToken = () => {
    const selectedToken = tokenState.find((token) => token.selected);

    if (selectedToken) {
      const { blockTimestamp, id, owner, selected, tier, tokenId } =
        selectedToken;

      const tokenIdName = `#${tokenId}`;

      const token = tokenSCState[tokenIdName];

      if (token) {
        return (
          <SelectedCard
            blockTimestamp={blockTimestamp}
            id={id}
            owner={owner}
            tier={tier}
            tokenId={tokenId}
            tokenIdName={tokenIdName}
          />
        );
      }
    }

    return <></>;
  };

  // 🛠️ --- in progress --- ⚒️
  const renderSearchHistory = () => {};

  useEffect(() => {
    tokenSCStateRef.current = {};
    // let's set orderByState to cached state in localStorage (if any)
    const localStorageOrderByState = localStorage.getItem(
      LOCAL_STORAGE_ORDER_BY_STATE
    );

    if (localStorageOrderByState) {
      setOrderByState(JSON.parse(localStorageOrderByState));
    }

    // let's set tokenState to cached state in localStorage (if any)
    const localStorageTokenState = localStorage.getItem(
      LOCAL_STORAGE_TOKEN_STATE
    );

    if (localStorageTokenState) {
      setTokenState(JSON.parse(localStorageTokenState));
    } else {
      const { direction: orderDirection, value: orderBy } = orderByState.find(
        (item) => item.selected
      )!;

      setLoading(true);

      getTokens(orderBy, orderDirection, TOKEN_FETCH_LIMIT, 0)
        .then((res) => {
          const { data, error, success } = res;

          if (!success) throw error;

          setTokenState(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    // update localStorage when orderByState updates
    localStorage.setItem(
      LOCAL_STORAGE_ORDER_BY_STATE,
      JSON.stringify(orderByState)
    );

    // perform new query whenever orderbyState changes and tokenState has items
    if (tokenState.length > 0) {
      const { direction: orderDirection, value: orderBy } = orderByState.find(
        (item) => item.selected
      )!;

      setLoading(true);

      getTokens(orderBy, orderDirection, tokenState.length, 0)
        .then((res) => {
          const { data, error, success } = res;

          if (!success) throw error;

          setTokenState(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [orderByState]);

  useEffect(() => {
    setLoading(false);
    // update localStorage when tokenState updates
    if (tokenState.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_STATE,
        JSON.stringify(tokenState)
      );

      // let's get tokenIdDetails
      intervalIdRef.current = setInterval(() => {
        getMissingTokenIdDetails();
      }, 5000);

      //   setFetchIntervalId(intervalId);
    }
  }, [tokenState]);

  useEffect(() => {
    const tokenSCStateKeys = Object.getOwnPropertyNames(tokenSCState);

    if (tokenSCStateKeys.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_TOKENSC_STATE,
        JSON.stringify(tokenSCState)
      );

      tokenSCStateRef.current = tokenSCState;
    }
  }, [tokenSCState]);

  return (
    <MainHome>
      <HomeContainer>
        {renderSelectedToken()}
        {}
        <FlexContainer
          $flexDirection="row"
          $alignItems="flex-end"
          $justifyContent="space-between"
          $padding={"10px 30px"}
          $miscellaneous="margin-bottom: calc(var(--three-px) * 3);"
        >
          <Title>Discover More</Title>
          {lastCardTokenHasLoaded ? <Modal /> : <></>}
        </FlexContainer>
        <ViewContainer $isGridView={isGridViewState}>
          {tokenState.map(
            ({ blockTimestamp, id, owner, selected, tokenId, tier }, key) => (
              <Card
                key={key}
                blockTimestamp={blockTimestamp}
                id={id}
                owner={owner}
                selected={selected}
                tier={tier}
                tokenId={`#${tokenId}`}
                onClick={() => updateSelectedTokenState(tokenId)}
              />
            )
          )}
          {loading ? (
            <PositionContainer
              $position="fixed"
              $left="0px"
              $top="0px"
              $width="100%"
              $height={"100vh"}
              $justifyContent="center"
              $alignItems="center"
              $bgColor="#000a"
            >
              <Loader $size={"40px"} src={loaderGif.src} />
            </PositionContainer>
          ) : (
            <></>
          )}
        </ViewContainer>
      </HomeContainer>
    </MainHome>
  );
};

export default HomeScreen;
