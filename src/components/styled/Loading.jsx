import styled from "styled-components"

  export const ContainerL = styled.div`
display: flex;
justify-content: center;
align-items: center;

`
export const Loading = styled.div`
     width: 50px;
      height: 50px;
      border: 5px solid #ccc; /* Cor de fundo do loader */
      border-top: 5px solid #1f1e1e; /* Cor do movimento */
      border-radius: 50%;
      animation: spin 1s linear infinite;
      @keyframes spin {
        0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
      }
      
`