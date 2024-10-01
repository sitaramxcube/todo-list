import { HtmlHTMLAttributes, memo, ReactNode, useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";

interface IModal {
    title: string;
    body: ReactNode | string;
    onModalClose: (data: any) => any;
    isHideCancelBtn?: boolean;
}
const Modal = ({title, body, onModalClose, isHideCancelBtn}: IModal) => {
    const [open, setOpen] = useState(true);
  
    const handleClose = (status: boolean) => {
    //   setOpen(false);
      onModalClose(status);
    };

return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {body}
        </DialogContent>
        <DialogActions>
          {!isHideCancelBtn && <Button onClick={() =>handleClose(false)} variant="outlined">Cancel</Button>}
          <Button onClick={() =>handleClose(true)} variant='contained'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
)
}

export default memo(Modal)