import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';


class IndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      lyrics:''
    }
    this.getLyrics = this.getLyrics.bind(this)
    this.handleChangeArtist = this.handleChangeArtist.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
  }

  getLyrics(event) {
    event.preventDefault()
  fetch(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.title}`)
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
      error = new Error(errorMessage);
      throw(error);
    }
  })
  .then(response => response.json())
  .then(body => {
    this.setState({
      lyrics: body.lyrics
    })
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
}

handleChangeArtist(event) {
  this.setState({ artist: event.target.value })
}

handleChangeTitle(event) {
  this.setState({ title: event.target.value })
}


  render () {

    return (
      <div>
        <h1>Here we go</h1>
        <form onSubmit={this.getLyrics}>
          <label htmlFor="title">Title:</label>
          <input type="text" name="Title" value={this.state.title} onChange={this.handleChangeTitle}/>
          <label htmlFor="artist">Artist:</label>
          <input type="text" name="artist" value={this.state.artist} onChange={this.handleChangeArtist}/>
          <input type="submit" value="Get Lyrics!"/>
        </form>
         {this.state.lyrics}
      </div>
    )
  }
}

export default IndexContainer;
