// import React from 'react'
import './AsyncAutocomplete.scss'
import Autosuggest from 'react-autosuggest'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import debounce from 'lodash/debounce'
import { getCall } from 'utils/httpUtils/apiCallWrapper';
import React from 'react';



/* --------------- */
/*    Component    */
/* --------------- */



function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.address}</span>
    );
}

class AsyncAutocomplete extends React.Component {
    constructor(props) {
        super();
        this.state = {
            suggestions:[],
        }
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
        this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 500);        
    }
    loadSuggestions(value) {
        let self = this;
        this.setState({
            isLoading: true
        });
        getCall(this.props.apiUrl, { searchText: value })
            .then(function(resolvedResponse) {
                let result = [];
                // greater than 5 take first 5
                if (resolvedResponse.data.addresses.length > 5) {
                    for (var i = 0; i < 4; i++) {
                        result.push(resolvedResponse.data.addresses[i]);
                    }
                } else { result = resolvedResponse.data.addresses; }

                self.setState({
                    isLoading: false,
                    suggestions: result
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
    onSuggestionsUpdateRequested({ value, reason }) {
        if (value && value.length > 2) {
            this.getSuggestions(value, {
                debounce: reason === 'type'
            });
        }
    }
    render() {
        const {suggestions} = this.state;
        const inputProps = {
            name:this.props.name,
            placeholder: "Your address",
            value:this.props.userSearchText || '',
            onChange: this.props.onChange,
            onFocus:this.props.onFocus || undefined,
            onBlur:this.props.onBlur || undefined
        };
        return (
            <Autosuggest suggestions={suggestions}
                         onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                         getSuggestionValue={this.props.getSuggestionValue}
                         renderSuggestion={renderSuggestion}
                         inputProps={inputProps}
                         onSuggestionSelected={this.props.onSuggestionSelected}
            />
        );
    }
}

export default AsyncAutocomplete
