
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {

  state = {
     progress: 0 
    }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      // <div style={{ backgroundColor: '#343a40' }}>
      <div className='bg-dark text-white bg-gradient'>
        <BrowserRouter>
          <NavBar />
          <LoadingBar height={3} progress={this.state.progress} color='red' />

          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} key='general' pageSize={15} category={'general'} country={'us'} />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} key='business' pageSize={15} category={'business'} country={'us'} />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' pageSize={15} category={'entertainment'} country={'us'} />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} key='health' pageSize={6} category={'health'} country={'us'} />} />
            <Route exact path='/general' element={<News setProgress={this.setProgress} key='general' pageSize={15} category={'general'} country={'us'} />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} key='science' pageSize={15} category={'science'} country={'us'} />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key='sports' pageSize={15} category={'sports'} country={'us'} />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key='technology' pageSize={15} category={'technology'} country={'us'} />} />


          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
