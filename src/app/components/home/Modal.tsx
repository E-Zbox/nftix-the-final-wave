"use client";
import React, { useEffect, useState } from "react";
// store
import {
  ORDER_DIRECTION_ASC,
  ORDER_DIRECTION_DESC,
  useOrderByStore,
  useViewStore,
} from "@/store";
// styles
import {
  MainModal,
  SortItem,
  SortButton,
  Title,
  MainView,
  ViewButton,
  OrderIcon,
  MainSortModal,
} from "@/app/styles/home/Modal.styles";
import {
  FlexContainer,
  PositionContainer,
} from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

const Modal = () => {
  const [showSortModal, setShowModal] = useState(false);

  const {
    home: {
      images: {
        ascendingOrderIcon,
        descendingOrderIcon,
        gridViewIcon,
        listViewIcon,
      },
    },
  } = screens;

  const { orderByState, setOrderByState } = useOrderByStore(
    ({ orderByState, setOrderByState }) => ({ orderByState, setOrderByState })
  );

  const { isGridViewState, setIsGridViewState } = useViewStore(
    ({ isGridViewState, setIsGridViewState }) => ({
      isGridViewState,
      setIsGridViewState,
    })
  );

  const { direction: orderDirection, title: orderTitle } = orderByState.find(
    (order) => order.selected
  )!;

  const orderIconImg =
    orderDirection === ORDER_DIRECTION_ASC
      ? ascendingOrderIcon.src
      : descendingOrderIcon.src;

  const updateOrderByState = (_index: number) => {
    const updatedState = orderByState.map((order, index) => {
      if (index == _index && order.selected) {
        return {
          ...order,
          direction:
            order.direction === ORDER_DIRECTION_ASC
              ? ORDER_DIRECTION_DESC
              : ORDER_DIRECTION_ASC,
        };
      }
      return {
        ...order,
        selected: index == _index,
      };
    });

    setOrderByState(updatedState);

    const timeoutId = setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  return (
    <MainModal>
      <PositionContainer
        $position="relative"
        $height={"100%"}
        $justifyContent="space-between"
        $miscellaneous="margin: 0px 20px 0px 0px;"
      >
        <Title>Sort by</Title>
        <SortButton onClick={() => setShowModal(!showSortModal)}>
          {orderTitle}
          <OrderIcon src={orderIconImg} />
        </SortButton>
        {showSortModal ? (
          <MainSortModal>
            <Title>Sort by</Title>
            <FlexContainer>
              {orderByState.map(({ selected, title }, key) => (
                <SortItem
                  key={key}
                  $selected={selected}
                  onClick={() => updateOrderByState(key)}
                >
                  {title}
                  {selected ? (
                    <OrderIcon src={orderIconImg} $height={"24px"} />
                  ) : (
                    <></>
                  )}
                </SortItem>
              ))}
            </FlexContainer>
          </MainSortModal>
        ) : (
          <></>
        )}
      </PositionContainer>
      <FlexContainer $height={"100%"} $justifyContent="space-between">
        <Title>View as</Title>
        <MainView>
          <ViewButton
            $bgImg={gridViewIcon.src}
            $selected={isGridViewState}
            title={"Grid View"}
            onClick={() => setIsGridViewState(true)}
          />
          <ViewButton
            $bgImg={listViewIcon.src}
            $selected={!isGridViewState}
            title={"List View"}
            onClick={() => setIsGridViewState(false)}
          />
        </MainView>
      </FlexContainer>
    </MainModal>
  );
};

export default Modal;
