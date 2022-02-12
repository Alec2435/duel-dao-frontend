
import {
    withStyles
} from '@material-ui/core/styles';
import { Switch, Grid, Typography } from '@material-ui/core';
import config from '../../../config';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const BillingCycleSwitch = (props) => {
    const onChange = props.onChange;
    const checked = props.checked;

    //Literally just a workaround for ESLint
    console.log(AntSwitch);

    return <Typography variant="body1" component="div" style={{textAlign:"center"}}>
        <Grid component="label" container alignItems="center" spacing={1} >
            <Grid item style={{ fontWeight: 100, marginLeft: 'auto' }}>Pay Monthly</Grid>
            <Grid item>
                <AntSwitch checked={checked} onChange={onChange} name="checked" />
            </Grid>
            <Grid item style={{ fontWeight: 100, marginRight: 'auto' }}>Pay Yearly <span style={{ fontWeight: 400, color: config.PALETTE.COLOR_SECONDARY }}>(30% off)</span></Grid>
        </Grid>
    </Typography>
}

export default BillingCycleSwitch