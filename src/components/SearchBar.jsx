// server.autosuggest.js
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios'
import * as _ from 'lodash';
import './Main.css'
class SearchBar extends Component {
  constructor() {
    super();

    //Define state for value and suggestion collection
    this.state = {
        value: '',
        suggestions: []
    };
}
componentWillMount() {
    this.onSuggestionsFetchRequested = _.debounce(
      this.onSuggestionsFetchRequested,300
    )
  }

// Filter logic
getSuggestions = async (value) => {
  let results = await axios.get(`http://localhost:8888/api/songs/search/${value}`);
  console.log(results.data)
  return results.data
};

// Trigger suggestions
getSuggestionValue = suggestion => suggestion.name;

// Render Each Option
renderSuggestion = suggestion => (
    <span className="sugg-option">
        <span className="icon-wrap"><img src={suggestion.image} /></span>
        <span className="name">
            {suggestion.name + " | "}
            <a>{suggestion.artist.join(', ')}</a>
        </span>
      
    </span>
);

// OnChange event handler
onChange = (event, { newValue }) => {
    this.setState({
        value: newValue
    });
};

// Suggestion rerender when user types
onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value)
        .then(data => {
            if (data.Error) {
                this.setState({
                    suggestions: []
                });
            } else {
                this.setState({
                    suggestions: data
                });
            }
        })
};

// Triggered on clear
onSuggestionsClearRequested = () => {
    this.setState({
        suggestions: []
    });
};
onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
    event.preventDefault();
    const songUrl = `http://localhost:3000/songs/${suggestion.songId}`
    console.log('ping... ', suggestion)
    window.location.replace(songUrl)
}

render() {
    const { value, suggestions } = this.state;

    // Option props
    const inputProps = {
        placeholder: 'Search For Song',
        value,
        onChange: this.onChange
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