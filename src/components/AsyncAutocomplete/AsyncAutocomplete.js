// import React from 'react'
import classes from './AsyncAutocomplete.scss'
import Autosuggest from 'react-autosuggest'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import _ from 'lodash'
import React from 'react'


/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
    return suggestion._id;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion._id}</span>
    );
}

class AsyncAutocomplete extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: '',
            suggestions: [],
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);

        this.debouncedLoadSuggestions = _.debounce(this.loadSuggestions, 500);
    }

    loadSuggestions(value) {
        let self = this;
        this.setState({
            isLoading: true
        });
        
        fetch('/api/city/' + value, { method: 'get' })
            .then(function(response) {
                return response.json();
            })
            .then(function(resolvedResponse) {
              if(resolvedResponse.length>5){
                const resultsToIgnore = resolvedResponse.length -5;
                resolvedResponse = _.dropRight(resolvedResponse,resultsToIgnore);
              }
              self.setState({
                  isLoading: false,
                  suggestions: resolvedResponse
              });
            })
            .catch(function(err) {

            });
    }

    getSuggestions(value, { debounce } = {}) {
        if (debounce === true) {
            this.debouncedLoadSuggestions(value);
        } else {
            this.loadSuggestions(value);
        }
    }

    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    }

    onSuggestionsUpdateRequested({ value, reason }) {
        if (value && value.length > 2) {
            this.getSuggestions(value, {
                debounce: reason === 'type'
            });
        }
    }

    render() {
        const { value, suggestions, isLoading } = this.state;
        const inputProps = {
            placeholder: "Please enter your zip code",
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

export default AsyncAutocomplete
