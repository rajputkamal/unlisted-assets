import React, { Component } from 'react'
import Breadcrumb from "../../Components/Breadcrumbs"
import SideMenu from '../../Components/Users/SideMenu/Index';
import './Index.css'
export default class Index extends Component {
  render() {
    return (
      <div className="container-fluid UserDash_section">
        <div>
          <Breadcrumb />
        </div>
       
        <div className="row mt-3">
          <div className="col-md-12 col-12">
            <SideMenu />
          </div>
        </div>
      </div>
    )
  }
}
