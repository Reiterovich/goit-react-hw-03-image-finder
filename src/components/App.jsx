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
    id: null,
    img: null,
    error: null,
  };

  onSubmit = inputValue => {
    this.setState({
      searchValue: inputValue,
    });
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.searchValue !== prevState.searchValue) {
      this.setState({
        loader: true,
        array: [],
      });

      try {
        const data = await funSearch(this.state.searchValue, 1);

        if (data.hits.length === 0) {
          window.alert(
            'Sorry,--- nothing was found for your query. Look for something else.'
          );
          return;
        }

        this.setState(prevState => {
          return {
            array: data.hits,
            length: data.hits.length,
          };
        });
      } catch (error) {
        this.setState({ error });
        window.alert(this.state.error.message);
      } finally {
        this.setState({ loader: false });
      }
    }

    if (this.state.page !== prevState.page) {
      this.setState({
        loader: true,
      });

      try {
        const data = await funSearch(this.state.searchValue, this.state.page);

        this.setState(prevState => {
          return {
            array: [...prevState.array, ...data.hits],
            length: data.hits.length,
          };
        });
      } catch (error) {
        this.setState({ error });
        window.alert(this.state.error.message);
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  openModal = (id, img) => {
    const closeModal = event => {
      if (event.key === 'Escape') {
        console.log('Escape');
        this.setState(prevState => {
          return {
            modal: false,
            id: null,
            img: null,
          };
        });
      }
    };

    document.addEventListener('keydown', event => {
      closeModal(event);
    });

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
