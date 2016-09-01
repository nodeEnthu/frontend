// import React from 'react'
import classes from './AsyncAutocomplete.scss'
import Autosuggest from 'react-autosuggest'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import debounce from 'lodash.debounce'
import {getCall} from 'utils/httpUtils/apiCallWrapper';
import React from 'react'


/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
    return suggestion;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion}</span>
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
        getCall(this.state.apiUrl,{searchText:value})
            .then(function(resolvedResponse) {
                let result = [];
                // greater than 5 take first 5
                if(resolvedResponse.data.addresses.length>5){
                    for(var i=0; i<4; i++ ){
                        result.push(resolvedResponse.data.addresses[i]);
                    }
                }else result = resolvedResponse.data.addresses;
                
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
