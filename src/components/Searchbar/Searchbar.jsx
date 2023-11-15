import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  hendleSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state.search);
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      search: value,
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.hendleSubmit} className="SearchForm">
          <button
            onClick={this.props.loaderOn}
            type="submit"
            className="SearchForm-button"
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={this.state.search}
            onChange={this.handleInputChange}
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
