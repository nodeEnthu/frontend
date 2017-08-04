import { connect } from 'react-redux'
import Chatbox from '../components/Chatbox/Chatbox'

const mapStateToProps = (state) => ({
    chat:state.chat,
    globalState:state
})

export default connect(mapStateToProps)(Chatbox)
