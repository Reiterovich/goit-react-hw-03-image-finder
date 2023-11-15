export const Modal = ({ modalImg, owerLayOff, owerLayOffEsc }) => {
  return (
    <div onClick={owerLayOff} className="Overlay">
      <div onClick={owerLayOffEsc} className="Modal">
        <img src={modalImg.largeImageURL} alt={modalImg.tags} />
      </div>
    </div>
  );
};
