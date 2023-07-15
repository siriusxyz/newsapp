import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date}=this.props;
    return (
      <div className="my-3">
        <div className="card " style={{width: "18rem", backgroundColor:"#3E8937"}}>
        {/*<span className="badge text-bg" style={{backgroundColor:"#4BA141"}}>{source.name}</span>*/}
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
            {description}
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm " style={{backgroundColor:"#26592F"}}>
           Read More 
            </a>
            <p className="card-text"><small className="text-muted">By <b>{author}</b> on <b>{new Date(date).toLocaleString()}</b></small></p>
          </div>
        </div>
      </div>
    );
  }
}
