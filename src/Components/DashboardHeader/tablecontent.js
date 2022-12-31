import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeader from './tableheader';
import { makeStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg";
import "./tablecontent.css"
import Buttons from "../../Components/Buttons"


const rowInformation=[
    {"company":"Sun Pharma","inventoryid":36,"sellername":"John","qty":15,"price":100,"date":"9 Oct 2020","negotiable": "Yes","action":"Negotiate"},
    {"company":"Moon Pharma","inventoryid":23,"sellername":"Rose","qty":25,"price":200,"date":"28 Oct 2020","negotiable": "Yes","action":"Negotiate"},
    {"company":"Venus Pharma","inventoryid":30,"sellername":"Daniel","qty":5,"price":10,"date":"9 nov 2020","negotiable": "No","action":"Buy"},
    {"company":"Earth Pharma","inventoryid":34,"sellername":"Aari","qty":65,"price":160,"date":"9 Oct 2021","negotiable": "Yes","action":"Negotiate"},
    {"company":"jupiter Pharma","inventoryid":37,"sellername":"Rio","qty":16,"price":180,"date":"11 Oct 2020","negotiable": "No","action":"Negotiate"},
    {"company":"Mercury Pharma","inventoryid":28,"sellername":"Rafiq","qty":24,"price":250,"date":"28 Oct 2020","negotiable": "Yes","action":"Negotiate"},
    {"company":"Saturn Pharma","inventoryid":38,"sellername":"Dinesh","qty":51,"price":105,"date":"20 nov 2020","negotiable": "No","action":"Buy"},
    {"company":"Pluto Pharma","inventoryid":39,"sellername":"Aajith","qty":67,"price":180,"date":"23 Oct 2021","negotiable": "Yes","action":"Negotiate"},
]
function descendingComparator(a,b, orderBy){
    if(b[orderBy] < a[orderBy]){
        return -1
    }
    if(b[orderBy] > a[orderBy]){
        return 1
    }
    return 0
}
function getComparator(order, orderBy){
    return order === "desc" 
    ? (a,b) => descendingComparator(a,b, orderBy) 
    : (a,b) => -descendingComparator(a,b, orderBy)
}
const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el,index) => [el,index])
    stabilizedRowArray.sort((a,b)=> {
        const order = comparator(a[0], b[0])
        if(order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el)=> el[0])
}
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 500,
      border:"0.5px solid",
      borderRadius:"4px",
      margin: "10px"
    },
  });
export default function TableContent(){
    const classes = useStyles();
    const [orderDirection,setOrderDirection]=React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy]=React.useState('company');
    const [page,setPage]=React.useState(0);
    const [rowsPerPage,setRowsPerPage]=React.useState(10);
    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
        
    }

    // const handleChangePage =(event,newPage)=>{
    //     setPage(newPage);
    // }
    // const handleChangeRowsPerPage =(event,newPage)=>{
    //     setRowsPerPage(parseInt(event.target.value),10)
    //     setPage(0)
    // }


    return( <div>
                
            <div>
                <div className="Table_title"> <h3 >  Select Holding (100)</h3> 
                {/* <button className="view_all_button">View all</button> */}
                <Buttons.SecondaryButton value="View All"/>
                </div> 
               
           <TableContainer className={classes.container}>
           
            <Table stickyHeader>
                <TableHeader
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />
                {
                    sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((person,index) => (
                        <TableRow key={index}>
                            <TableCell>
                            <div className="company_cell">
            <div ><img src={SunPharma} /> </div>
            <div className="company_details ">
            <p className="company_name">{person.company}</p>
            <p className="company_category ">Pharmacy</p>
            <p className="company_id ">INE045367</p>
            </div>
        </div>
                            </TableCell>
                            <TableCell>
                                {person.inventoryid}
                            </TableCell>
                            <TableCell>
                                {person.sellername}
                            </TableCell>
                            <TableCell>
                                {person.qty}
                            </TableCell>
                            <TableCell>
                                {person.price}
                            </TableCell>
                            <TableCell>
                                {person.date}
                            </TableCell>
                            <TableCell>
                                {person.negotiable}
                            </TableCell>
                            <TableCell>
                                {person.action}
                            </TableCell>
                        </TableRow>
                    ))
                }
                
            </Table>
        </TableContainer>
        </div>
        
        </div>
    )
    
 
}