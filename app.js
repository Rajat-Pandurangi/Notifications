import React from 'react';
import  { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/bulma';
import axios from 'axios';
import Table from './table';

class App extends Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        // this.fetchedData={} 
        this.state = {
          list: [],
          visible: true,
          students:[]
        }
      }

      
      addItem(e) {
        // Prevent button click from submitting form
        e.preventDefault();
        this.setState({
          visible:false
        });
        // Create variables for our list, the item to add, and our form
        let list = this.state.list;
        const newItem = document.getElementById("addInput");
        const form = document.getElementById("addItemForm");
    
        // If our input has a value
        if (newItem.value != "") {
          // Add the new item to the end of our list array
          newItem.value = '"'+newItem.value+'"';
          list.push(newItem.value);
          // Then we use that to set the state for list
          this.setState({
            list: list,
          });
          // console.log(this.state.list);
          let vari = this.state.list.join(",");
          let url = 'http://192.168.0.125:40000/university/notifications/search?array=[' + vari + ']';
          console.log(url);
          axios.get(url).then(res=>{
            console.log("hello",res);
        //    console.log(JSON.parse(res));
           this.setState(()=>({
             students:res.data
           }));
          //  this.fetchedData=res.data;
       })
          // Finally, we need to reset the form
          newItem.classList.remove("is-danger");
          form.reset();
        } else {
          // If the input doesn't have a value, make the border red since it's required
          newItem.classList.add("is-danger");
        }
      }

      componentDidMount(){
        axios.get('http://192.168.0.125:40000/university/notifications/show').then(res=>{
               console.log("hello",res);
            //    console.log(JSON.parse(res));
               this.setState({students: res.data});
           })
       }

    render() {
      return(<div>

      <div className="content">
  <div className="container">
    <section className="section">
      <ul>
        {this.state.list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
    <hr />
    <section className="section">
      <form className="form" id="addItemForm">
        <input
          type="text"
          className="input"
          id="addInput"
          placeholder="Something that needs ot be done..."
        />
        <button className="button is-info" onClick={this.addItem}>
          Add Item
        </button>
      </form>
    </section>
  </div>
</div>{(<Table students={this.state.students}/>)}
    </div>
    )
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));
export default App;