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
    loader: false,
    modal: false,
    tags: null,
    img: null,
    error: null,
    loadMore: false,
  };

  onSubmit = inputValue => {
    this.setState({
      searchValue: inputValue,
      array: [],
      page: 1,
    });
  };

  async componentDidUpdate(_, prevState) {
    if (
      this.state.searchValue !== prevState.searchValue ||
      this.state.page !== prevState.page
    ) {
      this.setState({
        loader: true,
      });
      try {
        const data = await funSearch(this.state.searchValue, this.state.page);

        if (data.hits.length === 0) {
          window.alert(
            'Sorry, nothing was found for your query. Look for something else.'
          );
          return;
        }

        this.setState(prevState => {
          return {
            array: [...prevState.array, ...data.hits],
            loadMore: this.state.page < Math.ceil(data.totalHits / 12),
          };
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  openModal = (tags, img) => {
    this.setState({
      modal: true,
      tags: tags,
      img: img,
    });
  };

  closeModal = () => {
    this.setState({
      modal: false,
      tags: null,
      img: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {this.state.modal && (
          <Modal
            closeModal={this.closeModal}
            tags={this.state.tags}
            modalImg={this.state.img}
          />
        )}

        <ImageGallery>
          <ImageGalleryItem
            openModal={this.openModal}
            arrayPhotos={this.state.array}
          />
        </ImageGallery>

        <Loader loader={this.state.loader} />

        {this.state.error && <p>Something went wrong ....</p>}

        {this.state.loadMore &&
          !this.state.loader &&
          this.state.array.length > 0 && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
