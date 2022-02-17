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
}

export default function PlayerInfo({ alias, address }: PlayerInfoProps) {
    return (
        <div style={{ marginTop: theme.spacing(4) }}>
            <Typography variant="h5">{alias}</Typography>
            <PlayerAddress size="small" label={address} variant="outlined" />
        </div>
    );
}
