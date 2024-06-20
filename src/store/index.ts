import { ChangeEvent } from "react";
import { create } from "zustand";
// interface
import { IRecord, IToken, ITokenSC } from "@/api/interface";

interface ISelectedTokenIdResult {
  arrayIndex: number;
  isInTokenIdResult: boolean;
  loading: boolean;
}

interface ISearchStore {
  formState: IRecord;
  updateFormState: (updatedState: ChangeEvent<HTMLInputElement>) => void;
  tokenIdResult: IToken | null;
  setTokenIdResult: (newState: IToken | null) => void;
  genericResult: IToken[];
  setGenericResult: (newState: IToken[]) => void;
  selectedTokenIdResult: ISelectedTokenIdResult | null;
  setSelectedTokenIdResult: (newState: ISelectedTokenIdResult | null) => void;
  searchTokenSCState: ITokenSCRecord;
  setSearchTokenSCState: (updatedState: ITokenSCRecord) => void;
  searchHistory: ISelectedTokenIdResult[];
  setSearchHistory: (newState: ISelectedTokenIdResult[]) => void;
}

const genericResult = [
  {
    blockTimestamp: "1697628389",
    id: "0x0006",
    owner: "0x66cc79648b6f92821f986e778858d490e5419371",
    tier: "0x228Cf6DF51_589323",
    tokenId: "1536",
    selected: false,
  },
  {
    blockTimestamp: "1697647805",
    id: "0x0106",
    owner: "0xdaa6b37ed030094fe177e862de1ebfb22da57250",
    tier: "0x228Cf6DF51_589323",
    tokenId: "1537",
    selected: false,
  },
  {
    blockTimestamp: "1715362390",
    id: "0x0109",
    owner: "0x305aed61d42e18a872ee155a68c401c7980b7b97",
    tier: "0x081dd594ae_494225",
    tokenId: "2305",
    selected: false,
  },
  {
    blockTimestamp: "1715373317",
    id: "0x0209",
    owner: "0x99862ce7186fc320e09ab21bad77ebf2def3961b",
    tier: "0x081dd594ae_494225",
    tokenId: "2306",
    selected: false,
  },
  {
    blockTimestamp: "1715405744",
    id: "0x0309",
    owner: "0x55b697715dcb9eac856cef399fde6f8964a777e0",
    tier: "0x081dd594ae_494225",
    tokenId: "2307",
    selected: false,
  },
  {
    blockTimestamp: "1712222330",
    id: "0x0408",
    owner: "0xf1122895f8af8780acae1aa5fa3eb3914198f320",
    tier: "0x081dd594ae_494225",
    tokenId: "2052",
    selected: false,
  },
  {
    blockTimestamp: "1715499190",
    id: "0x0509",
    owner: "0x776de287c8ef93ef34e3566c4f62795195ecb9f6",
    tier: "0x081dd594ae_494225",
    tokenId: "2309",
    selected: false,
  },
  {
    blockTimestamp: "1715499761",
    id: "0x0609",
    owner: "0x776de287c8ef93ef34e3566c4f62795195ecb9f6",
    tier: "0x081dd594ae_494225",
    tokenId: "2310",
    selected: false,
  },
  {
    blockTimestamp: "1715500013",
    id: "0x0709",
    owner: "0x1f5112ac2175a7881310d00922534c93d85ba4fb",
    tier: "0x081dd594ae_494225",
    tokenId: "2311",
    selected: false,
  },
  {
    blockTimestamp: "1715500325",
    id: "0x0809",
    owner: "0x2fd26bba4474541546e93ac79d29fd72a03ba058",
    tier: "0x081dd594ae_494225",
    tokenId: "2312",
    selected: false,
  },
  {
    blockTimestamp: "1715500373",
    id: "0x0909",
    owner: "0xd37ab7c809679510fd68e5f824f78d7b5014b9d0",
    tier: "0x081dd594ae_494225",
    tokenId: "2313",
    selected: false,
  },
  {
    blockTimestamp: "1699893302",
    id: "0x1c06",
    owner: "0xbd93991c68b1266a927a3b7cc6e72599efe4fa44",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1564",
    selected: false,
  },
  {
    blockTimestamp: "1700078784",
    id: "0x1d06",
    owner: "0x07f28e1e5f7679a0212453bf257d20cdae3d84e4",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1565",
    selected: false,
  },
  {
    blockTimestamp: "1700132561",
    id: "0x1e06",
    owner: "0x7dfea2045a15ec684b2095b261cc232f14efe6a6",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1566",
    selected: false,
  },
  {
    blockTimestamp: "1700140911",
    id: "0x1f06",
    owner: "0x228c7e64f107d4c468e0f744fdd73dec2bf6df51",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1567",
    selected: false,
  },
  {
    blockTimestamp: "1700146560",
    id: "0x2006",
    owner: "0xe6c30ad5aee7ad22e9f39d51d67667587cdd05a1",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1568",
    selected: false,
  },
  {
    blockTimestamp: "1700146704",
    id: "0x2106",
    owner: "0x0d2188fec0b720e0310a31c2272958ef37204d37",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1569",
    selected: false,
  },
  {
    blockTimestamp: "1677271782",
    id: "0x22",
    owner: "0xfe3a509f8e8eb59209cc8c9b90f7b352781e96f4",
    tier: "FULLDAYACCESS",
    tokenId: "34",
    selected: false,
  },
  {
    blockTimestamp: "1681572390",
    id: "0x2201",
    owner: "0x2a1fe32bf3099b42f555ab393f78ea9cdbd37edf",
    tier: "0xaF81EBE3e7_004457",
    tokenId: "290",
    selected: false,
  },
  {
    blockTimestamp: "1683221518",
    id: "0x2202",
    owner: "0x29a7947301f9363d287b79a801c1574373bee30d",
    tier: "0xc763F628c8_383845",
    tokenId: "546",
    selected: false,
  },
  {
    blockTimestamp: "1688472036",
    id: "0x2203",
    owner: "0x2ea55d8f784e10aa91cffe732a009a7c76b91428",
    tier: "0xe2B9572a75_503183",
    tokenId: "802",
    selected: false,
  },
  {
    blockTimestamp: "1689518146",
    id: "0x2204",
    owner: "0xea565aba606605811a0a3ac1ee37a55b5c44e229",
    tier: "0xaF81EBE3e7_076137",
    tokenId: "1058",
    selected: false,
  },
  {
    blockTimestamp: "1695723320",
    id: "0x2205",
    owner: "0xd2690329a673cdfae9d69dee7b3b2e96d1ea89b5",
    tier: "0x404705AE48_317002",
    tokenId: "1314",
    selected: false,
  },
  {
    blockTimestamp: "1700161149",
    id: "0x2206",
    owner: "0xf93ebd2f6890371877d7e07377eeaa48397da44f",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1570",
    selected: false,
  },
  {
    blockTimestamp: "1708959917",
    id: "0x2207",
    owner: "0x4ed97919a279a5c0bfbb853d39d6cbb1cedfc7cc",
    tier: "0x75C1ee6280_604574",
    tokenId: "1826",
    selected: false,
  },
  {
    blockTimestamp: "1712399551",
    id: "0x2208",
    owner: "0x3c845a08bcf24c67f0e3e1c97aa02efe4f17dda5",
    tier: "0x081dd594ae_100041",
    tokenId: "2082",
    selected: false,
  },
  {
    blockTimestamp: "1715795406",
    id: "0x2209",
    owner: "0xa04c10b669b2460d211fa926ea03b1aa00e7be42",
    tier: "0x081dd594ae_100041",
    tokenId: "2338",
    selected: false,
  },
  {
    blockTimestamp: "1700293746",
    id: "0x2306",
    owner: "0xe5ea3751e0d229bd1f2e8d3a346f7b2d159de6c3",
    tier: "0x228Cf6DF51_028568",
    tokenId: "1571",
    selected: false,
  },
  {
    blockTimestamp: "1712416743",
    id: "0x2308",
    owner: "0x1abf170364a86f8266841dc074cadc730bef8d97",
    tier: "0x081dd594ae_494225",
    tokenId: "2083",
    selected: false,
  },
  {
    blockTimestamp: "1701420200",
    id: "0x2406",
    owner: "0x20da165deb81dbb042fe4a9d4808399ef2477c5d",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1572",
    selected: false,
  },
  {
    blockTimestamp: "1701420749",
    id: "0x2506",
    owner: "0x6ff46f441897f0cf2b806fd778e996cc697f5868",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1573",
    selected: false,
  },
  {
    blockTimestamp: "1701425531",
    id: "0x2606",
    owner: "0x1358155a15930f89ebc787a34eb4ccfd9720bc62",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1574",
    selected: false,
  },
  {
    blockTimestamp: "1712421458",
    id: "0x2608",
    owner: "0x14a39430eddff8f6700ababe8f8e902faba937f5",
    tier: "0x081dd594ae_494225",
    tokenId: "2086",
    selected: false,
  },
  {
    blockTimestamp: "1701427974",
    id: "0x2706",
    owner: "0xf93ebd2f6890371877d7e07377eeaa48397da44f",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1575",
    selected: false,
  },
  {
    blockTimestamp: "1689617127",
    id: "0x2804",
    owner: "0xbf32ee88d45ece473222d5a6069cc1d5f9f99a68",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1064",
    selected: false,
  },
  {
    blockTimestamp: "1689621372",
    id: "0x2904",
    owner: "0xc6b48c0da4d98cb9d86b5132963f46527ad79c2c",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1065",
    selected: false,
  },
  {
    blockTimestamp: "1689626471",
    id: "0x2a04",
    owner: "0x7f4517888156a797da7936a9a5e3787f9ac12594",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1066",
    selected: false,
  },
  {
    blockTimestamp: "1701849346",
    id: "0x2a06",
    owner: "0x228c7e64f107d4c468e0f744fdd73dec2bf6df51",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1578",
    selected: false,
  },
  {
    blockTimestamp: "1689627372",
    id: "0x2b04",
    owner: "0x8d59f6e9605a10df76bb07b430ddbd76f695a8ac",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1067",
    selected: false,
  },
  {
    blockTimestamp: "1695744305",
    id: "0x2b05",
    owner: "0x7dfea2045a15ec684b2095b261cc232f14efe6a6",
    tier: "0x228Cf6DF51_648486",
    tokenId: "1323",
    selected: false,
  },
  {
    blockTimestamp: "1701849426",
    id: "0x2b06",
    owner: "0x228c7e64f107d4c468e0f744fdd73dec2bf6df51",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1579",
    selected: false,
  },
  {
    blockTimestamp: "1701849482",
    id: "0x2c06",
    owner: "0xdaa6b37ed030094fe177e862de1ebfb22da57250",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1580",
    selected: false,
  },
  {
    blockTimestamp: "1701849948",
    id: "0x2d06",
    owner: "0xbf9b404a7526917ebeeb68b1d99d92ed37d819b8",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1581",
    selected: false,
  },
  {
    blockTimestamp: "1701857473",
    id: "0x2e06",
    owner: "0x6ff46f441897f0cf2b806fd778e996cc697f5868",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1582",
    selected: false,
  },
  {
    blockTimestamp: "1701869745",
    id: "0x2f06",
    owner: "0x01dbb7824836653c41d1a099601f5b412b20c853",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1583",
    selected: false,
  },
  {
    blockTimestamp: "1689690652",
    id: "0x3004",
    owner: "0x3f29b41112ac614674bfea5a6d7fb42c9c035b01",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1072",
    selected: false,
  },
  {
    blockTimestamp: "1701936019",
    id: "0x3006",
    owner: "0x7a5621a99793621c89ca55d3f4d04dc81d0b8366",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1584",
    selected: false,
  },
  {
    blockTimestamp: "1701936363",
    id: "0x3106",
    owner: "0xdf66eb7d8b95b132765151e59d773d961392e1fa",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1585",
    selected: false,
  },
  {
    blockTimestamp: "1689707753",
    id: "0x3204",
    owner: "0xd7736c53a9fbd05ddd02bd97124aa51c7cdf5a1a",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1074",
    selected: false,
  },
  {
    blockTimestamp: "1701936763",
    id: "0x3206",
    owner: "0xb72619c31bccf739ce5444e2837e00149481485f",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1586",
    selected: false,
  },
  {
    blockTimestamp: "1702065601",
    id: "0x3306",
    owner: "0xbd93991c68b1266a927a3b7cc6e72599efe4fa44",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1587",
    selected: false,
  },
  {
    blockTimestamp: "1695801661",
    id: "0x3405",
    owner: "0x010b54ff49450a036a34774a251342ae142b1ee3",
    tier: "0x228Cf6DF51_648486",
    tokenId: "1332",
    selected: false,
  },
  {
    blockTimestamp: "1702065627",
    id: "0x3406",
    owner: "0xa3d071024fe080cd447cb363101d6ce843a34f60",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1588",
    selected: false,
  },
  {
    blockTimestamp: "1689782005",
    id: "0x3504",
    owner: "0x30f2babe174b3fd4c790d3bcb2d22fcdf0cb4639",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1077",
    selected: false,
  },
  {
    blockTimestamp: "1702137806",
    id: "0x3506",
    owner: "0x46b7b293a2b975a4fbd5eb834c7c0ef9b0316e33",
    tier: "0x228Cf6DF51_688994",
    tokenId: "1589",
    selected: false,
  },
  {
    blockTimestamp: "1689787686",
    id: "0x3604",
    owner: "0x6bd8b13d5cf7226e1e798b068ab7fde42227e406",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1078",
    selected: false,
  },
  {
    blockTimestamp: "1695802357",
    id: "0x3605",
    owner: "0x137a74adf45f8d402fba8661a7baea6fe46a5dd7",
    tier: "0x228Cf6DF51_648486",
    tokenId: "1334",
    selected: false,
  },
  {
    blockTimestamp: "1702196081",
    id: "0x3606",
    owner: "0xbd93991c68b1266a927a3b7cc6e72599efe4fa44",
    tier: "0x228Cf6DF51_574623",
    tokenId: "1590",
    selected: false,
  },
  {
    blockTimestamp: "1689833691",
    id: "0x3704",
    owner: "0x89d516340fac60f02e5f87dd16dc5c14bc59aab8",
    tier: "0x228Cf6DF51_440288",
    tokenId: "1079",
    selected: false,
  },
];

export const useSearchStore = create<ISearchStore>((set) => ({
  formState: {
    input_search: "",
  },
  updateFormState: ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    set((store) => ({ formState: { ...store.formState, [name]: value } })),
  tokenIdResult: null,
  setTokenIdResult: (newState: IToken | null) =>
    set({ tokenIdResult: newState }),
  genericResult: [],
  setGenericResult: (newState: IToken[]) => set({ genericResult: newState }),
  selectedTokenIdResult: null,
  setSelectedTokenIdResult: (newState: ISelectedTokenIdResult | null) =>
    set({ selectedTokenIdResult: newState }),
  searchTokenSCState: {},
  setSearchTokenSCState: (newState: ITokenSCRecord) =>
    set({ searchTokenSCState: newState }),
  searchHistory: [],
  setSearchHistory: (newState: ISelectedTokenIdResult[]) =>
    set({ searchHistory: newState }),
}));

export const ORDER_DIRECTION_ASC = "asc";
export const ORDER_DIRECTION_DESC = "desc";

export interface IOrderBy {
  direction: string;
  title: string;
  selected: boolean;
  value: string;
}

const orderDataBy: IOrderBy[] = [
  {
    direction: ORDER_DIRECTION_DESC,
    title: "Date",
    selected: true,
    value: "blockTimestamp",
  },
  {
    direction: ORDER_DIRECTION_DESC,
    title: "Token ID",
    selected: false,
    value: "tokenId",
  },
  {
    direction: ORDER_DIRECTION_DESC,
    title: "Tier",
    selected: false,
    value: "tier",
  },
];

interface IOrderByStore {
  orderByState: IOrderBy[];
  setOrderByState: (newState: IOrderBy[]) => void;
}

export const useOrderByStore = create<IOrderByStore>((set) => ({
  orderByState: orderDataBy,
  setOrderByState: (newState: IOrderBy[]) => set({ orderByState: newState }),
}));

interface ITokenStore {
  tokenState: IToken[];
  setTokenState: (newState: IToken[]) => void;
  updateSelectedTokenState: (tokenId: string) => void;
}

export const useTokenStore = create<ITokenStore>((set) => ({
  tokenState: [],
  setTokenState: (newState: IToken[]) => set({ tokenState: newState }),
  updateSelectedTokenState: (tokenId: string) =>
    set((store) => {
      const updatedTokenState = store.tokenState.map((item) => ({
        ...item,
        selected: item.tokenId === tokenId,
      }));

      return { ...store, tokenState: updatedTokenState };
    }),
}));

export interface ITokenSCRecord {
  [name: string]: ITokenSC;
}

interface ITokenSCStore {
  tokenSCState: ITokenSCRecord;
  setTokenSCState: (updatedState: ITokenSCRecord) => void;
}

export const useTokenSCStore = create<ITokenSCStore>((set) => ({
  tokenSCState: {},
  setTokenSCState: (updatedState: ITokenSCRecord) =>
    set((store) => ({
      tokenSCState: { ...store.tokenSCState, ...updatedState },
    })),
}));

interface IViewStore {
  isGridViewState: boolean;
  setIsGridViewState: (newState: boolean) => void;
}

export const useViewStore = create<IViewStore>((set) => ({
  isGridViewState: true,
  setIsGridViewState: (newState: boolean) => set({ isGridViewState: newState }),
}));
