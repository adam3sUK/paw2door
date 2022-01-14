import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    async handleSubmit(event) {
      event.preventDefault();
      try {
          const response = await axiosInstance.post('/user/create/', {
              username: this.state.email,
              name: this.state.username,
              password: this.state.password
          });
          return response;
      } catch (error) {
           console.log(error.stack);
      }
  }

    render() {
        return (
            <div>
                Signup
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Email:
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Signup;


// import React, { Component } from "react";
// import '../App.css';
// import SignUpFormModal from "./SignUpFormModal";
// import axios from "axios";

// class SignUpForm extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       shelterList: [],
//       modal: false,
//       activeItem: {
//         name: "",
//         email: "",
//         password: "",
//         phone_number: "",
//       },
//     };
//   }

//   componentDidMount() {
//     this.refreshList();
//   }

//   refreshList = () => {
//     axios
//       .get("/api/shelter/")
//       .then((res) => this.setState({ shelterList: res.data }))
//       .catch((err) => console.log(err));
//   };

//   toggle = () => {
//     this.setState({ modal: !this.state.modal });
//   };

//   handleSubmit = (item) => {
//     this.toggle();

//     if (item.id) {
//       axios
//         .put(`/api/shelter/${item.id}/`, item)
//         .then((res) => this.refreshList());
//       return;
//     }
//     axios
//       .post("/api/shelter/", item)
//       .then((res) => this.refreshList());
//   };

//   createItem = () => {
//     const item = { name: "", email: "", password: "", phone_number: "" };

//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   renderItems = () => {
//     const newItems = this.state.shelterList;

//     return newItems.map((item) => (
//       <li
//         key={item.id}
//         className="list-group-item d-flex justify-content-between align-items-center"
//       >
//         <span
//           className= "mr-2"
//           title={item.name}
//         >
//           {item.name}
//         </span>
//         {/* <span>
//           <button
//             className="btn btn-secondary mr-2"
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </span> */}
//       </li>
//     ));
//   };

//   render() {
//     return (
//       <main className="container">
//         <h1 className="text-white text-uppercase text-center my-4">Paw2Door App</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="mb-4">
//                 <button
//                   className="btn btn-primary" 
//                   onClick={this.createItem}
//                 >
//                   Add Shelter
//                 </button>
//               </div>
//               <ul className="list-group list-group-flush border-top-0">
//                 {this.renderItems()}
//               </ul>
//             </div>
//           </div>
//         </div>
//         {this.state.modal ? (
//           <SignUpFormModal
//             activeItem={this.state.activeItem}
//             toggle={this.toggle}
//             onSave={this.handleSubmit}
//           />
//         ) : null}
//       </main>
//     );
//   }
// }

// export default SignUpForm;
