// import React from 'react'
import classes from './AsyncAutocomplete.scss'
import Autosuggest from 'react-autosuggest'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import debounce from 'lodash.debounce'
//import dropRight from 'lodash.dropRight'
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
            value: props.settings.userSearchText.get('searchText'),
            suggestions: [],
            isLoading: false,
            apiUrl:props.settings.apiUrl,
            changeGlobalState: props.settings.action
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
        this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 500);
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.settings.userSearchText.get('searchText')
        });
    }
    loadSuggestions(value) {
        let self = this;
        this.setState({
            isLoading: true
        });
        
        fetch(this.state.apiUrl +'?search='+value , { method: 'get' })
            .then(function(response) {
                return response.json();
            })
            .then(function(resolvedResponse) {
              if(resolvedResponse.length>5){
                const resultsToIgnore = resolvedResponse.length -3;
                //resolvedResponse = dropRight(resolvedResponse,resultsToIgnore);
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
        this.state.changeGlobalState(newValue); 
    }

    onSuggestionsUpdateRequested({ value, reason }) {
        if (value && value.length > 2) {
            this.getSuggestions(value, {
                debounce: reason === 'type'
            });
        }
    }

    render() {
        console.log("child render",this.state);
        const { value, suggestions, isLoading } = this.state;
        const inputProps = {
            placeholder: "Please enter zip code",
            value,
            onChange: this.onChange
        };
        const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

        return (
              <Autosuggest suggestions={suggestions}
                           onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                           getSuggestionValue={getSuggestionValue}
                           renderSuggestion={renderSuggestion}
                           inputProps={inputProps} />
        );
    }
}

export default AsyncAutocomplete
