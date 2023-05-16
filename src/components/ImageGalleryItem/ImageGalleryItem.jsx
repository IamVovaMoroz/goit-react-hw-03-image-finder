
import Modal from '../Modal/Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./ImageGalleryItem.css"

class ImageGalleryItem extends Component {
  state = {
    //  состояния shownModal по умолчание не показываем
    shownModal: false,
  };
   // Закрытие и открытие. Меняется состояние shownModal на противоположное при вызове
   onModal = () => {
    // Получаем предыдущее состояние shownModal из this.state
    const { shownModal } = this.state;
  
    // Противоположное значение shownModal записываем в переменнную
    const updatedShownModal = !shownModal;
  
    // меняем state на противоположное
    this.setState({ shownModal: updatedShownModal });
  };

//   onModal = () => {
//     this.setState(prevState => ({
//       shownModal: !prevState.shownModal
//     }));
//   };



  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.onModal}
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;