import { makeStyles } from "@material-ui/styles";
import { PropsWithChildren } from "react";
import config from "../../config";

const useStyles = makeStyles({
    root: {
        background: config.PALETTE.BACKGROUND_PRIMARY,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        color: "#FFFFFF",
    },
});

export default function Root({ children }: PropsWithChildren<{}>) {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{ color: "#FFFFFF" }}>
            {children}
        </div>
    );
}
