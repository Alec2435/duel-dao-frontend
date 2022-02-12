import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';

import config from '../../../config';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
})

const CopyToClipboardText = (props) => {
    const classes = useStyles();

    const [copied, setCopied] = React.useState(false);

    const setCopiedWithTO = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 5000)
    }

    return <Tooltip
        disableInteractive
        title={<Typography variant="body1" style={{ color: config.PALETTE.BACKGROUND_SECONDARY }}>Click to copy</Typography>}
        placement="bottom"
        arrow>
        <div className={classes.root}>
            <CopyToClipboard text={props.value} onCopy={setCopiedWithTO}>
                <Typography variant={props.variant} style={{ cursor: 'pointer', marginRight: 8, ...props.textStyle, '&:hover': { opacity: 0.8 } }} display="inline">{props.value}</Typography>
            </CopyToClipboard>
            {copied && <Typography variant="body2">Copied!</Typography>}
        </div>
    </Tooltip>
}

export default CopyToClipboardText