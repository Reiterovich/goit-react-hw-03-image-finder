export const ImageGalleryItem = ({ arrayPhotos, openModal }) => {
  return (
    <>
      {arrayPhotos.length !== 0 &&
        arrayPhotos.map(img => (
          <li
            onClick={() => openModal(img.id)}
            key={img.id}
            className="ImageGalleryItem"
          >
            <img
              className="ImageGalleryItem-image"
              src={img.webformatURL}
              alt={img.tags}
            />
          </li>
        ))}
    </>
  );
};
