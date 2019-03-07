import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Transition, TransitionGroup } from 'react-transition-group'

const TRANSITION_TIME = 500

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`

const isIn = status => status === 'entered'

const EmotionWrapper = styled.div`
  position: relative;
  min-height: 4rem;
`

const Emotion = styled.h1`
  color: palevioletred;
  font-size: 3.5rem;
  transition: opacity ${TRANSITION_TIME}ms;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin: 0;

  ${({status}) => isIn(status) && css`
    opacity: 1;
  `}

  ${({status}) => !isIn(status) && css`
    opacity: 0.01;
  `}
`

const Info = styled.p`
  font-size: 1rem;
`

const emotions = [
  'Angry', 'Sad', 'Happy', 'Excited',
  'Pelican', 'Anxious', 'Nervous'
]

class Example extends Component {
  state = {
    index: 0
  }

  previous = () => {
    const { index } = this.state
    const potentialPrev = index - 1
    const realPrev = potentialPrev >= 0
      ? potentialPrev
      : emotions.length - 1
    if (realPrev !== index) {
      this.setState({
        index: realPrev
      })
    }
  }

  next = () => {
    const { index } = this.state
    const potentialNext = index + 1
    const realNext = potentialNext <= emotions.length - 1
      ? potentialNext
      : 0
    if (realNext !== index) {
      this.setState({
        index: realNext
      })
    }
  }

  listen = () => {
    document.addEventListener('keydown', this.handleKeydown)
  }

  unlisten = () => {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = e => {
    const LEFT = 37
    const RIGHT = 39
    const { keyCode } = e

    if (keyCode === LEFT) {
      this.previous()
    } else if (keyCode === RIGHT) {
      this.next()
    }
  }

  componentDidMount() {
    this.listen()
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render () {
    const { index } = this.state
    const emotion = emotions[index]
    const { previous, next } = this
    return (
      <Wrapper>
        <TransitionGroup component={EmotionWrapper}>
          <Transition key={emotion} timeout={TRANSITION_TIME}>
            {status => (
              <Emotion status={status}>{emotion} - {status}</Emotion>
            )}
          </Transition>
        </TransitionGroup>

        <Info>Use the arrows to navigate emotions</Info>
      </Wrapper>
    )
  }
}

export default Example
