import React, { Component } from 'react';
import 'table.css';
import axios from 'axios';
// import {addItem} from './app';

class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { 
        students: [],
        owners: []
      }
   }
   
   convert(value){
    let time = parseInt(value.toString().substr(0,8),16)*1000;
    let date = new Date(time);
    console.log(date);
    return date;
  }

   renderTableData() {
       console.log(this.props.students);
    return this.props.students.map((student, index) => {
       const { Sl_No,  Notification, _id } = student //destructuring
       return (
          <tr>
             <td>{Sl_No}</td>
             <td>{Notification}</td>
             <td>{window.convert(_id)}</td>
          </tr>
       )
    })
 }

 renderTableHeader() {
    let header = Object.keys(this.props.students[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
        <div>
        <h1 id='title'>React Dynamic Table</h1>
        <table id='students'>
           <tbody>
              {this.renderTableData()}
           </tbody>
        </table>
     </div>
      )
   }
}

export default Table;