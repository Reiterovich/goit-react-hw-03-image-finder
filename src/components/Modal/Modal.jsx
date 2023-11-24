import { Component } from 'react';

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', event => {
//       this.props.closeModal(event);
//     });
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', event => {
//       this.props.closeModal(event);
//     });
//   }

//   render() {
//     return (
//       <div onClick={this.props.owerLayOff} className="Overlay">
//         <div className="Modal">
//           <img src={this.props.modalImg} alt={this.props.modalImg.tags} />
//         </div>
//       </div>
//     );
//   }
// }

// ================================================================================================

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <div onClick={this.handleBackdropClick} className="Overlay">
        <div className="Modal">
          <img src={this.props.modalImg} alt={this.props.tags} />
        </div>
      </div>
    );
  }
}
