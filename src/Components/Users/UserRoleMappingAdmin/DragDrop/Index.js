import React, { Component } from 'react';
import './DragDrop.css'
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../../Utils/Network"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";

export default function AppDragDropDemo (props) {

    let history = useHistory();

    const [rowuserrolesInformation,setrowuserrolesInformation]=React.useState(props.rowUserRoles);
    const [rowallrolesInformation,setrowallrolesInformation]=React.useState(props.rowAllRoles);

    React.useEffect(async () => {

        //console.log("aaaaaabbbbbbb11111111111111"+props.userId)
        // if(props.userId !== "") {
        //     let response33 = await apiCall("admincontroller/userrole/"+props.userId,'GET')
        //     let responseJSON33 = await response33.json();
        //     await setrowuserrolesInformation(responseJSON33);
        // }
        // setrowallrolesInformation(props.rowAllRoles)
        setrowuserrolesInformation(props.rowUserRoles)
        updateAllRoles(props.rowUserRoles.map(val=>val.id))
        // rowuserrolesInformation.map(role => {
        //     let a = rowallrolesInformation.indexOf(role)
        //     setrowallrolesInformation(rowallrolesInformation.splice(a,1))
        // })

    }, [props.rowUserRoles, props.rowAllRoles]);


    let onDragStart = async (ev, id) => {
       let userid = props.userId
        //console.log('dragstart:'+id);
        ev.dataTransfer.setData("id", id);
    }

    let onDragOver = async (ev) => {
       let userid = props.userId
        //console.log('dragover:');
        ev.preventDefault();
     
    }

    let onDrop = async (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       let userid = props.userId
        //console.log('useid', userid);
       let deletoradd = ""

       if(cat == "userroles") {
           deletoradd = "admincontroller/updateuserrole/true/"+userid+"/"+id
       } else if(cat == "allroles") {
           deletoradd = "admincontroller/updateuserrole/false/"+userid+"/"+id
       }



        let response1 = await apiCall(deletoradd,'PUT','')

        if(response1.status == 200) {
            //console.log('drop:'+id+cat);
        }
        let response33 = await apiCall("admincontroller/userrole/"+userid,'GET')
        let responseJSON33 = await response33.json();
        await setrowuserrolesInformation(responseJSON33);

        updateAllRoles(responseJSON33.map(val=>val.id))
    }

    const updateAllRoles = (responseJSON33) => {
        setrowallrolesInformation(props.rowAllRoles.filter(record=> responseJSON33.indexOf(record.id) == -1))
    }
        return (
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-6 pl-0">
                  <div className="wip my-card ScrollStyle scroll-default"
                      onDragOver={(e)=>onDragOver(e)}
                      onDrop={(e)=>{onDrop(e, "allroles")}}>
                      <b><span className="task-header">Roles not yet Assigned to the Selected User</span></b>
                    <table className="w-100 table table-bordered table-hover">
                      <thead className="bg-light">
                        <tr>
                          <td>ID</td>
                          <td>Name</td>
                          <td>Description</td>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          rowallrolesInformation.map(
                              (role, index) => (             
                              <tr className="text-small">
                                      <td key={"id"}
                                          onDragStart = {(e) => onDragStart(e, role.id)}
                                          draggable
                                          className="draggable"

                                      >
                                          {role.id}
                                      </td>
                                      <td key={"name"}
                                          onDragStart = {(e) => onDragStart(e, role.id)}
                                          draggable
                                          className="draggable"

                                      >
                                          {role.name}
                                      </td>
                                      <td key={"description"}
                                          onDragStart = {(e) => onDragStart(e, role.id)}
                                          draggable
                                          className="draggable"

                                      >
                                          {role.description}
                                      </td>
                                  </tr>

                              )

                          )

                      }

                      </tbody>
                    </table> 
                  </div>
                </div>
                <div className="col-md-6 pr-0">
                  <div className="droppable my-card ScrollStyle scroll-default" 
                      onDragOver={(e)=>onDragOver(e)}
                      onDrop={(e)=>onDrop(e, "userroles")}>
                      <b><span className="task-header">Roles Assigned to the Selected User</span></b>
                      
                    <table className="w-100 table table-bordered table-hover">
                      <thead className="bg-light">
                        <tr>
                          <td>ID</td>
                          <td>Name</td>
                          <td>Description</td>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          rowuserrolesInformation.map(
                              (role, index) => (
                              <tr className="text-small">
                                      <td key={"id"}
                                          onDragStart = {(e) => onDragStart(e, role.id)}
                                          draggable
                                          className="draggable"

                                      >
                                          {role.id}
                                      </td>
                                      <td key={"name"}
                                          onDragStart = {(e) => onDragStart(e, role.id)}
                                          draggable
                                          className="draggable"

                                      >
                                          {role.name}
                                      </td>
                                      <td key={"description"}
                                          onDragStart = {(e) => onDragStart(e, role.id)}
                                          draggable
                                          className="draggable"

                                      >
                                          {role.description}
                                      </td>
                                  </tr>

                              )

                          )

                      }

                      </tbody>
                    </table> 
                  </div>
                </div>
              </div>
               
            </div>
        );
}