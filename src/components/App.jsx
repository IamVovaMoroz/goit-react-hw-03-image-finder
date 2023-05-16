// import React, { Component } from 'react';
// import Searchbar from "./Searchbar/Searchbar";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Loader from './Loader/Loader';
// import Button from './Button/Button';
// import { fetchImages }  from "./service/fetchImages"
// import ImageGallery from './ImageGallery/ImageGallery';

// export class App extends Component {
//   state = {
//     // Результат запроса пользователя
//     query: '',
//     // Массив полученных результатов
//     items: [],
//     // Статус приложения
//     status: 'idle',
//     // Всего результатов поиска
//     totalHits: 0,
//   };
 
//   handleFormSubmit = async (query) => {
//     let page = 1;
//     // Получаем значение из поля ввода и записываем в state
//     this.setState({ query });
  
//     if (query.trim() === '') {
//       // Если поле ввода пустое, выводим сообщение и выходим из функции
//       // Notiflix.Notify.info('You cannot search by empty field, try again.');
//       return;
//     } else {
//       try {
//         // Устанавливаем статус "pending", чтобы показать процесс загрузки
//         this.setState({ status: 'pending' });
//         // Запрашиваем изображения с сервера
//         // Записываем результаты, полученные с сервера, в переменные totalHits и hits.
//         // totalHits - общее количество результатов поиска. hits - массив объектов с информацией об изображениях.
//         // query - запрос пользователя, page - страница результатов
//         const { totalHits, hits } = await fetchImages(query, page);
  
//         if (hits.length < 1) {
//           // Если не найдено изображений, устанавливаем статус "idle" и выводим сообщение об ошибке
//           this.setState({ status: 'idle' });
//           // Notiflix.Notify.failure(
//           //   'Sorry, there are no images matching your search query. Please try again.'
//           // );
//         } else {
//           // Если найдены изображения, обновляем состояние с полученными данными
//           this.setState({
//             items: hits,
//             totalHits: totalHits,
//             status: 'resolved',
//           });
//         }
//       } catch (error) {
//         // В случае ошибки запроса, устанавливаем статус "rejected"
//         this.setState({ status: 'rejected' });
//       }
//     }
//   };

//   onNextPage = async () => {
//     // При переходе на следующую страницу меняем статус на "pending"
//     this.setState({ status: 'pending' });

//     try {
//       // Запрашиваем следующую страницу изображений с сервера
//       const { hits } = await fetchImages(this.state.query, page + 1);
//       // Добавляем полученные изображения к уже имеющимся
//       this.setState(prevState => ({
//         items: [...prevState.items, ...hits],
//         // Меняем статус на "resolved"
//         status: 'resolved',
//       }));
//     } catch (error) {
//       // В случае ошибки запроса, устанавливаем статус "rejected"
//       this.setState({ status: 'rejected' });
//     }
//   };

 




//   render() { const { totalHits, status, items } = this.state;

//   // Если статус "idle", отображаем только Searchbar
//   if (status === 'idle') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSubmit} />
//       </div>
//     );
//   }

//   // Если статус "pending", отображаем Searchbar, список изображений (ImageGallery) и Loader
//   if (status === 'pending') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSubmit} />
//         <ImageGallery page={page} items={this.state.items} />
//         <Loader />
//         {totalHits > 12 && <Button onClick={this.onNextPage} />}
//       </div>
//     );
//   }

//   // Если статус "rejected", отображаем Searchbar и сообщение об ошибке
//   if (status === 'rejected') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSubmit} />
//         <p>Something happened, please try again later</p>
//       </div>
//     );
//   }

//   // Если статус "resolved", отображаем Searchbar, список изображений (ImageGallery) и кнопку "Load More" при наличии дополнительных результатов
//   return (
//     <div className='App'
//       style={{
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: '20px',
//         background: '#f4f4f4',
//         color: '#333',
//         fontSize: '16px',
//       }}
//     >
//       <Searchbar onSubmit={this.handleFormSubmit} />
//       <ToastContainer autoClose={3000} />
//       <ImageGallery page={page} items={items} />
//       {totalHits > 12 && <Button onClick={this.onNextPage} />}
//       {/* <Loader /> */}
//     </div>
//   );
// }
// }



import React, { Component } from 'react';
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchImages }  from "./service/fetchImages"
import ImageGallery from './ImageGallery/ImageGallery';
import Notiflix from 'notiflix';


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
    if (query.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
          // Устанавливаем статус "pending", если что то ищем,  процесс загрузки ожидание
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
          <ToastContainer autoClose={3000} />
          {/* если кол-во результатов больше 12 и если кол-вщ доступных изображений больше выведенных - рендерим Button  */}
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}
export { App };