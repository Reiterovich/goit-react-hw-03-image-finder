export const Modal = ({ modalImg, owerLayOff }) => {
  return (
    <div onClick={owerLayOff} className="Overlay">
      <div className="Modal">
        <img src={modalImg} alt={modalImg.tags} />
      </div>
    </div>
  );
};
