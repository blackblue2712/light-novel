import React,  { Component } from 'react';
import './Notification.css';

class Notification extends Component {

    hideNoiti = () => {
        document.getElementById("notification").classList.remove("slideup");
    }

    ani = async () => {
        await setTimeout( () => {
            const noti = document.getElementById("notification");
            if(noti) {
                noti.classList.remove("slideup");
            }
        }, 3500)
    }

    render() {
        if(this.props.classShow) {
            document.getElementById("notification").classList.add("slideup");
            this.ani();
        }
        return (
            <div id="notification" className={`toast_273B`}>
                <div className="content_1jb6">
                    <p className="text_29TR truncate-medium-2">{this.props.notification}</p>
                    <button className="close_2cmU" onClick={this.hideNoiti}>Đóng</button>
                </div>
            </div>
        )
    }
}

export default Notification;