import React from 'react'
import { IndexLink, Link } from 'react-router'
import FileIcons from '../assets/file-icons.png'
import Autosuggest from 'react-autosuggest'
import AsyncAutocomplete from 'components/AsyncAutocomplete'

const HomeView = React.createClass({
    getInitialState() {
        return {
                userSearchChange: this.props.userZipSearchChange,
                apiUrl: "/api/city/",
                searchTextAlreadyInStore:this.props.userZipSearch.get('searchText')
        };
    },
    render() {
        return (
            <div>
				<div className="splash-container counter-fixed-menu">
					<div className="banner-wrapper">
						<div className="pure-g">
							<div className = "pure-u-1 pure-u-md-1-2">
							    <div className="splash ">
							        <h1 className="splash-head">
							        	Please enter a zip code to find food close to you.
							        </h1>
							        <AsyncAutocomplete settings={this.state}/>
							        <p className="is-center">
							        	<button className="pure-button pure-button-primary">Get Started</button>
							        </p>
							    </div>
						    </div>
						    <div className = "pure-u-1 pure-u-md-1-2">
							    <div className="splash">
							        <div className="splash-head">
							        	Advertise your food right away in 3 easy steps
							        </div>
							        <p className="is-center">
							        	<button className="pure-button pure-button-primary">Get Started</button>
							        </p>
							    </div>
						    </div>
						</div>
					</div>
				</div>
				<div className="content-wrapper">
				    <div className="content">
				        <h2 className="content-head is-center">Excepteur sint occaecat cupidatat.</h2>

				        <div className="pure-g">
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">

				                <h3 className="content-subhead">
				                    <i className="fa fa-rocket"></i>
				                    Get Started Quickly
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
				                <h3 className="content-subhead">
				                    <i className="fa fa-mobile"></i>
				                    Responsive Layouts
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
				                <h3 className="content-subhead">
				                    <i className="fa fa-th-large"></i>
				                    Modular
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
				                <h3 className="content-subhead">
				                    <i className="fa fa-check-square-o"></i>
				                    Plays Nice
				                </h3>
				                <p>
				                    Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.
				                </p>
				            </div>
				        </div>
				    </div>

				    <div className="ribbon l-box-lrg pure-g">
				        <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
				            <img className="pure-img-responsive" alt="File Icons" width="300" src={FileIcons}></img>
				        </div>
				        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">

				            <h2 className="content-head content-head-ribbon">Laboris nisi ut aliquip.</h2>

				            <p>
				                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				                consequat. Duis aute irure dolor.
				            </p>
				        </div>
				    </div>

				    <div className="content">
				        <h2 className="content-head is-center">Dolore magna aliqua. Uis aute irure.</h2>

				        <div className="pure-g">
				            <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
				                <form className="pure-form pure-form-stacked">
				                    <fieldset>

				                        <label for="name">Your Name</label>
				                        <input id="name" type="text" placeholder="Your Name"></input>


				                        <label for="email">Your Email</label>
				                        <input id="email" type="email" placeholder="Your Email"></input>

				                        <label for="password">Your Password</label>
				                        <input id="password" type="password" placeholder="Your Password"></input>

				                        <button type="submit" className="pure-button">Sign Up</button>
				                    </fieldset>
				                </form>
				            </div>

				            <div className="l-box-lrg pure-u-1 pure-u-md-3-5">
				                <h4>Contact Us</h4>
				                <p>
				                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				                    consequat.
				                </p>

				                <h4>More Information</h4>
				                <p>
				                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				                    tempor incididunt ut labore et dolore magna aliqua.
				                </p>
				            </div>
				        </div>

				    </div>

				    <div className="footer l-box is-center">
				        View the source of this layout to learn more. Made with love by the YUI Team.
				    </div>

				</div>
			</div>
        )
    }
})

HomeView.propTypes = {
    leftNavOpen: React.PropTypes.bool.isRequired,
    leftnavstatechange: React.PropTypes.func.isRequired,
    userZipSearchChange: React.PropTypes.func.isRequired,
    userZipSearch: React.PropTypes.object.isRequired
}

export default HomeView
