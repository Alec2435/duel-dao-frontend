import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useWeb3Account } from "../../service/web3-provider";

const RoundedButton = styled(Button)({
    borderRadius: "9999px",
    textTransform: "none",
    maxWidth: "12em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textAlign: "start",
    textOverflow: "ellipsis",
    display: "inline",
});

export function AuthButton() {
    const { provider, connectAccount, disconnectAccount, address } =
        useWeb3Account();

    const handleClick = () => {
        if (address) {
            disconnectAccount();
        } else {
            connectAccount();
        }
    };

    return (
        <RoundedButton size="small" variant="outlined" onClick={handleClick}>
            {address ? address : "Connect Wallet"}
        </RoundedButton>
    );
}
