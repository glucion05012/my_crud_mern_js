import React, {Component} from 'react';
import { dbConnection } from '../App';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Profile = props => (
    <tr>
        <td>{props.profile._id}</td>
        <td>{props.profile.firstName}</td>
        <td>{props.profile.middleName}</td>
        <td>{props.profile.lastName}</td>
        <td>
            
            <Link to={"/update/"+props.profile._id}>Edit</Link>|
            <Link to={"/delete/"+props.profile._id}>Delete</Link>
                    
        </td>
    </tr>
)

export default class List extends Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {profile: []};
    }


    componentDidMount(){
        this._isMounted = true;
        axios.get(dbConnection+'list')
            .then(response =>{
                if (this._isMounted) {
                    this.setState({profile: response.data});
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    componentDidUpdate(){
        this._isMounted = true;
        axios.get(dbConnection+'list')
            .then(response =>{
                if (this._isMounted) {
                    this.setState({profile: response.data});
                }    
            })
            .catch((err)=>{
                console.log(err);
            })
    }


    profileList(){
        return this.state.profile.map((currentProfile, i)=>{
            return <Profile profile={currentProfile} key = {i} />;
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
      }
    render(){
        return(

        <div>
            <h3>My Profile List</h3>
            <table className="table table-striped style={{ marginTop:20px}}">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.profileList() }
                </tbody>
            </table>
        </div>
        
        )
    }
}