import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightSide from './RightSide';
import { isAuthenticated } from '../controllers/user';
import { getCategories } from '../controllers/category';

class Category extends Component {

    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    async componentDidMount() {
        console.log("get categories")
        const categories = await getCategories();
        console.log("get done !!!");
        this.setState( {categories} );
    }

    render() {
        console.log("render ... ")
        const { categories } = this.state;
        const _id = isAuthenticated().user._id;
        return (
            <RightSide name="Category">
                <div className="row">
                    <div className="main-button text-center" style={{"marginTop": "30px", width: "100%"}}>
                        {/* <Link className="btn btn-app" >
                            <i className="fa fa-refresh"></i>
                        </Link> */}
                        <Link className="btn btn-app" to={`/admin/category/create/${_id}`} >
                            <i className="fa fa-plus"></i>
                        </Link>
                        {/* <Link className="btn btn-app" >
                            <i className="fa fa-check"></i>
                        </Link>
                        <Link className="btn btn-app" >
                            <i className="fa fa-circle-o"></i>
                        </Link>
                        <Link role="delete" id="delete" className="btn btn-app deleteMulti" >
                            <i className="fa fa-minus"></i>
                        </Link>*/}
                    </div>
                </div>


                <table className="table" style={{"marginTop": "30px", width: "100%"}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th style={{width: 200}} scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Sattus</th>
                            <th scope="col">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map( (cate, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{++index}</th>
                                    <td>{cate.name}</td>
                                    <td>{cate.description}</td>
                                    <td>{cate.status === 0 ? "Inactive" : "Active"}</td>
                                    <td>{new Date(cate.created).toLocaleDateString()}</td>
                                </tr>
                            )  
                        })}
                        
                    </tbody>
                </table>
            </RightSide>
        )
    }
}

export default Category;
