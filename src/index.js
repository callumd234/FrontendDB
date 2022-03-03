import React from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";
import bootstrap from "bootstrap";
import Button from "react-bootstrap/Button";
import "./index.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

class ChosenFilmRow extends React.Component {
  render() {
    const chosenfilmdata = this.props.chosen_filmdata;

    return (
      <tr>
        <td>{chosenfilmdata.title}</td>
        <td>{chosenfilmdata.description}</td>
        <td>{chosenfilmdata.release_year}</td>
        <td>{chosenfilmdata.length}</td>
        <td>{chosenfilmdata.rating}</td>
      </tr>
    );
  }
}

class FilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [] };
  }
  componentDidMount() {
    axios
      .get("http://54.236.39.207:8080/Home/AllFilms")
      .then((response) => this.setState({ films: response.data }));
  }
  render() {
    const film = this.state.films;
    const filterText = this.props.filterText.toLowerCase();
    const rows = [];

    this.state.films.forEach((film) => {
      if (film.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      console.log(film);
      rows.push(<FilmRow filmInfo={film} key={film.title} />);
    });

    return (
      <div className="MovieTable">
        <table>
          <thead>
            <tr>
              <th className="filmid">Film ID</th>
              <th className="titles">Title</th>
              <th className="description">Description</th>
              <th className="releaseyear">Release Year</th>
              <th className="length">Length</th>
              <th className="rating">Rating</th>
              <th className="genre">Genre</th>
              <th className="filmreview">Film Review</th>
              <th className="actor">Actors</th>
              <th className="review">Review</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class Post extends React.Component {
  state = {
    film_id: "",
    review_description: "",
  };

  onFilmIDChange = (e) => {
    this.setState({
      film_id: e.target.value,
    });
  };

  onReviewChange = (e) => {
    this.setState({
      review_description: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://54.236.39.207:8080/Home/AddFilmReview?film_id=" +
          this.state.film_id +
          "&review_description=" +
          this.state.review_description
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload(false);
  };

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
          <input
            placeholder="Film ID"
            value={this.state.film_id}
            onChange={this.onFilmIDChange}
            required
          />
          <br />
          <input
            placeholder="Leave a review"
            value={this.state.review_description}
            onChange={this.onReviewChange}
            required
          />
          <br />

          <button type="submit">Create Review</button>
        </form>
      </div>
    );
  }
}

class Update extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      film_review_id: "",
      review_description: "",
    };
  }

  onFilmIDChange = (e) => {
    this.setState({
      film_review_id: e.target.value,
    });
  };

  onReviewChange = (e) => {
    this.setState({
      review_description: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://54.236.39.207:8080/Home/UpdateReview/" +
          this.state.film_review_id +
          "?review_description=" +
          this.state.review_description
      )

      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload(false);
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="put">
        <form className="Put" onSubmit={this.handleSubmit}>
          <br />
          <input
            placeholder="Review ID"
            value={this.state.film_review_id}
            onChange={this.onFilmIDChange}
            required
          />
          <br />
          <input
            placeholder="Update your review"
            value={this.state.review_description}
            onChange={this.onReviewChange}
            required
          />
          <br />

          <button type="submit">Update Review</button>
        </form>
        <br />
      </div>
    );
  }
}

class Delete extends React.Component {
  state = {
    Review_ID: "",
  };

  handleChange = (event) => {
    this.setState({ Review_ID: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .delete(
        `http://54.236.39.207:8080/Home/DeleteReview/${this.state.Review_ID}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Review ID"
            value={this.state.Review_ID}
            onChange={this.handleChange}
            required
          />
          <br />
          <button type="submit">Delete Review</button>
        </form>
        <br />
      </div>
    );
  }
}

class FilmRow extends React.Component {
  render() {
    const filmData = this.props.filmInfo;

    return (
      <tr>
        <td>{filmData.film_id}</td>
        <td>{filmData.title}</td>
        <td>{filmData.description}</td>
        <td>{filmData.release_year}</td>
        <td>{filmData.length}</td>
        <td>{filmData.rating}</td>
        <td>
          {filmData.category.map((filmCategory) => (
            <div> {filmCategory.name}</div>
          ))}
        </td>
        <td>
          {filmData.filmReview.map((filmReview) => (
            <div class="reviews">
              Review ID: {filmReview.film_review_id} <br />
              {filmReview.review_description}
            </div>
          ))}
        </td>
        <td>
          {filmData.actor.map((filmActor) => (
            <div> {filmActor.first_name + " " + filmActor.last_name}</div>
          ))}
        </td>
        <td>
          <Post />
          <Update />
          <Delete />
        </td>
      </tr>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <form className="searchBar">
        <input
          type="text"
          placeholder="Search Film...."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          Choose Genre:{""}
          <select name="category" id="category">
            <option value="">Action</option>
            <option value="">Animation</option>
            <option value="">Children</option>
            <option value="">Classics</option>
            <option value="">Comedy</option>
            <option value="">Documentary</option>
            <option value="">Drama</option>
            <option value="">Family</option>
            <option value="">Foreign</option>
            <option value="">Games</option>
            <option value="">Horror</option>
            <option value="">Music</option>
            <option value="">New</option>
            <option value="">Sci-Fi</option>
            <option value="">Sports</option>
            <option value="">Travel</option>
          </select>
        </p>
      </form>
    );
  }
}

class MainTitle extends React.Component {
  render() {
    return <h1 className="title">IMDC MOVIES</h1>;
  }
}

class FilterableFilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  render() {
    return (
      <div className="filmMain">
        <MainTitle />{" "}
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <FilmTable
          films={this.props.films}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

ReactDOM.render(<FilterableFilmTable />, document.getElementById("root"));
