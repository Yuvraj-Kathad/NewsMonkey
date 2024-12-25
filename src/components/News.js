import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defProps = {
        q: "india",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        q: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=71c8cbde2b0643339711912da1330767&q=${this.props.query}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    handleNext = async ()=>{

        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=71c8cbde2b0643339711912da1330767&q=${this.props.query}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    }
    handlePrev = async ()=>{

        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=71c8cbde2b0643339711912da1330767&q=${this.props.query}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '30px'}}>NewsMonkey - Top headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className='btn btn-dark' onClick={this.handlePrev}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNext}>Next &rarr; </button>
        </div>
        <div className="row" >
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0, 107):""} imageURL={element.urlToImage} newsUrl={element.url}/>
        </div>
        })}    
        </div>
        <div className="container d-flex justify-content-between">
            {/* {
            if({this.state.page<=1}){}
            else{
            <button type="button" className='btn btn-dark' onClick={this.handlePrev}> &larr; Previous</button>
            }
            } */}
            <button disabled={this.state.page<=1} type="button" className='btn btn-dark' onClick={this.handlePrev}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNext}>Next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default News
