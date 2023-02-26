import React, { useState } from 'react'
import './App.css'
import { deleteData } from './Data'

function Delete(props) {
    const [data, setData] = useState({ sl_no: '' });
    const { sl_no } = data;

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!(props.selRow[0] && props.selRow.length === 1)) {
            return
        }
        let sl_no = props.selRow[0].sl_no;
        
        let response = await deleteData(sl_no)
    };

    const closeHandler = e => {
    };

    return (
        <div className='modal-delete'>
            <p style={{ fontSize: '20px' }}>Delete Records ?</p>
            <p>Are you sure you want to delete these record[s] ?</p>
            <div>
                <button className='del-bt' onClick={closeHandler}>CANCEL</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className='del-bt' onClick={submitHandler}>DELETE</button>
            </div>
        </div>
    )
}

export default Delete;