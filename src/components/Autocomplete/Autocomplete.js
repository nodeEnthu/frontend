import React from 'react'
import classes from './Autocomplete.scss'
import Autosuggest from 'react-autosuggest'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';


const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

function getMatchingLanguages(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }
  
  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function randomDelay() {
  return 300 + Math.random() * 1000;
}

/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class Autocomplete extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getMatchingLanguages(''),
      isLoading: false
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }
  
  loadSuggestions(value) {
    this.setState({
      isLoading: true
    });
    
    // Fake an AJAX call
    setTimeout(() => {
      const suggestions = getMatchingLanguages(value);

      if (value === this.state.value) {
        this.setState({
          isLoading: false,
          suggestions
        });
      } else { // Ignore suggestions if input value changed
        this.setState({
          isLoading: false
        });
      }
    }, randomDelay());
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }
  
  onSuggestionSelected(event, { suggestionValue }) {
    this.loadSuggestions(suggestionValue);
  }
  
  onSuggestionsUpdateRequested({ value }) {
    this.loadSuggestions(value);
  }

  render() {
    const { value, suggestions, isLoading } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };
    const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

    return (
      <div className="app-container">
        <Autosuggest suggestions={suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  counter: React.PropTypes.object.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}
export default Autocomplete
