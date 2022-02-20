import { Chip, Typography } from "@material-ui/core";
import { styled } from "@material-ui/system";
import theme from "../../theme";

const PlayerAddress = styled(Chip)({
    color: theme.palette.text.disabled,
    maxWidth: "100%",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginTop: theme.spacing(1),
});

export interface PlayerInfoProps {
    alias: string;
    address: string;
    isActive: boolean;
    isNext: boolean;
}

export default function PlayerInfo({
    alias,
    address,
    isActive,
    isNext,
}: PlayerInfoProps) {
    return (
        <div style={{ marginTop: theme.spacing(4) }}>
            <Typography variant="h5">
                {alias}
                {isActive || isNext ? (
                    <Chip
                        label={
                            isActive
                                ? isNext
                                    ? "Your Turn"
                                    : "You"
                                : isNext
                                ? "Their Turn"
                                : ""
                        }
                        size="small"
                        variant={isActive ? "filled" : "outlined"}
                        style={{
                            marginLeft: theme.spacing(1),
                            ...(isActive
                                ? { background: theme.palette.text.secondary }
                                : { color: theme.palette.text.secondary }),
                        }}
                    />
                ) : null}
            </Typography>

            <PlayerAddress size="small" label={address} variant="outlined" />
        </div>
    );
}
