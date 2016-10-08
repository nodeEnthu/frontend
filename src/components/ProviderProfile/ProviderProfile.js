import React from 'react'
import classes from './providerProfile.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import StaffImg from './img/common/staff-thumb-placeholder-male.jpg'
import ItalianFood from './img/common/italian.jpg'
import StarRatingComponent from 'react-star-rating-component';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

const ProviderProfile = React.createClass({
  componentDidMount() {
      this.props.fetchMayBeSecuredData('/api/users/me','providerProfileCall','PROVIDER');
  },
  render() {
    console.log("rerender");
    let {providerProfileCall} = this.props.providerProfile.toJS();
    let data = providerProfileCall.data;
    return (data)?
        <div id="layout" className="pure-g">
          <div className={classNames(classes["sidebar"], "pure-u-1","pure-u-md-1-4")}>
            <div className={classes["header"]}>
                <h1 className={classes["brand-title"]}>{data.title}</h1>
                <div className="pure-u-1">
                  <img className = {classes["profile-img"]}src={StaffImg}/>
                </div>
               <div className = "pure-u-1" style={{marginBottom:'-20px'}}>
                  <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    renderStarIcon={() => <span>&#11088;</span>}
                    starCount={5}
                    value={4}
                  />
                </div>
                <IconButton><CommunicationEmail/></IconButton>
                <IconButton><CommunicationCall/></IconButton>
                <IconButton><CommunicationChat/></IconButton>
                <nav className={classes["nav"]}>
                    <ul className={classes["nav-list"]}>
                        <li className={classes["nav-item"]}>
                            {data.description}
                        </li>
                    </ul>
                </nav>
            </div>
          </div>
          <div className = { classNames(classes["content"], "pure-u-1", "pure-u-md-3-4")}>
            <div>
              <div className={classes["posts"]}>
                  <h1 className={classes["content-subhead"]}>Menu Items</h1>
                  { 
                    data.foodItems.map((foodItem)=>{
                      return <div> 
                                <section className={classes["post"]}>
                                  <div className={classes["post-avatar"]}>
                                    <img alt="Tilo Mitra&#x27;s avatar" height="200"  src={foodItem.img}/>
                                    <RaisedButton
                                      labelPosition="before"
                                      label="Checkout" secondary={true}
                                      style={{display:"block"}}
                                    >
                                    </RaisedButton>
                                  </div>
                                  <div>
                                    <header className={classes["post-header"]}>
                                      <h2 className={classes["post-title"]}>{foodItem.name}</h2>
                                      {/*<p className={classes["post-meta"]}>
                                          By <a href="#" className={classes["post-author"]}>Tilo Mitra</a> under <a className={classNames(classes["post-category",classes["post-category-design"]])} href="#">CSS</a> 
                                      </p>*/}
                                    </header>
                                    <div className={classes["post-description"]}>
                                        <p>{foodItem.description}</p>
                                        <table className={classNames("pure-table",classes["remove-border"])}>
                                          <tbody>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                                                  <td>order by</td>
                                                  <td>{foodItem.placeOrderBy}</td>                           
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                  <td>ready on</td>
                                                  <td>{foodItem.serviceDate}</td>
                                              </tr>

                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                  <td>pick-up</td>
                                                  <td>3PM - 6PM</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </section>  
                              </div>
                  })
                }

              </div>
              <div className={classes["footer"]}>
                  <div className="pure-menu pure-menu-horizontal">
                      <ul>
                          <li className="pure-menu-item"><a href="http://purecss.io/" className="pure-menu-link">About</a></li>
                          <li className="pure-menu-item"><a href="http://twitter.com/yuilibrary/" className="pure-menu-link">Twitter</a></li>
                          <li className="pure-menu-item"><a href="http://github.com/yahoo/pure/" className="pure-menu-link">GitHub</a></li>
                      </ul>
                  </div>
              </div>
            </div> 
          </div> 
        </div>
        :
        <div></div>
    }
});

export default ProviderProfile
