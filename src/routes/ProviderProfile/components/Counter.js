import React from 'react'
import classes from './Counter.scss'
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
import {Tab, Tabs} from 'react-toolbox';
import { CardStack, Card } from 'react-cardstack';

export default class Counter extends React.Component {
        constructor(props) {
            super(props);
        }
        state = {
          index: 1
        }
        handleTabChange = (index) => {
          this.setState({index});
        };

        handleActive = () => {
          console.log('Special one activated');
        };

        render() {
              return (
                <div id="layout" className="pure-g">
                  <div className={classNames(classes["sidebar"], "pure-u-1","pure-u-md-1-4")}>
                    <div className={classes["header"]}>
                        <h1 className={classes["brand-title"]}>Chilli Corner</h1>
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
                                    Having cooked delicious food for my family and friends over years. Now giving 
                                    myself a chance of presenting my skills to broader masses.
                                </li>
                            </ul>
                        </nav>
                    </div>
                  </div>
                  <div className = { classNames(classes["content"], "pure-u-1", "pure-u-md-3-4")}>
                     <Tabs index={this.state.index} onChange={this.handleTabChange}>
                        <Tab label='Primary'>
                          <div>
                            <div className={classes["posts"]}>
                                <h1 className={classes["content-subhead"]}>One Timers</h1>
                                <section className={classes["post"]}>
                                  <div className={classes["post-avatar"]}>
                                    <img alt="Tilo Mitra&#x27;s avatar" height="200"  src={ItalianFood}/>
                                    <RaisedButton
                                      labelPosition="before"
                                      label="Checkout" secondary={true}
                                      style={{display:"block"}}
                                    >
                                    </RaisedButton>
                                  </div>
                                  <div>
                                    <header className={classes["post-header"]}>
                                      <h2 className={classes["post-title"]}>Parmesan Pasta</h2>
                                      {/*<p className={classes["post-meta"]}>
                                          By <a href="#" className={classes["post-author"]}>Tilo Mitra</a> under <a className={classNames(classes["post-category",classes["post-category-design"]])} href="#">CSS</a> 
                                      </p>*/}
                                    </header>

                                    <div className={classes["post-description"]}>
                                        <p>
                                            Freshly prepared with organic ingredients
                                            and farm fresh chicken. This dish will make your mouth water
                                            and crave for more. The pasta was bought from costco (pinnochios organic pasta)
                                            and fresh organic vegetables were stir fried in olive oil just enough for them to retain their
                                            nutrient value.
                                        </p>
                                        <table className={classNames("pure-table",classes["remove-border"])}>
                                          <tbody>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                                                  <td>order by</td>
                                                  <td>June 20th, Mon</td>                           
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                  <td>ready on</td>
                                                  <td>June 21st, Tue</td>
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                  <td>pick-up</td>
                                                  <td> June 21st, 3PM - 6PM</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                    </div>
                                  </div>

                                </section>
                            </div>
                            <div className={classes["posts"]}>
                                <h1 className={classes["content-subhead"]}>Recurring</h1>
                                <section className={classes["post"]}>
                                  <div className={classes["post-avatar"]}>
                                    <img alt="Tilo Mitra&#x27;s avatar" height="200"  src={ItalianFood}/>
                                    <RaisedButton
                                      label="Checkout"
                                      labelPosition="before"
                                      style={{display:"block"}}
                                    >
                                    </RaisedButton>
                                  </div>
                                  <div >
                                    <header className={classes["post-header"]}>
                                      <h2 className={classes["post-title"]}>Parmesan Pasta</h2>

                                      {/*<p className={classes["post-meta"]}>
                                          By <a href="#" className={classes["post-author"]}>Tilo Mitra</a> under <a className={classNames(classes["post-category",classes["post-category-design"]])} href="#">CSS</a> 
                                      </p>*/}
                                    </header>

                                    <div className={classes["post-description"]}>
                                        <p>
                                            Freshly prepared with organic ingredients
                                            and farm fresh chicken. This dish will make your mouth water
                                            and crave for more. The pasta was bought from costco (pinnochios organic pasta)
                                            and fresh organic vegetables were stir fried in olive oil just enough for them to retain their
                                            nutrient value.
                                        </p>
                                        <table className={classNames("pure-table",classes["remove-border"])}>
                                          <tbody>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                                                  <td>order by</td>
                                                  <td>June 20th, Mon</td>                           
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                  <td>ready on</td>
                                                  <td>June 21st, Tue</td>
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                  <td>pick-up</td>
                                                  <td> June 21st, 3PM - 6PM</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </section>

                                <section className={classes["post"]}>
                                  <div className={classes["post-avatar"]}>
                                    <img alt="Tilo Mitra&#x27;s avatar" height="200"  src={ItalianFood}/>
                                    <RaisedButton
                                      label="Checkout"
                                      labelPosition="before"
                                      style={{display:"block"}}
                                    >
                                    </RaisedButton>
                                  </div>
                                  <div >
                                    <header className={classes["post-header"]}>
                                      <h2 className={classes["post-title"]}>Parmesan Pasta</h2>

                                      {/*<p className={classes["post-meta"]}>
                                          By <a href="#" className={classes["post-author"]}>Tilo Mitra</a> under <a className={classNames(classes["post-category",classes["post-category-design"]])} href="#">CSS</a> 
                                      </p>*/}
                                    </header>

                                    <div className={classes["post-description"]}>
                                        <p>
                                            Freshly prepared with organic ingredients
                                            and farm fresh chicken. This dish will make your mouth water
                                            and crave for more. The pasta was bought from costco (pinnochios organic pasta)
                                            and fresh organic vegetables were stir fried in olive oil just enough for them to retain their
                                            nutrient value.
                                        </p>
                                        <table className={classNames("pure-table",classes["remove-border"])}>
                                          <tbody>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                                                  <td>order by</td>
                                                  <td>June 20th, Mon</td>                           
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                  <td>ready on</td>
                                                  <td>June 21st, Tue</td>
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                  <td>pick-up</td>
                                                  <td> June 21st, 3PM - 6PM</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                    </div>
                                  </div>

                                </section>

                                <section className={classes["post"]}>
                                  <div className={classes["post-avatar"]}>
                                    <img alt="Tilo Mitra&#x27;s avatar" height="200"  src={ItalianFood}/>
                                    <RaisedButton
                                      label="Checkout"
                                      labelPosition="before"
                                      style={{display:"block"}}
                                    >
                                    </RaisedButton>
                                  </div>
                                  <div >
                                    <header className={classes["post-header"]}>
                                      <h2 className={classes["post-title"]}>Parmesan Pasta</h2>

                                      {/*<p className={classes["post-meta"]}>
                                          By <a href="#" className={classes["post-author"]}>Tilo Mitra</a> under <a className={classNames(classes["post-category",classes["post-category-design"]])} href="#">CSS</a> 
                                      </p>*/}
                                    </header>

                                    <div className={classes["post-description"]}>
                                        <p>
                                            Freshly prepared with organic ingredients
                                            and farm fresh chicken. This dish will make your mouth water
                                            and crave for more. The pasta was bought from costco (pinnochios organic pasta)
                                            and fresh organic vegetables were stir fried in olive oil just enough for them to retain their
                                            nutrient value.
                                        </p>
                                        <table className={classNames("pure-table",classes["remove-border"])}>
                                          <tbody>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                                                  <td>order by</td>
                                                  <td>June 20th, Mon</td>                           
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                                                  <td>ready on</td>
                                                  <td>June 21st, Tue</td>
                                              </tr>
                                              <tr>
                                                  <td className={classes["reduce-padding"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                                                  <td>pick-up</td>
                                                  <td> June 21st, 3PM - 6PM</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                    </div>
                                  </div>

                                </section>
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
                        </Tab>
                        <Tab label='Secondary' onActive={this.handleActive}>
                          <CardStack
                              height={"auto"}
                              width={"100%"}
                              background='#f8f8f8'
                              hoverOffset={5}>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#2980B9'>
                                <div className={classes["chat"]}>
                                  <div className={classNames(classes["chat-header"], classes["clearfix"])} >
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                                    
                                    <div className={classes["chat-about"]}>
                                      <div className={classes["chat-with"]}>Chat with Vincent Porter</div>
                                      <div className={classes["chat-num-messages"]}>already 1 902 messages</div>
                                    </div>
                                    <i className={classNames(classes["fa"], classes["fa-star"])} ></i>
                                  </div> 
                                  
                                  <div className={classes["chat-history"]}>
                                    <ul>
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["falign-right"])} >
                                          <span className={classes["message-data-time"]}>10:10 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className="fa fa-circle me"></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                          <span className={classes["message-data-time"]}>10:12 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                      </li>
                                      
                                      <li className={classes["clearfix"]}>
                                        <div className={classNames(classes["message-data"], classes["align-right"])} >
                                          <span className={classes["message-data-time"]}>10:14 AM, Today</span> &nbsp; &nbsp;
                                          <span className={classes["message-data-name"]}>Olia</span> <i className={classNames(classes["fa"],classes["fa-circle"],classes["me"])}></i>
                                          
                                        </div>
                                        <div className={classNames(classes["message"], classes["other-message"],classes["float-right"])}>
                                          Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                           <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:20 AM, Today</span>
                                        </div>
                                        <div className={classNames(classes["message"], classes["my-message"])}>
                                          Actually everything was fine. I am very excited to show this to our team.
                                        </div>
                                      </li>
                                      
                                      <li>
                                        <div className={classes["message-data"]}>
                                          <span className={classes["message-data-name"]}><i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i> Vincent</span>
                                           <span className={classes["message-data-time"]}>10:31 AM, Today</span>
                                        </div>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])}></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                        <i className={classNames(classes["fa"],classes["fa-circle"],classes["online"])} ></i>
                                      </li>
                                      
                                    </ul>
                                    
                                  </div>
                                  
                                  <div className="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                                            
                                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o"></i>
                                    
                                    <button>Send</button>

                                  </div>
                                  
                                </div>
                              </Card>
                              <Card background='#27AE60'>
                                  <h1>Number 2</h1>
                              </Card>

                          </CardStack>
                        </Tab>
                        <Tab label='Third' disabled><small>Disabled content</small></Tab>
                        <Tab label='Fourth' hidden><small>Fourth content hidden</small></Tab>
                        <Tab label='Fifth'><small>Fifth content</small></Tab>
                      </Tabs>

                  </div> 
                </div>
        );
    }
};

Counter.propTypes = {
    counter: React.PropTypes.object.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
}
export default Counter
