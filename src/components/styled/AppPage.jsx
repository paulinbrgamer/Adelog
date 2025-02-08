import styled from "styled-components";
export const AppPage = styled.div`
    display: grid;
    justify-items: center;
    height: 100dvh;
    grid-template-rows: 1fr auto;
    @media (min-width:900px) {
        grid-template-columns: 70px 1fr;
        background-color:#f9fafb;
    }
`