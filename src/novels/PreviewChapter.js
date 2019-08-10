import React, { Component } from 'react';
import { getSingleChapter } from '../controllers/chapter';
import { Link } from 'react-router-dom';

class PreviewChapter extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        // document.getElementsByClassName("leftside")[0].style.display = "none";
        const chapterId = this.props.match.params.chapterId;
        getSingleChapter(chapterId)
            .then( res => {
                console.log(res)
                if(res.message) {
                    console.log(res.message)
                } else {
                    document.getElementById("preview-content").innerHTML = res.content;
                }
            })
    }

    render() {
        return (
            <>
                <div id="preview-content" style={{textAlign: "center", marginTop: "50px", marginLeft: "220px"}}>
                    
                </div>
            </>
        )
    }
}

export default PreviewChapter;