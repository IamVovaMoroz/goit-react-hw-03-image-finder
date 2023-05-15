import React, { Component } from 'react';
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader/Loader';

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
          minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            background: '#f4f4f4',
            color: '#333',
            fontSize: '16px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
        {/* <Loader /> */}
      </div>
    );
  }
}






