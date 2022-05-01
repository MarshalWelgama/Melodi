// server.autosuggest.js
import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import * as _ from "lodash";
import "./Main.css";
class SearchBar extends Component {
  constructor() {
    super();

    //Define state for value and suggestion collection
    this.state = {
      value: "",
      suggestions: [],
    };
  }
  componentWillMount() {
    this.onSuggestionsFetchRequested = _.debounce(
      this.onSuggestionsFetchRequested,
      300
    );
  }

  // Filter logic
  getSuggestions = async (value) => {
    const spotifyApi = this.props.spotify;
    let tracks = [];
    let results = await spotifyApi.searchTracks(value);

    let searchResults = results.body.tracks.items;
    if (searchResults.length > 0) {
      for (var i = 0; i < searchResults.length; i++) {
        try {
          let track = {
            songId: searchResults[i].id,
            name: searchResults[i].name,
            artist: searchResults[i].artists.map((artist) => artist.name),
            albumName: searchResults[i].album.name,
            image: searchResults[i].album.images[0].url,
            previewURL: searchResults[i].preview_url,
          };
          tracks.push(track);
        } catch (err) {
          continue;
        }
      }
      return tracks;
    } else {
      console.log("No search results found");
    }
  };

  // Trigger suggestions
  getSuggestionValue = (suggestion) => suggestion.name;

  // Render Each Option
  renderSuggestion = (suggestion) => (
    <span className="sugg-option">
      <span className="icon-wrap">
        <img src={suggestion.image} />
      </span>
      <span className="name">
        {suggestion.name + " | "}
        <a>{suggestion.artist.join(", ")}</a>
      </span>
    </span>
  );

  // OnChange event handler
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Suggestion rerender when user types
  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value).then((data) => {
      if (data.Error) {
        this.setState({
          suggestions: [],
        });
      } else {
        this.setState({
          suggestions: data,
        });
      }
    });
  };

  // Triggered on clear
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, index, method }
  ) => {
    event.preventDefault();
    const songUrl = `http://localhost:3000/songs/${suggestion.songId}`;
    console.log("ping... ", suggestion);
    window.location.replace(songUrl);
  };

  render() {
    const { value, suggestions } = this.state;

    // Option props
    const inputProps = {
      placeholder: "Search For Song",
      value,
      onChange: this.onChange,
    };

    // Adding AutoSuggest component
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
      />
    );
  }
}

export default SearchBar;
