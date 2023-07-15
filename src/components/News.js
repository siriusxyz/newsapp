import React, { Component } from 'react'
import Loader from './Loader';
import Newsitem from './Newsitem'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  
  
  constructor(props)
  {
    super(props); 
    console.log("i am a constructor"); 
    this.state= {
      articles: [], 
      loading: true,
      page:1
    }
    document.title = `CloudNews - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
 
 capitalizeFirstLetter =(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  async componentDidMount()
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33b8200f5ac549bcb9afb82f69bbd977&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url); 

    let parsedData = await data.json(); 
    console.log(parsedData);  
    this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults, loading:false});
  }
  handleNextClick =async () =>
  {
     
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))
    {

    }
    else{
      console.log("next")
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url); 
      let parsedData = await data.json(); 
      console.log(parsedData); 
      this.setState(
        {
          page: this.state.page+1,
          articles: parsedData.articles,
          loading:false
        }
      )
    }
    
    
    
  }
  handlePrevClick= async () =>
  {
    console.log("next")
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url); 
    let parsedData = await data.json(); 
    console.log(parsedData);
    console.log("prev")
    this.setState(
      {
        page: this.state.page-1,
        articles: parsedData.articles,
        loading:false
      }
    )
    
  }

  fetchMoreData = async () =>
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33b8200f5ac549bcb9afb82f69bbd977&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url); 
      let parsedData = await data.json(); 
      console.log(parsedData); 
      this.setState(
        {
          page: this.state.page+1,
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading:false
        })
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>Top Headlines!</h1>
       {this.state.loading && <Loader/>}
        <div >
            <InfiniteScroll
            dataLength={this.state.articles.length} 
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loader/>} >
           <div className='container'>
          <div className='row'>
            { this.state.articles.map((element)=>{
              return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage?element.urlToImage:"https://c.ndtvimg.com/2023-01/nl7aloqo_wrestlers-at-jantar-mantar-pti-650-_650x400_19_January_23.jpg"} newsUrl={element.url} author={element.author?element.author:"unknown"} date={element.publishedAt} source={element.source}/>
            </div>
            })}
          </div>
          </div> 
          </InfiniteScroll>
        </div>
        {/*<div className='d-flex justify-content-between'>
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-primary btn-sm">&#8592; Previous </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleNextClick} disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button>
          </div>*/}
        

      </div>
      
    )
  }
}
