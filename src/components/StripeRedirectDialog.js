import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';


class StripeRedirectDialog extends React.Component {
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle style={{textAlign:"center"}}>Checkout</DialogTitle>
        <DialogContent style={{textAlign:"center"}}>
          <DialogContentText style={{textAlign:"center"}}>
            Redirecting you to Stripe checkout...
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

StripeRedirectDialog.propTypes = {
  closeThanksDialog: PropTypes.func,
  history: PropTypes.object,
  open: PropTypes.bool,
};

export default StripeRedirectDialog;
