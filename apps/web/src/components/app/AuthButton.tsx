import {
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import React, { useState } from "react";
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
    const {
        connectAccount,
        disconnectAccount,
        address: activeAddress,
    } = useWeb3Account();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnect = () => {
        disconnectAccount();
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (activeAddress) {
            setAnchorEl(event.currentTarget);
        } else {
            connectAccount();
        }
    };

    return (
        <>
            <RoundedButton
                size="small"
                variant="outlined"
                onClick={handleClick}
            >
                {activeAddress ? activeAddress : "Connect Wallet"}
            </RoundedButton>
            <Menu
                id="auth-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "auth-menu",
                }}
            >
                <MenuItem onClick={handleDisconnect}>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
