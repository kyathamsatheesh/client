import '../App.css';
import React, { useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CustomerDelete from './CustomerDelete';
import axios from 'axios';

const Customer = (props) => {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers'); // Replace with your API endpoint
                setCustomerData(response.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, [props.stateRefresh]);
    return (
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell><img className="image" src={props.src} alt="profile"/></TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.birthday}</TableCell>
            <TableCell>{props.gender}</TableCell>
            <TableCell>{props.job}</TableCell>
            <TableCell><CustomerDelete stateRefresh={props.stateRefresh} id={props.id}/></TableCell>
        </TableRow>
    )
}

export default Customer;
