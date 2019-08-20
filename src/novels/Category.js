import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightSide from './RightSide';
import { isAuthenticated } from '../controllers/user';
import { getCategories, getMoreCategories } from '../controllers/category';

class Category extends Component {

    constructor() {
        super();
        this.state = {
            message: '',
            categories: []
        }
    }

    async componentDidMount() {
        console.log("get categories")
        const categories = await getCategories();
        console.log("get done !!!");
        this.setState( {categories} );
    }

    deleteMessageAfterShow = () => {
        this.setState( {message: ''});
    }

    deleteCategory = (cateId) => {
        return () => {
            
        }
    }

    loadMore = async () => {
        document.getElementById("loadmore").style.display = "none";
        const lengthCate = this.state.categories.length;
        getMoreCategories(lengthCate)
            .then( res => {
                if(res.message) {
                    this.setState( {message: res.message} )
                } else {
                    const newCategories = this.state.categories;
                    newCategories.push(...res);
                    if(newCategories.length === lengthCate) {
                        document.getElementById("loadmore").style.display = "none";
                    } else {
                        document.getElementById("loadmore").style.display = "block";
                        this.setState({
                            categories: newCategories
                        })
                    }
                }
            })
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
                            <th style={{width: 100}} scope="col">Edit/Del</th>
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
                                    <td>
                                        <Link to={`/admin/category/edit/${cate._id}`} ><i className="fa fa-pencil"></i></Link>&nbsp;|&nbsp;
                                        <Link onClick={this.deleteCategory(cate._id)} to={`/admin/category/`} ><i className="fa fa-minus"></i></Link>
                                    </td>
                                    <td>{cate.description}</td>
                                    <td>{cate.status === 0 ? "Inactive" : "Active"}</td>
                                    <td>{new Date(cate.created).toLocaleDateString()}</td>
                                </tr>
                            )  
                        })}
                    </tbody>
                    
                </table>
                <button id="loadmore" className="btn btn-outline-primary btn-block btn-sm" onClick={this.loadMore}>Load More</button>
            </RightSide>
        )
    }
}

export default Category;
