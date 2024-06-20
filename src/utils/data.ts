// .
import home from "./home";
import navbar from "./navbar";
// assets
import loaderGif from "../../public/loader.gif";

export const devices = {};

export const screens = {
  default: {
    assets: { loaderGif },
  },
  home,
  navbar,
};

export const theme = {
  blue01: "#768a91",
  blue02: "#6b7988",
  blue03: "#313845",
  green: "#3a464a",
  bgColor: "#1b2028", // #1b2528
  textColor: "#EDEEFFAD",
  navbarColor: "#d6c5ac",
};
