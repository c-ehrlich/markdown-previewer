import styled from "styled-components";

export const HeaderText = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  grid-area: label;
`;

export const OuterContainer = styled.div`
  background-color: #dddddd;
  padding: 8px;
`;

export const Container = styled.div`
  width: 100%;
  height: 500px;
  display: grid;
  grid-template-columns: auto auto 32px 32px;
  grid-template-rows: 32px auto;
  gap: 8px;
  grid-template-areas:
    "label    a        clear    resize"
    "window   window   window   window";
`;
