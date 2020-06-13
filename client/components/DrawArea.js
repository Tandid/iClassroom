import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'

class DrawArea extends React.Component {
  constructor() {
    super()

    this.state = {
      lines: new Immutable.List(),
      isDrawing: false
    }
    this.myRef = React.createRef()
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) {
      return
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent)

    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true
    }))
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent)

    this.setState(prevState => ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line =>
        line.push(point)
      )
    }))
  }

  handleMouseUp() {
    this.setState({isDrawing: false})
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.myRef.current.getBoundingClientRect()
    //  console.log(boundingRect)

    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
    })
  }

  render() {
    console.log('In drawarea', this.state.lines)
    return (
      <div
        className="drawArea"
        ref={this.myRef}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <div />
        <Drawing lines={this.state.lines} />
      </div>
    )
  }
}

function Drawing({lines}) {
  return (
    <svg className="drawing">
      {lines.map((line, idx) => <DrawingLine key={idx} line={line} />)}
    </svg>
  )
}

function DrawingLine({line}) {
  const pathData =
    'M ' +
    line
      .map(p => {
        return `${p.get('x')} ${p.get('y')}`
      })
      .join(' L ')

  return <path className="path" d={pathData} />
}

ReactDOM.render(<DrawArea />, document.getElementById('app'))

export default DrawArea