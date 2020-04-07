import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";

function DemoDialog() {
    const [open, setOpen] = React.useState(false);

    var handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className="demoButton">
                Demo
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    WhatsApp clone
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        This WhatsApp is a demo hence some features are not available yet.
                    </Typography>
                    <Typography component={'span'} variant={'body2'}>
                        <strong>In this version you can:</strong><br />
                        <ul>
                            <li>Create groups</li>
                            <li>Send and receive messages in-real-time</li>
                            <li>Search for a group</li>
                        </ul>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DemoDialog;