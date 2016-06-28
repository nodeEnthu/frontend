import { connect } from 'react-redux'
import Chatbox from '../components/Chatbox/Chatbox'

function mapStateToProps(state) {
  return {
      chat:state.chat
  }
}

export default connect(mapStateToProps)(Chatbox)
