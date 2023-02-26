import React, { useState } from 'react'
import './App.css'
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material'
import { editData } from './Data'

function Edit(props) {
    const [data, setData] = useState({ sl_no: '', invoice_currency: '', cust_payment_terms: '' });
    const { sl_no, invoice_currency, cust_payment_terms } = data;

    const [isOpen, setIsOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState('');

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: [e.target.value] });
    };
    const submitHandler = async (e) => {
        e.preventDefault()
        if (!(props.selRow[0] && props.selRow.length === 1)) {
            return
        }
        let sl_no = props.selRow[0].sl_no;
        data.sl_no = sl_no;
        // console.log(data.sl_no);
        let response = await editData(data)
        if (response.status === 200) {
            setAlertOpen(true);
            setAlertText("Updated Successfully");
        }
        handleClose()
    };
    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div className='modal-edit'>
            <button id="bt5" onClick={handleClickOpen}>EDIT</button>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle style={{ paddingBottom: 'none' }} className='text'>Edit</DialogTitle>
                <DialogContent >
                    <TextField
                        label='Invoice Currency'
                        className='textbox edit'
                        variant='standard'
                        size='small'
                        name='invoice_currency'
                        value={invoice_currency}
                        onChange={changeHandler}
                        sx={{ m: 0 }}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                        label='Customer Payment Terms'
                        className='textbox edit'
                        variant='standard'
                        size='small'
                        name='cust_payment_terms'
                        value={cust_payment_terms}
                        onChange={changeHandler}
                        sx={{ m: 0 }}
                    />
                </DialogContent>
                <DialogActions>
                    <button className='edit-bt' onClick={submitHandler}>EDIT</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='edit-bt' onClick={handleClose}>CANCEL</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Edit