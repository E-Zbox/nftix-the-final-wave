import React from "react";
// components
import Searchbar from "./Searchbar";
// store
import { useTokenSCStore, useTokenStore } from "@/store";
// styles
import { MainLogo, MainNav } from "../../styles/Navbar.styles";
// utils
import { screens } from "@/utils/data";

const Navbar = () => {
  const {
    navbar: {
      images: { appLogo },
    },
  } = screens;

  const { tokenSCState } = useTokenSCStore(({ tokenSCState }) => ({
    tokenSCState,
  }));

  const { tokenState } = useTokenStore(({ tokenState }) => ({ tokenState }));

  let lastCardTokenHasLoaded;

  if (tokenState.length > 0) {
    lastCardTokenHasLoaded =
      tokenSCState[`#${tokenState[tokenState.length - 1].tokenId}`];
  }

  return (
    <MainNav>
      <MainLogo $bgImg={appLogo.src} />
      {lastCardTokenHasLoaded ? <Searchbar /> : <></>}
    </MainNav>
  );
};

export default Navbar;
