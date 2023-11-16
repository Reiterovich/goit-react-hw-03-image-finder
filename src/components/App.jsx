import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { funSearch } from './FunSearch/FunSearch';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    array: [],
    page: 1,
    searchValue: '',
    length: null,
    loader: false,
    modal: false,
    id: 1,
    img: null,
  };

  onSubmit = inputValue => {
    this.setState({
      searchValue: inputValue,
    });
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.searchValue !== prevState.searchValue) {
      await this.setState({
        array: [],
        loader: true,
        page: 1,
      });

      const data = await funSearch(this.state.searchValue, this.state.page);
      this.setState({
        array: data,
        length: data.length,
        loader: false,
      });
    }
  }

  loadMore = async () => {
    await this.setState(prevState => {
      return {
        loader: true,
        page: prevState.page + 1,
      };
    });

    const data = await funSearch(this.state.searchValue, this.state.page);

    this.setState(prevState => {
      return {
        array: [...prevState.array, ...data],
        length: data.length,
        loader: false,
      };
    });
  };

  openModal = (id, img) => {
    this.setState(prevState => {
      return {
        modal: true,
        id: id,
        img: img,
      };
    });
  };

  owerLayOff = evt => {
    if (evt.target === evt.currentTarget) {
      this.setState(prevState => {
        return {
          modal: false,
          img: null,
          id: null,
        };
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.modal && (
          <Modal owerLayOff={this.owerLayOff} modalImg={this.state.img} />
        )}
        <ImageGallery>
          <ImageGalleryItem
            openModal={this.openModal}
            arrayPhotos={this.state.array}
          />
          <Loader loader={this.state.loader} />
          {this.state.length >= 12 && <Button loadMore={this.loadMore} />}
        </ImageGallery>
      </div>
    );
  }
}
