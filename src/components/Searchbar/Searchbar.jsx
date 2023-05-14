
import React, { Component } from 'react';
// import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

// const styles = { form: { marginBottom: 20 } };

class Searchbar extends Component {
  state = {
    query: '',
  };
// Локальное состояние имени хранит, обновляет его при каждом вводе в input при   onChange={this.handleNameChange}
// Делаем контролируемый компонент(элемент). То что мы вводим в input, сохраняется в state. Перерендеривается компронент и мы видем в результате в value, то что в state в данный момент

  handleChange = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  };

//   Делаем форму
  handleSubmit = event => {
    event.preventDefault();
   // при отправке формы вызываем метод из app и закидываем в него name с формы.
    const { query } = this.state;
    if (query.trim() !== '') {
      this.props.onSubmit(query);
      this.setState({  query: '' });
    }
     // Условие, чтобы не отправлялась пустая строка в запросах. Ставим return и выходит с кода при этом условии
    if (query.trim() === '') {
        toast.error("Введите поисковый запрос")
        return;

    }


  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;