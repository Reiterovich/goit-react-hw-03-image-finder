import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.props.closeModal(event);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', event => {
      this.props.closeModal(event);
    });
  }

  render() {
    return (
      <div onClick={this.props.owerLayOff} className="Overlay">
        <div className="Modal">
          <img src={this.props.modalImg} alt={this.props.modalImg.tags} />
        </div>
      </div>
    );
  }
}
