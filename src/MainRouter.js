
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';

import StaticHTML from './components/StaticHTML';
import Category from './novels/Category';
import AddCategory from './novels/AddCategory';
import Book from './novels/Book';
import AddBook from './novels/AddBook';
import SingleBook from './novels/SingleBook';
import Signin from './user/Singin';
import Singup from './user/Signup';
import PreviewChapter from './novels/PreviewChapter';

const MainRouter = () => (
    <>  
        <StaticHTML />
        {/* <PrivateRoute exact path="*" component={StaticHTML} /> */}
        <Switch>

            <Route exact path="/signup" component={Singup}></Route>
            <Route exact path="/admin/signin" component={Signin}></Route>
            <PrivateRoute exact path="/admin/category" component={Category}></PrivateRoute>
            <PrivateRoute exact path="/admin/category/create/:userId" component={AddCategory}></PrivateRoute>
            <PrivateRoute exact path="/admin/book" component={Book}></PrivateRoute>
            <PrivateRoute exact path="/admin/book/:bookId" component={SingleBook}></PrivateRoute>
            <PrivateRoute exact path="/admin/book/create/:userId" component={AddBook}></PrivateRoute>
            <PrivateRoute exact path="/admin/chapter/:chapterId" component={PreviewChapter}></PrivateRoute>
        </Switch>
    </>
)
    


export default withRouter(MainRouter);
