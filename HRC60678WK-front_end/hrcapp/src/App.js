import React, { useState } from 'react';
import TableData from './components/TableData';
import Popup from 'reactjs-popup';
import { TextField } from '@mui/material'
import Analytic from './components/Analytic';
import AdvnSearch from './components/AdvnSearch';
import Add from './components/Add';
import Edit from './components/Edit';
import Delete from './components/Delete';
import { searchData } from './components/Data';
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@mui/material/Button";
import './App.css'
import hrclogo from './images/logo.svg';
import abcproducts from './images/abcproducts.png'

function App() {

    const [search, setSearch] = useState({ doc_id: '', invoice_id: '', cust_number: '', buisness_year: '' });
    // const { doc_id, invoice_id, cust_number, buisness_year } = search;

    const [editActive, setEditActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const [selRow, setSelRow] = useState([]);
    const [isSelRow, setIsSelRow] = useState(false);

    const [newData, setNewData] = useState([]);
    const [first, setFirst] = useState(true);

    const handleFirst = e => {
        setFirst(e);
    }

    const handleIsSelRow = e => {
        setIsSelRow(e);
    }

    const handleSelRow = e => {
        setSelRow(e);
        setIsSelRow(true);
        if (selRow[0]) {
            console.log(selRow[0].sl_no)
        }
    };

    const handleNewData = e => {
        setNewData(e)
        console.log(newData)
    }

    const changeHandler = e => {
        setSearch({ ...search, [e.target.name]: [e.target.value] });
    };

    const submitHandler = async (e) => {
        if (!(e.key === 'Enter')) {
            return
        }
        e.preventDefault()
        let response = await searchData(search)
        if (response) {
            handleNewData(response);
        }
    };

    const handleClose = () => {
        setEditActive(false)
    }

    return (
        <>
            <header>
                <span>
                    <img className="logo1" src={abcproducts} alt='ABC logo' />
                </span>
                <span>
                    <img className="logo2" src={hrclogo} alt='HRC Logo' />
                </span>
                <div id="name">Invoice List</div>
            </header>

            <main>
                <nav>
                    <span id="container1">
                        <button id="bt1">PREDICT</button>

                        <Popup id='popup-anlt'
                            trigger={<button id="bt2">ANALYTICS VIEW</button>}
                            modal>
                            <Analytic />
                        </Popup>

                        <Popup id='popup-advn'
                            trigger={<button id="bt3">ADVANCE SEARCH</button>}
                            modal>
                            <AdvnSearch
                                newData={newData}
                                handleNewData={handleNewData}
                            />
                        </Popup>
                        <Button
                            variant="outlined"
                            onClick={() => window.location.reload(false)}
                            id="refresh"
                        >
                            <RefreshIcon />
                        </Button>
                    </span>

                    <span id="container2">
                        <TextField
                            label='Search Customer Id'
                            className='textbox search'
                            variant='standard'
                            size='small'
                            name='cust_number'
                            value={search.cust_number}
                            onChange={changeHandler}
                            onKeyPress={submitHandler}
                            sx={{ m: 2 }}
                        />
                    </span>

                    <span id="container3">
                        <Popup id='popup-add'
                            trigger={<button id="bt4">ADD</button>}
                            closeOnDocumentClick={true}
                            modal>
                            <Add />
                        </Popup>

                        <Edit
                            open={isOpen}
                            handleClose={handleClose}
                            selRow={selRow}
                        />

                        <Popup id='popup-del'
                            trigger={<button id="bt6">DELETE</button>}
                            modal>
                            <Delete
                                selRow={selRow}
                            />
                        </Popup>

                    </span>
                </nav>
                <section id="grid">
                    <TableData
                        selRows={selRow}
                        handleSelRow={handleSelRow}
                        newData={newData}
                        handleNewData={handleNewData}
                        first={first}
                        handleFirst={handleFirst}
                    />
                </section>
            </main>

            <footer>
                <hr /><br />
                <center>
                    <a style={{ color: "blue" }}>Privacy Policy</a> | © 2022 HighRadius Corporation. All rights reserved
                    {/* Copyright 2022 Highradius.All Rights Reserved. */}
                </center>
            </footer>
        </>
    )
}

export default App