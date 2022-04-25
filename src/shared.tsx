import { Link } from "react-router-dom";
import styled from "styled-components";
export const Container = styled.div`

width: 100vw;
display: flex;
flex-direction:column;
`;

export const Label = styled.label`
  font-size: 1.5em;
`;

export const StyledLink = styled(Link)`
   width: 25%;
   height: 45px;
   display:flex;
   justify-content: center;
   align-items: center;
   text-decoration: none;
   color: black;
   border: 2px solid black;
   border-radius: 10px;
   font-size: 1rem;
   background: #f2f2f2;
   margin-top: 3%;
   
`;