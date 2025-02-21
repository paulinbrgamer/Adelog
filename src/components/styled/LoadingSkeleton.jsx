import styled from "styled-components";

const  LoadingSkeleton = styled.div`
    height: 16px;
    border-radius: 2px;
    background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    margin-bottom: 8px;

  @keyframes shimmer {
    from { background-position: -200% 0; }
    to { background-position: 200% 0; }
  }
`
export default LoadingSkeleton