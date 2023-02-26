import React from 'react'
import './App.css'
import { TextField } from '@mui/material'

function Analytic() {
    return (
        <div className='modal-analy'>
            <p>Analytics View</p>
            <br />
            <div>
                <span className='inline-container'>
                    <p>Clear Date</p>
                    <div>
                        <TextField
                            label='From'
                            className='textbox analy'
                            type={'date'}
                            variant='outlined'
                            size='small'
                            sx={{ m: 2 }}
                            autoFocus='false'
                        />
                    </div>
                    <div>
                        <TextField
                            label='To'
                            className='textbox analy'
                            type={'date'}
                            variant='outlined'
                            size='small'
                            sx={{ m: 2 }}
                        />
                    </div>
                </span>
                <span className='inline-container'>
                    <p>Due Date</p>
                    <div>
                        <TextField
                            label='From'
                            className='textbox analy'
                            type={'date'}
                            variant='outlined'
                            size='small'
                            sx={{ m: 2 }}
                        />
                    </div>
                    <div>
                        <TextField
                            label='To'
                            className='textbox analy'
                            type={'date'}
                            variant='outlined'
                            size='small'
                            sx={{ m: 2 }}
                        />
                    </div>
                </span>
            </div>

            <div>
                <span className='inline-container'>
                    <p>Baseline Create Date</p>
                    <div>
                        <TextField
                            label='From'
                            className='textbox analy'
                            type={'date'}
                            variant='outlined'
                            size='small'
                            sx={{ m: 2 }}
                        />
                    </div>
                    <div>
                        <TextField
                            label='To'
                            className='textbox analy'
                            type={'date'}
                            variant='outlined'
                            size='small'
                            sx={{ m: 2 }}
                        />
                    </div>
                </span>
                <span className='inline-container'>
                    <p>Invoice Currency</p>
                    <div>
                        <TextField
                            label='Invoice Currency'
                            className='textbox analy'
                            variant='outlined'
                            size='small'
                            sx={{ m: 2 }}
                        />
                    </div>
                    <br />
                </span>
            </div>
            <div>
                <button className='analy-bt'>SEARCH</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className='analy-bt'>CANCEL</button>
            </div>
        </div>
    )
}

export default Analytic