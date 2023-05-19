import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: '15',
        category: 'health',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0
        }
        //console.log("This is Constructor from News");
        document.title = `${this.props.category.toUpperCase()} - DailyNews`
    }
    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa71c3783d1746e5b8d96022660a9080&page=${this.state.page}&pagesize=${this.props.pageSize}`
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        //console.log("cdm")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14d719f913ab4afea65190db93afc89f&page=1&pagesize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false,
        // })
        this.updateNews();
    }

    // handlePrev = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14d719f913ab4afea65190db93afc89f&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
    //     // this.setState({ loading: true })
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     articles: parsedData.articles,
    //     //     page: this.state.page - 1,
    //     //     loading: false,
    //     // })
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    // handleNext = async () => {
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14d719f913ab4afea65190db93afc89f&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
    //     // this.setState({ loading: true })
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     articles: parsedData.articles,
    //     //     page: this.state.page + 1,
    //     //     loading: false,
    //     // })
    //     // }
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa71c3783d1746e5b8d96022660a9080&page=${this.state.page}&pagesize=${this.props.pageSize}`
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h1 className='text-center mt-3 mb-3'>DailyNews-Top {this.props.category.toUpperCase()}  Headlines </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className='row'>
                            {this.state.articles.map((item) => {
                                return (

                                    <div className='col-md-4' key={item.title}>
                                        <NewsItem
                                            title={item.title}
                                            description={item.description}
                                            imageUrl={item.urlToImage}
                                            newsUrl={item.url}
                                            author={item.author}
                                            date={item.publishedAt}
                                            source={item.source.name}
                                            category={this.props.category}
                                        />
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} className='btn btn-secondary mb-2' onClick={this.handlePrev} >&larr;prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-secondary mb-2' onClick={this.handleNext}>next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
