import * as React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    padding: 12px;
    display: flex;
    align-items: center;
`;

const Button = styled.button``;

export const ConnectButton = (props) => (
    <ButtonContainer>
        <Button onClick={props.onClick}>
            {props.title}
        </Button>
    </ButtonContainer>
);