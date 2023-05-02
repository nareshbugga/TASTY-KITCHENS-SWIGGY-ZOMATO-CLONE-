/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'

import './index.css'

class Counter extends Component {
  onIncrementQ = () => {
    const {onIncrement} = this.props
    onIncrement()
  }

  onDecrementQ = () => {
    const {onDecrement} = this.props
    onDecrement()
  }

  render() {
    const {
      quantity,
      activeTestId,
      incrementTestId,
      decrementTestId,
    } = this.props

    return (
      <div className="button-container">
        <button
          type="button"
          onClick={this.onDecrementQ}
          className="button"
          testid={decrementTestId}
        >
          <AiOutlineMinusSquare className="button-icon" color="#3E4C59" />
        </button>
        <div className="quantity" testid={activeTestId}>
          {quantity}
        </div>
        <button
          type="button"
          onClick={this.onIncrementQ}
          className="button"
          testid={incrementTestId}
        >
          <AiOutlinePlusSquare className="button-icon" color="#3E4C59" />
        </button>
      </div>
    )
  }
}

export default Counter
