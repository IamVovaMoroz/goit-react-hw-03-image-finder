import React, { Component } from 'react';
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
  };
 
 
  handleFormSubmit = (query) => {
    // получаем значение с input и записываем в state

    this.setState({ query });
    console.log('Выполняется поиск:', query);
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}






