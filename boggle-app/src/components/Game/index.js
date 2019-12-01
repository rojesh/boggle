import React, { Component } from 'react';
import {
  shuffleBoard,
  copyBoard,
  isTileEqual,
  isAdjacent,
  calculateScore
} from '../../util/gameUtil';
import Board from '../Board';
import ScoreBox from '../ScoreBox';
import Timer from '../Timer';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.initBoard = shuffleBoard();
    this.state = {
      disabled: false,
      seconds: 0,
      minutes: 1,
      board: this.initBoard,
      currentWord: '',
      currentWordPosition: [],
      wordScoreList: {}
    };
  }

  handleClick(rowId, columnId) {
    const selectedTile = this.state.board[rowId][columnId];
    const lastSelectedTile = this.state.currentWordPosition[
      this.state.currentWordPosition.length - 1
    ];
    if (selectedTile.selected) {
      if (isTileEqual(selectedTile, lastSelectedTile)) {
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = false;
        this.setState({
          currentWord: this.state.currentWord.slice(0, -1),
          board: newBoard,
          currentWordPosition: this.state.currentWordPosition.slice(0, -1)
        });
      }
    } else {
      if (!lastSelectedTile || isAdjacent(selectedTile, lastSelectedTile)) {
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = true;
        this.setState({
          currentWord: this.state.currentWord.concat(
            newBoard[rowId][columnId].letter
          ),
          board: newBoard,
          currentWordPosition: this.state.currentWordPosition.concat({
            rowId: rowId,
            columnId: columnId
          })
        });
      }
    }
  }

  appendChar = async (e) => {
    const board = this.state.board
    board.map((row, _) => {
      row.map(tile => {
        if(tile.letter === e.key && tile.selected === false) {
          this.handleClick(tile.rowId, tile.columnId)
        }
      })
    })
    if (e.key === 'Enter') {
      const word = e.target.value
      if (word.length < 3 || this.state.wordScoreList[word]) {
        return;
      }
      const score = await calculateScore(word);

      const clearedBoard = this.initBoard;

      this.setState({
        wordScoreList: { ...this.state.wordScoreList, [word]: score },
        currentWord: '',
        currentWordPosition: [],
        board: clearedBoard
      });
    }
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
        const { seconds, minutes } = this.state

        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
            if (minutes === 0) {
                this.setState({disabled: true})
                clearInterval(this.myInterval)
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
        }
    }, 1000)
  }

  render() {
    return (
      <div>
        <div className="game-area">
          <div className="current-word">
            <input className="word-box" type="text"
                  placeholder="Type the word" maxLength="50"
                  disabled={this.state.disabled}
                  value={this.state.currentWord} onKeyPress={this.appendChar}
            />
          </div>
          <Board board={this.state.board} handleClick={this.handleClick} />
        </div>

        <Timer minutes={this.state.minutes} seconds={this.state.seconds}/>

        <ScoreBox
          wordScoreList={this.state.wordScoreList}
          totalScore={Object.values(
            this.state.wordScoreList
          ).reduce((totalScore, next) => {
            return totalScore + next;
          }, 0)}
        />


        <div className="clear" />

      </div>
    );
  }
}
