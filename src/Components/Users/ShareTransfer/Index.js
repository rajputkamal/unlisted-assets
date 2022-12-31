import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import TableHeader from "./UserHeader";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "react-loading-skeleton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const Index = () => {
  const [isload, setLoad] = React.useState(true);
  return (
    <div className="user_table_section">
      <div className="dbmn">
        <div className="Table_title">
          <div className="d-flex align-items-center justify-content-start w-100">
            <h5 className="main-heading">
              <b>Share Transfer</b>
            </h5>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-md-12 col-sm-12 col-12 d-flex align-items-center justify-content-center">
          <div className="col-md-2 col-sm-3 col-12">
              <div className="my-card my-2 text-center">
              <h5><b>240</b></h5>
              <p className="m-0 text-small">New Transcations</p>
              <a style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}>View All</a>
              </div>
          </div>
          <div className="col-md-2 col-sm-3 col-12">
              <div className="my-card my-2 text-center">
              <h5 className="text-danger"><b>24</b></h5>
              <p className="m-0 text-small">New Transcations</p>
              <a style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}>View All</a>
              </div>
          </div>
          <div className="col-md-2 col-sm-3 col-12">
              <div className="my-card my-2 text-center">
              <h5 className="text-success"><b>20</b></h5>
              <p className="m-0 text-small">New Transcations</p>
              <a style={{fontWeight: "500",fontSize: "14px",color: "#721B65"}}>View All</a>
              </div>
          </div>

        </div>

      </div>


      <div className="table-container">
        <div className="userTable">
          <TableContainer className="table-default-container scroll-default">
            <Table stickyHeader className="bg-white">
              <TableHeader />
              <TableRow>
                <TableCell>
                  {isload ? (
                    <div className="UserProfile">
                      <div className="UserIcon">
                        <img src='./hdfc.png' />
                      </div>
                    </div>
                  ) : (
                    <Skeleton circle={true} height={50} width={50} />
                  )}
                </TableCell>

                <TableCell>
                  {isload ? <> TXN1234 </> : <Skeleton width={100} />}
                </TableCell>

                <TableCell>
                  {isload ? <> 12345CGFFGGVBVVBC </> : <Skeleton width={100} />}
                </TableCell>
                <TableCell>
                  {isload ? (
                    <> 12345CGFFGGVBVVBC </>
                  ) : (
                    <Skeleton width={100} />
                  )}
                </TableCell>
                <TableCell>
                  {isload ? (
                    <> 12 Oct 2020 </>
                  ) : (
                    <Skeleton width={100} />
                  )}
                </TableCell>
                <TableCell>
                  {isload ? <> 12 Oct 2020 </> : <Skeleton width={100} />}
                </TableCell>
                <TableCell>
                  {isload ? <> 250000 </> : <Skeleton width={100} />}
                </TableCell>
                <TableCell>
                  {isload ? <> completed </> : <Skeleton width={100} />}
                </TableCell>
                <TableCell>
                  <div className="d-flex justify-content-between">
                    {isload ? (
                      <button
                        className="btn btn-primary-default mr-2"
                      >
                        <EditIcon />
                      </button>
                    ) : (
                      <Skeleton square={true} height={30} width={30} />
                    )}
                    {isload ? (
                      <button
                        className="btn btn-sm btn-danger"
                      >
                        <DeleteIcon />
                      </button>
                    ) : (
                      <Skeleton square={true} height={30} width={30} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Index;
