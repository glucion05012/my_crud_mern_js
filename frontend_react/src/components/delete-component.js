import React, {Component} from 'react';
import '../css/create.css';
import axios from 'axios';
import { dbConnection } from '../App';
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Update extends Component{  

    constructor(props){
        super(props);

        this.state = {

            //validation
            firstName: '',
            middleName: '',
            lastName: '',

            //validation
            firstNameError: '',
            middleNameError: '',
            lastNameError: ''
        }
    }

    componentDidMount(){
        axios.get(dbConnection+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    firstName : response.data.firstName,
                    middleName : response.data.middleName,
                    lastName : response.data.lastName
                })
                
            })
            .catch((err)=>{
                console.log(err);
            })

    }

    submitHandler=(e)=>{
        e.preventDefault();

        // backend connection
        axios.delete(dbConnection+'delete/'+this.props.match.params.id, this.state)
        .then(res => {

            console.log('profile deleted successfully');

            let fullName = this.state.firstName+' '+this.state.middleName+' '+this.state.lastName;
            toast.error(fullName+' successfully deleted!',{
                position: "top-center",
                transition:Bounce,
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        });   

        window.setTimeout(() => {
            this.props.history.push('/list'); 
        }, 5000)
        
    }
     
    render(){
        const{firstName, middleName, lastName} = this.state
        return(
                <div className="content">

                    <ToastContainer />

                    <h3>Delete Profile?</h3>
                    <form className="form-create" onSubmit={this.submitHandler}>
                        <table className="form-create">
                            <tbody>
                                <tr>
                                    <td><label>First Name:</label></td>
                                    <td><input type="text" name="firstName" value={firstName} disabled/></td>
                                </tr>
                                <tr>
                                    <td><label>Middle Name:</label></td>
                                    <td><input type="text" name="middleName" value={middleName} disabled/></td>  
                                </tr>
                                <tr>
                                    <td><label>Last Name:</label></td>
                                    <td><input type="text" name="lastName" value={lastName} disabled/></td>   
                                </tr>

                                <tr>
                                    <td><input type="submit" value="Delete"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

        )
    }
}