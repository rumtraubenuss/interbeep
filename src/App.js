import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secsSelected: 10,
      secsCurrent: 10,
      running: false,
      timer: undefined,
    };
  }

  handleChangeSec = () => {
    this.changeTime(1);
  }

  handleChangeMin = () => {
    this.changeTime(60);
  }

  resetTime = () => {
    const { secsSelected } = this.state;
    if(this.state.running) {
      clearInterval(this.state.timer);
      this.setState({ timer: undefined, running: false });
    }
    this.setState({ secsCurrent: secsSelected });
  }

  handleTick = () => {
    const secsNew = this.state.secsCurrent - 1;
    if(secsNew === 0) {
      clearInterval(this.state.timer);
      this.setState({ timer: undefined, running: false });
    }
    this.setState({ secsCurrent: secsNew });
  }

  handleStartStop = () => {
    if(this.state.running) {
      clearInterval(this.state.timer);
      this.setState({ timer: undefined, running: false });
    } else {
      const timer = setInterval(this.handleTick, 1000);
      this.setState({ timer, running: true });
    }
  }

  changeTime(secs) {
    if(!this.state.running) {
      const secsNew = this.state.secsCurrent + secs;
      this.setState({ secsSelected: secsNew, secsCurrent: secsNew });
    }
  }

  handleSetTimeZero = () => {
    if(!this.state.running) {
      this.setState({ secsSelected: 0, secsCurrent: 0 });
    }
  }

  render() {
    const { secsCurrent, running, secsSelected } = this.state;
    const mins = Math.floor(secsCurrent/60);
    const minsDisplay = mins < 10 ? `0${mins}` : `${mins}`;
    const secs = secsCurrent % 60;
    const secsDisplay = secs < 10 ? `0${secs}` : `${secs}`;
    const buttonStartStopLabel = running ? 'Stop' : 'Start';
    const enableReset = running || secsCurrent !== secsSelected;
    return (
      <div className="App">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h2 className="text-center">{minsDisplay}:{secsDisplay}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ButtonGroup justified>
                <ButtonGroup>
                  <Button disabled={running} onClick={this.handleChangeMin}>+Min</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button disabled={running} onClick={this.handleChangeSec}>+Sec</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    disabled={secsSelected === 0 || secsCurrent === 0 || running}
                    onClick={this.handleSetTimeZero}
                  >00:00</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    disabled={!enableReset}
                    onClick={this.resetTime}
                  >Reset</Button>
                </ButtonGroup>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                onClick={this.handleStartStop}
                bsStyle="primary"
                bsSize="large"
                block
                disabled={secsSelected === 0 || secsCurrent === 0}
              >{buttonStartStopLabel}</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
