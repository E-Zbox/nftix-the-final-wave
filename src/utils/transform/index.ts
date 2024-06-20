export const stringifyDate = (timestamp: number): string => {
  let dateInString = "";

  const date = new Date(timestamp);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getUTCFullYear();

  switch (day) {
    case 0:
      dateInString = "Sun";
      break;
    case 1:
      dateInString = `Mon`;
      break;
    case 2:
      dateInString = "Tues";
      break;
    case 3:
      dateInString = "Wed";
      break;
    case 4:
      dateInString = "Thurs";
      break;
    case 5:
      dateInString = "Fri";
      break;
    case 6:
      dateInString = "Sat";
      break;
    default:
      dateInString = "Sun";
  }

  dateInString = `${dateInString} ${date.getDate()}`;

  switch (month) {
    case 0:
      dateInString = `${dateInString} Jan,`;
      break;
    case 1:
      dateInString = `${dateInString} Feb,`;
      break;
    case 2:
      dateInString = `${dateInString} Mar,`;
      break;
    case 3:
      dateInString = `${dateInString} April,`;
      break;
    case 4:
      dateInString = `${dateInString} May,`;
      break;
    case 5:
      dateInString = `${dateInString} June,`;
      break;
    case 6:
      dateInString = `${dateInString} July,`;
      break;
    case 7:
      dateInString = `${dateInString} Aug,`;
      break;
    case 8:
      dateInString = `${dateInString} Sept,`;
      break;
    case 9:
      dateInString = `${dateInString} Oct,`;
      break;
    case 10:
      dateInString = `${dateInString} Nov,`;
      break;
    case 11:
      dateInString = `${dateInString} Dec,`;
      break;
    default:
      dateInString = `${dateInString} Jan,`;
  }

  dateInString = `${dateInString} ${year}`;

  return dateInString;
};

const isPerfectSquare = (value: number): boolean => {
  return Number.isInteger(value ** 0.5);
};

const isPrime = (value: number): boolean => {
  /**
   * if check in the following order
   * -> if even and is greater than 2, it cannot be a prime number
   * -> if number is a perfect square, it cannot be a prime number
   * -> if number has a factor between 2 and half of itself, it cannot be a prime number
   * -> true
   */

  if (value > 2 && value % 2 == 0) return false;

  if (isPerfectSquare(value)) return false;

  const half = Math.floor(value / 2);

  let hasFactor = false;
  let leastFactor = 1;

  for (let num = 3; num < half; num++) {
    if (value % num == 0) {
      hasFactor = true;
      leastFactor = num;
    }
  }

  return hasFactor;
};

export const TOKENID_IS_PRIME = "PRIME";

export const TOKENID_IS_PERFECT_SQUARE = "PERFECT_SQUARE";

export const TOKENID_IS_EVEN = "EVEN";

export const TOKENID_IS_ODD = "ODD";

export const classifyTokenId = (tokenId: number): string => {
  /**
   * classifies tokenId in the following categories
   * => prime number
   * => perfect square
   * => even number
   * => odd number
   */

  let CLASSIFY_TOKEN_ID = "";

  if (isPrime(tokenId)) {
    CLASSIFY_TOKEN_ID = TOKENID_IS_PRIME;
  } else if (isPerfectSquare(tokenId)) {
    CLASSIFY_TOKEN_ID = TOKENID_IS_PERFECT_SQUARE;
  } else if (tokenId % 2 == 0) {
    CLASSIFY_TOKEN_ID = TOKENID_IS_EVEN;
  } else {
    CLASSIFY_TOKEN_ID = TOKENID_IS_ODD;
  }

  /**
   * we are categorizing the tokenId as elements from ATLA (avatar the last airebender)
   * [AIR, EVEN]                => balance, harmony
   * [WATER, ODD]               => fluidity, indivisible
   * [EARTH, PERFECT_SQUARE]    => stability, structure
   * [FIRE, PRIME]              => energy, power
   */

  let bgColor = "";

  switch (CLASSIFY_TOKEN_ID) {
    case TOKENID_IS_PRIME:
      // FIRE
      bgColor = "#dc3545";
      break;
    case TOKENID_IS_PERFECT_SQUARE:
      // EARTH
      bgColor = "#ffc107";
      break;
    case TOKENID_IS_EVEN:
      // AIR
      bgColor = "#cce5ff";
      break;
    case TOKENID_IS_ODD:
      // WATER
      bgColor = "#17a2b8";
      break;
  }

  return bgColor;
};

interface IResultText {
  text: string;
  highlight: boolean;
}

export const splitAndHighlightSearchText = (
  searchText: string,
  parentText: string
): IResultText[] => {
  let textArray: IResultText[] = [];

  let parentTextAsArray = parentText.split(searchText);

  if (parentTextAsArray.length > 1) {
    if (parentText === searchText) {
      parentTextAsArray = [searchText];
    }

    const parentTextAsArrayLength = parentTextAsArray.length;

    parentTextAsArray.forEach((item, index) => {
      if (item.length == 0) {
        textArray.push({ text: searchText, highlight: true });
        return;
      }

      textArray.push({ text: item, highlight: item === searchText });

      if (index + 1 < parentTextAsArrayLength) {
        textArray.push({ text: searchText, highlight: true });
      }
    });
  }

  return textArray;
};
