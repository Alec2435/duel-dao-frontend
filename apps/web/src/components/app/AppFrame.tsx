import { Container } from "@material-ui/core";
import { PropsWithChildren } from "react";
import { useWeb3Account } from "../../service/web3-provider";
import Root from "../Root";
import AppNav from "./AppNav";

export default function AppFrame({ children }: PropsWithChildren<{}>) {
    const { address: activeAddress } = useWeb3Account();

    return (
        <Root>
            <AppNav loggedIn={!!activeAddress}></AppNav>
            <Container maxWidth="lg" style={{ height: "100%", zIndex: 1 }}>
                {children}
            </Container>
        </Root>
    );
}
