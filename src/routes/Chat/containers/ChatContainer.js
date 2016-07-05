import { connect } from 'react-redux'
import Chatbox from '../components/Chatbox/Chatbox'

const mapStateToProps = (state) => ({
    chat:state.chat
})

export default connect(mapStateToProps)(Chatbox)
