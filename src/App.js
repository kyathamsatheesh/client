import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { Component } from 'react';
import Customer from './components/Customer'
import CusomterAdd from './components/CustomerAdd'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


class App extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      custoemrs: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  componentDidMount(){ 
    console.log("43*****");   
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }
 
  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render(){
    const cellList = ["ID", "Image", "Name", "Date of Birth", "Gender", "Occupation", "Settings"];
    return ( 
      <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Customer Management System
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <div id="addbutton">
    <CusomterAdd stateRefresh={this.stateRefresh}/>
    </div>
    <div id="paper">
    <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell >{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
          {
          this.state.customers ? 
          this.state.customers.map(c => {
            return (
              <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} src={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/ >
            )
          }) : ""
          }
          </TableBody>
        </Table>
      </Paper>
    </div>


      </div>
    );
  }
    }

export default App;