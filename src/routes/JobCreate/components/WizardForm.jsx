import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'
import WizardFormFourthPage from './WizardFormFourthPage'
import WizardFormFifthPage from './WizardFormFifthPage'
import LinearProgress from 'material-ui/LinearProgress';
import './wizardForm.scss'
class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div className="job-post-container">
        <h1>Your food requirement</h1>
        <div className="progress-wrapper">
          <LinearProgress mode="determinate" value={(page) * 20} />
        </div>
        {page === 1 && 
          <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 &&
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {page === 3 &&
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {page === 4 &&
          <WizardFormFourthPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {page === 5 &&
          <WizardFormFifthPage
            previousPage={this.previousPage}
            onSubmit={this.props.onSubmit}
          />}
      </div>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm