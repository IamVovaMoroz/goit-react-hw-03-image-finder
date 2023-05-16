import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import "./ImageGallery.css"

import PropTypes from 'prop-types';
// массив items в качестве пропса получаем
function ImageGallery({ items }) {
  return (
    <>
      <ul className="gallery">
        {items.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.array,
};