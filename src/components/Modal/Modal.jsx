import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
// Получаем доступ к  "ModalRoot" из index.html
const ModalRoot = document.querySelector('#ModalRoot');

class Modal extends Component {
  componentDidMount() {
    // вешаем слушателя события
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
      // удаляем слушателя события
    window.removeEventListener('keydown', this.handleKeyDown);
  }
// при нажатии Escape вызываем функцию закрытия модалки
handleKeyDown = event => {
    if (event.code === 'Escape') {
    
      this.props.onClose();
    }
  };
// кликнули в Backdrop, закрываем модалку
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props.image;
      // Используем createPortal для создания портала, в котором рендерим модальное окно
    return createPortal(
      <div onClick={this.handleBackdropClick} className="Overlay">
        <div className="Modal">
            {/* при открытии модалки рендерим картинку */}
          <img src={largeImageURL} alt="img" />
        </div>
      </div>,
      ModalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};