import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './App.css'
import { TextField } from '@mui/material'
import { searchData } from './Data'
import TableData from './TableData'

export const DataContext = React.createContext()

function AdvnSearch(props) {
    const [data, setData] = useState({ doc_id: '', invoice_id: '', cust_number: '', buisness_year: '' });
    const { doc_id, invoice_id, cust_number, buisness_year } = data;

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: [e.target.value] });
    };
    const submitHandler = async (e) => {
        e.preventDefault()
        let response = await searchData(data)
        if (response) {
            props.handleNewData(response);
        }
    };
    const closeHandler = e => {

    };

    return (
        <div className='modal-advn'>
            <p>Advance Search</p>
            <div>
                <TextField
                    label='Document Id'
                    className='textbox advn'
                    variant='standard'
                    size='small'
                    name='doc_id'
                    value={doc_id}
                    onChange={changeHandler}
                    sx={{ m: 2 }}
                />
                <TextField
                    label='Invoice Id'
                    className='textbox advn'
                    variant='standard'
                    size='small'
                    name='invoice_id'
                    value={invoice_id}
                    onChange={changeHandler}
                    sx={{ m: 2 }}
                />
            </div>
            <div>
                <TextField
                    label='Customer Number'
                    className='textbox advn'
                    variant='standard'
                    size='small'
                    name='cust_number'
                    value={cust_number}
                    onChange={changeHandler}
                    sx={{ m: 2 }}
                />
                <TextField
                    label='Business Year'
                    className='textbox advn'
                    variant='outlined'
                    size='small'
                    name='buisness_year'
                    value={buisness_year}
                    onChange={changeHandler}
                    sx={{ m: 2 }}
                />
            </div>
            <div>
                <button className='advc-bt' onClick={submitHandler}>SEARCH</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className='advc-bt' onClick={closeHandler}>CANCEL</button>
            </div>
        </div>
    )
}

export default AdvnSearch