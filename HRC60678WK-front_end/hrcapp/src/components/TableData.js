import React, { useEffect, useState, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './App.css';
import { getData, searchData } from './Data';
import { DataContext } from './AdvnSearch';
import axios from 'axios';

const columns = [
    { field: 'sl_no', headerName: 'Sl no', width: 70 },
    { field: 'business_code', headerName: 'Business Code', width: 80 },
    { field: 'cust_number', headerName: 'Cust Number', width: 100 },
    { field: 'clear_date', headerName: 'Clear Date', width: 100 },
    { field: 'buisness_year', headerName: 'Buisness Year', width: 80 },
    { field: 'doc_id', headerName: 'Doc Id', width: 100 },
    { field: 'posting_date', headerName: 'Posting Date', width: 100 },
    { field: 'document_create_date', headerName: 'Document Create Date', width: 100 },
    { field: 'due_in_date', headerName: 'Due Date', width: 100 },
    { field: 'invoice_currency', headerName: 'Invoice Currency', width: 80 },
    { field: 'document_type', headerName: 'Document Type', width: 100 },
    { field: 'posting_id', headerName: 'Posting Id', width: 70 },
    { field: 'total_open_amount', headerName: 'Total Open Amount', width: 100 },
    { field: 'baseline_create_date', headerName: 'Baseline Create Date', width: 100 },
    { field: 'cust_payment_terms', headerName: 'Cust Payment Terms', width: 80 },
    { field: 'invoice_id', headerName: 'Invoice Id', width: 100 },
];

const rows = [
    { "sl_no": 1, "business_code": "U001", "cust_number": 200769623, "clear_date": "2020-02-11", "buisness_year": 2020, "doc_id": "1930438491", "posting_date": "2020-01-26", "document_create_date": "2020-01-25", "due_in_date": "2020-02-10", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 54273.28, "baseline_create_date": "2020-01-26", "cust_payment_terms": "NAH4", "invoice_id": 1930438491 },
    { "sl_no": 2, "business_code": "U001", "cust_number": 200980828, "clear_date": "2019-08-08", "buisness_year": 2019, "doc_id": "1929646410", "posting_date": "2019-07-22", "document_create_date": "2019-07-22", "due_in_date": "2019-08-11", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 79656.6, "baseline_create_date": "2019-07-22", "cust_payment_terms": "NAD1", "invoice_id": 1929646410 },
    { "sl_no": 3, "business_code": "U001", "cust_number": 200792734, "clear_date": "2019-12-30", "buisness_year": 2019, "doc_id": "1929873765", "posting_date": "2019-09-14", "document_create_date": "2019-09-14", "due_in_date": "2019-09-29", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 2253.86, "baseline_create_date": "2019-09-14", "cust_payment_terms": "NAA8", "invoice_id": 1929873765 },
    { "sl_no": 4, "business_code": "CA02", "cust_number": 140105686, "clear_date": "0000-00-00", "buisness_year": 2020, "doc_id": "2960623488", "posting_date": "2020-03-30", "document_create_date": "2020-03-30", "due_in_date": "2020-04-10", "invoice_currency": "CAD", "document_type": "RV", "posting_id": 1, "total_open_amount": 3299.7, "baseline_create_date": "2020-03-31", "cust_payment_terms": "CA10", "invoice_id": 2147483647 },
    { "sl_no": 5, "business_code": "U001", "cust_number": 200769623, "clear_date": "2019-11-25", "buisness_year": 2019, "doc_id": "1930147974", "posting_date": "2019-11-13", "document_create_date": "2019-11-13", "due_in_date": "2019-11-28", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 33133.29, "baseline_create_date": "2019-11-13", "cust_payment_terms": "NAH4", "invoice_id": 1930147974 },
    { "sl_no": 6, "business_code": "CA02", "cust_number": 140106181, "clear_date": "2019-12-04", "buisness_year": 2019, "doc_id": "2960581231", "posting_date": "2019-09-20", "document_create_date": "2019-09-20", "due_in_date": "2019-10-04", "invoice_currency": "CAD", "document_type": "RV", "posting_id": 1, "total_open_amount": 22225.84, "baseline_create_date": "2019-09-24", "cust_payment_terms": "CA10", "invoice_id": 2147483647 },
    { "sl_no": 7, "business_code": "U001", "cust_number": 200769623, "clear_date": "2019-11-12", "buisness_year": 2019, "doc_id": "1930083373", "posting_date": "2019-11-01", "document_create_date": "2019-10-31", "due_in_date": "2019-11-16", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 7358.49, "baseline_create_date": "2019-11-01", "cust_payment_terms": "NAH4", "invoice_id": 1930083373 },
    { "sl_no": 8, "business_code": "U001", "cust_number": 200744019, "clear_date": "0000-00-00", "buisness_year": 2020, "doc_id": "1930659387", "posting_date": "2020-03-19", "document_create_date": "2020-03-18", "due_in_date": "2020-04-03", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 11173.02, "baseline_create_date": "2020-03-19", "cust_payment_terms": "NAA8", "invoice_id": 1930659387 },
    { "sl_no": 9, "business_code": "U001", "cust_number": 200769623, "clear_date": "2019-06-18", "buisness_year": 2019, "doc_id": "1929439637", "posting_date": "2019-06-07", "document_create_date": "2019-06-05", "due_in_date": "2019-06-22", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 15995.04, "baseline_create_date": "2019-06-07", "cust_payment_terms": "NAH4", "invoice_id": 1929439637 },
    { "sl_no": 10, "business_code": "U001", "cust_number": 200762301, "clear_date": "2019-03-06", "buisness_year": 2019, "doc_id": "1928819386", "posting_date": "2019-02-20", "document_create_date": "2019-02-19", "due_in_date": "2019-03-07", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 28.63, "baseline_create_date": "2019-02-20", "cust_payment_terms": "NAC6", "invoice_id": 1928819386 },
    { "sl_no": 11, "business_code": "U001", "cust_number": 200418007, "clear_date": "0000-00-00", "buisness_year": 2020, "doc_id": "1930610806", "posting_date": "2020-03-11", "document_create_date": "2020-03-06", "due_in_date": "2020-03-26", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 3525.59, "baseline_create_date": "2020-03-11", "cust_payment_terms": "NAA8", "invoice_id": 1930610806 },
    { "sl_no": 12, "business_code": "U001", "cust_number": 200743129, "clear_date": "2019-01-22", "buisness_year": 2019, "doc_id": "1928550622", "posting_date": "2019-01-02", "document_create_date": "2019-01-02", "due_in_date": "2019-01-17", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 103147.37, "baseline_create_date": "2019-01-02", "cust_payment_terms": "NAA8", "invoice_id": 1928550622 },
    { "sl_no": 13, "business_code": "U001", "cust_number": 200186937, "clear_date": "2019-05-06", "buisness_year": 2019, "doc_id": "1929151655", "posting_date": "2019-04-15", "document_create_date": "2019-04-15", "due_in_date": "2019-04-30", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 16381.45, "baseline_create_date": "2019-04-15", "cust_payment_terms": "NAA8", "invoice_id": 1929151655 },
    { "sl_no": 14, "business_code": "U001", "cust_number": 200721222, "clear_date": "2019-11-01", "buisness_year": 2019, "doc_id": "1930022117", "posting_date": "2019-10-17", "document_create_date": "2019-10-17", "due_in_date": "2019-11-01", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 19581.57, "baseline_create_date": "2019-10-17", "cust_payment_terms": "NAA8", "invoice_id": 1930022117 },
    { "sl_no": 15, "business_code": "U001", "cust_number": 200739534, "clear_date": "0000-00-00", "buisness_year": 2020, "doc_id": "1930788296", "posting_date": "2020-04-15", "document_create_date": "2020-04-15", "due_in_date": "2020-04-30", "invoice_currency": "USD", "document_type": "RV", "posting_id": 1, "total_open_amount": 121105.65, "baseline_create_date": "2020-04-15", "cust_payment_terms": "NAA8", "invoice_id": 1930788296 },
];

export default function TableData(props) {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [search, setSearch] = useState({ doc_id: '', invoice_id: '', cust_number: '', buisness_year: '' });

    const [selectedRows, setSelectedRows] = useState([])
    const [enableEdit, setEnableEdit] = useState(false)

    const [slNo, setSlNo] = useState('')

    // data = useContext(DataContext)

    useEffect(() => {
        if (selectedRows.length === 0) {
            setEnableEdit(false)
            // console.log(enableEdit)
            // console.log(selectedRows)
        } else {
            setEnableEdit(true)
            // console.log(enableEdit)
            // console.log(selectedRows)
            setSlNo(selectedRows[0].sl_no)
            // console.log(slNo)
        }
    }, [selectedRows])


    useEffect(() => {
        if (props.first) {
            let str = "cust_number=" + search.cust_number + "&doc_id=" + search.doc_id + "&invoice_id=" + search.invoice_id + "&buisness_year=" + search.buisness_year;
            axios.get('backend/Search?' + str
            ).then((response) => {
                props.handleNewData(response.data);
            }).catch((err) => {
                console.log(err);
            });
            props.handleFirst(false);
            // console.log(props.first);
        }
    }, []);

    // useEffect(() => {
    //     async function fetchDataApi() {
    //         setData(await searchData(search))
    //     }
    //     fetchDataApi()
    // }, [])

    // if (props === undefined) {
    //     data = props.data
    // }

    return (
        <>
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid
                    rows={props.newData}
                    getRowId={(r) => r.sl_no}
                    columns={columns}
                    pageSize={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    onPageSizeChange={(e) => {
                        setRowsPerPage(e);
                        setPage(0);
                    }}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                    }}
                    checkboxSelection
                    disableSelectionOnClick
                    disableColumnMenu={true}
                    onSelectionModelChange={(e) => {
                        const selectedId = new Set(e);
                        const selectedRow = props.newData.filter((r) => selectedId.has(r.sl_no));
                        setSelectedRows(selectedRow);
                        props.handleSelRow(selectedRow);
                    }}
                    rowHeight={40}
                    style={{ color: "white", backgroundColor: "#39525f" }}
                // density='compact'
                />
                {/* {console.log(selectedRows)} */}
            </div>
        </>
    )
}
