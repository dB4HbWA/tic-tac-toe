import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Square extends React.Component {
  render() {
    return (
		<button className="square"  id= {this.props.id} onClick= {this.props.clickSquare}>
			{this.props.squareState[this.props.id]}
		</button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square currentPlayer= {this.props.currentPlayer} squareState= {this.props.squareState} clickSquare= {this.props.clickSquare} id= {i}/>;
  }

  render() {
    return (
      <div>
        <div className="status">{this.props.status + this.props.currentPlayer}</div>
        <input type="checkbox" onChange={this.props.playComputer}/>Play against the computer
        <br />
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <br />
        <button onClick= {this.props.reset}>Reset</button>
      </div>
    );
  }
}

class Game extends React.Component {
  
	constructor (props) {
		super(props); 
		this.state = {
			currentPlayer: "X",
			status: "Welcome to the game! Next player: ", 
			squareState: [null, null, null, null, null, null, null, null, null],
			computer: false
		}

		this.clickSquare = this.clickSquare.bind(this);
		this.calculateWinner = this.calculateWinner.bind(this);
		this.reset = this.reset.bind(this);
		this.playComputer = this.playComputer.bind(this);
		this.computerClick = this.computerClick.bind(this);
		this.updateState = this.updateState.bind(this);
		this.calculateTie = this.calculateTie.bind(this);

	}

  clickSquare (event) {

  	// only execute this function if square is empty and no winner
  	if (!this.state.squareState[event.target.id] && !this.calculateWinner()) {
  		// update squareState, currentPlayer and status
	  	this.updateState(event.target.id);
  	}

  }

  computerClick() {

  	// map here??
  	let newArr = [];

  	for (let i =0; i < this.state.squareState.length; i++){
  		if (!this.state.squareState[i]){
  			newArr.push(i);
  		}
  	}

  	let position = Math.floor(Math.random() * newArr.length);
  	let id = newArr[position];

  	// update squareState, currentPlayer and status
  	this.updateState(id);

  }

  updateState(id) {

  	let tempArr = this.state.squareState;

  	tempArr[id] = this.state.currentPlayer;

  	this.setState({squareState: tempArr});

  	this.setState({status: 'Next player: '});

  	// call the winner calculation to determine if the click is a win
  	if(!this.calculateWinner()){
  		// if not a win, check for a tie
  		if (this.calculateTie()) {
	  		this.setState({status: 'There was a tie!'});
  			this.setState({currentPlayer: ''});
  			return;
  		}
	  	// if neither tie or win, swap player X to Player O and update state
	  	if (this.state.currentPlayer === 'X'){
	  		this.setState({currentPlayer: 'O'}, function () {
		  		// check if playing against computer
		  		if (this.state.computer){
	  				setTimeout(this.computerClick, 1500);
	  			}
    		});
	  	} else {
	  		this.setState({currentPlayer: 'X'});
	  	}
  	}
  }

  calculateWinner(){
  	let squares = this.state.squareState
  	if(squares[0] && squares[0] === squares[1] && squares[1] === squares[2]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[0]});
  		return true;
  	}
	if(squares[3] && squares[3] === squares[4] && squares[4] === squares[5]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[3]});
  		return true;
  	}
	if(squares[6] && squares[6] === squares[7] && squares[7] === squares[8]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[6]});
  		return true;
  	}
	if(squares[0] && squares[0] === squares[3] && squares[3] === squares[6]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[0]});
  		return true;
  	}
	if(squares[1] && squares[1] === squares[4] && squares[4] === squares[7]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[1]});
  		return true;
  	}
	if(squares[2] && squares[2] === squares[5] && squares[5] === squares[8]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[2]});
  		return true;
  	}
	if(squares[0] && squares[0] === squares[4] && squares[4] === squares[8]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[0]});
  		return true;
  	}
	if(squares[2] && squares[2] === squares[4] && squares[4] === squares[6]){
  		this.setState({status: 'Winner = ', currentPlayer:squares[2]});
  		return true;
  	}
  	return false;
  }

  calculateTie(){
  	for (let i = 0; i < this.state.squareState.length; i++){
  		if(!this.state.squareState[i]) {
  			// return false if any square has a value of null
  			return false;
  		}
  	}
	return true;
  }

  reset() {
  	this.setState({status: 'Welcome to the game! Next player: '});
  	this.setState({currentPlayer: 'X'});
  	this.setState({squareState: [null, null, null, null, null, null, null, null, null]});
  }

  playComputer() {
  	if (this.state.computer){
  		this.setState({computer: false});
  	} else {
  		this.setState({computer: true});
  	}	
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board currentPlayer= {this.state.currentPlayer} squareState= {this.state.squareState} clickSquare= {this.clickSquare} 
          status= {this.state.status} reset= {this.reset} playComputer={this.playComputer}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
