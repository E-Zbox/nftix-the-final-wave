import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: Source Sans Pro;
        transition: 350ms linear;
        color: ${({ theme: { textColor } }) => textColor};

        // variables
        --three-px: 3px;
        --seven-px: 7px;
        --ten-px: 10px;
        --bodyPadding: calc(var(--ten-px) * 3);
    }

    body {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--bodyPadding);
        background-color: ${({ theme: { bgColor } }) => bgColor};
    }
`;
