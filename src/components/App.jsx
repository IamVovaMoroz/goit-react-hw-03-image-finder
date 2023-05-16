
import React, { Component } from 'react';
import Searchbar from "./Searchbar/Searchbar";

import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchImages }  from "./service/fetchImages"
import ImageGallery from './ImageGallery/ImageGallery';
import Notiflix from 'notiflix';
import "./App.css"


let page = 1;

class App extends Component {
  state = {
     // Результат запроса пользователя
    query: '',
     // Массив полученных результатов
    items: [],
// Статус изначальный
    status: 'idle',
    // Всего результатов поиска изначально 0
    totalHits: 0,

    
  };

  handleSubmit = async query => {
    // При загрузке меняем на 1 стр
    page = 1;
    // Получаем значение из поля ввода и записываем в state
        this.setState({ query });
         // Если поле ввода пустое, выводим сообщение и выходим из функции
//  if (query.trim() === '') {
//         toast.error("Введите поисковый запрос")
//         return;

//     }
if (query.trim() !== '') {
      try {
          // Устанавливаем статус "pending", если что то ищем,  процесс загрузки ожидание
          console.log('pending')
        this.setState({ status: 'pending' });
        // Запрашиваем изображения с сервера
       // Записываем результаты, полученные с сервера, в переменные totalHits и hits.
       // totalHits - общее количество результатов поиска. hits - массив объектов с информацией об изображениях.
        // query - запрос пользователя, page - страница результатов
        const { totalHits, hits } = await fetchImages(query, page);
        if (hits.length < 1) {
            // Если не найдено изображений, устанавливаем статус "idle" и выводим сообщение об ошибке
          this.setState({ status: 'idle' });
        
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
            // Если найдены изображения, обновляем состояние с полученными данными
          this.setState({
            items: hits,
            query,
            totalHits: totalHits,
            // статус cтавим получено
            status: 'resolved',
          });
        }
      } catch (error) {
         // В случае ошибки запроса, устанавливаем статус "rejected"
        this.setState({ status: 'rejected' });
      }
    }
  };
  onNextPage = async () => {
    // При переходе на следующую страницу меняем статус на "pending"
    this.setState({ status: 'pending' });

    try {
 

// Запрашиваем следующую страницу изображений с сервера
      const { hits } = await fetchImages(this.state.query, (page += 1));
          // Добавляем полученные изображения к уже имеющимся
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
        // В случае ошибки запроса, устанавливаем статус "rejected"
      this.setState({ status: 'rejected' });
    }
  };
  render() {
    const { totalHits, status, items } = this.state;
    // Если статус "idle", отображаем только Searchbar
    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
     // Если статус "pending", отображаем Searchbar, список изображений (ImageGallery) и Loader
    if (status === 'pending') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    // Если статус "rejected", отображаем Searchbar и сообщение об ошибке
    if (status === 'rejected') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Oops, something went wrong, try again</p>
        </div>
      );
    }
      // Если статус "resolved", отображаем Searchbar, список изображений (ImageGallery) и кнопку "Load More" при наличии дополнительных результатов
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
        
          {/* если кол-во результатов больше 12 и если кол-вщ доступных изображений больше выведенных - рендерим Button  */}
          <div className="button-container">
  {totalHits > 12 && totalHits > items.length && (
    <Button onClick={this.onNextPage} />
  )}
</div>
        </div>
      );
    }
  }
}
export { App };