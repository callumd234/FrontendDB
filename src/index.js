import React from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";

// class FilmCategoryRow extends React.Component {
//   render() {
//     const category = this.props.category;
//     return <tr>{}</tr>;
//   }
// }

class FilmRow extends React.Component {
  render() {
    const filmData = this.props.filmInfo;

    return (
      <tr>
        <td>{filmData.title}</td>
        <td>{filmData.description}</td>
        {/* <td>{filmData.category}</td> */}
        <td>{filmData.release_year}</td>
        <td>{filmData.length}</td>
        <td>{filmData.rating}</td>
        <td>
          {filmData.filmReview.map((filmReview) => (
            <div> {filmReview.film_review}</div>
          ))}
        </td>
        <td>{filmData.film_id}</td>
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
      .get("http://localhost:8080/Home/AllFilms")
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
      rows.push(<FilmRow filmInfo={film} key={film.title} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Release Year</th>
            <th>Length</th>
            <th>Rating</th>
            <th>Film ID</th>
            <th>Film Review</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
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
      <div>
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
      <form>
        <input
          type="text"
          placeholder="Search Film...."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}

// const FILMS = [
//   {
//     title: "Batman",
//     category: "Action",
//     description: "Batman loses his parents and turns into a superhero",
//     release_year: "2014",
//     length: "120",
//     rating: "PG-13",
//     language_id: "1",
//   },
//   {
//     title: "Superman",
//     category: "Action",
//     description: "Superman loses his parents and turns into a superhero",
//     release_year: "2016",
//     length: "100",
//     rating: "PG-13",
//     language_id: "1",
//   },
//   {
//     title: "Spiderman",
//     category: "Comedy",
//     description: "Spiderman loses his parents and turns into a superhero",
//     release_year: "2018",
//     length: "90",
//     rating: "PG-13",
//     language_id: "1",
//   },
//   {
//     title: "Bugman",
//     category: "RomCom",
//     description: "Bugman loses his bugs and turns into a superhero",
//     release_year: "2018",
//     length: "130",
//     rating: "PG-13",
//     language_id: "1",
//   },
//   {
//     title: "Boltman",
//     category: "RomCom",
//     description: "Boltman loses his bolts and turns into a superhero",
//     release_year: "2020",
//     length: "150",
//     rating: "PG-13",
//     language_id: "1",
//   },
//   {
//     title: "Antman",
//     category: "Horror",
//     description: "Antman loses his ants and turns into a superhero",
//     release_year: "2013",
//     length: "99",
//     //rating: "PG-13",
//     ///language_id: "1",
//   ///},
// //];

ReactDOM.render(<FilterableFilmTable />, document.getElementById("root"));
