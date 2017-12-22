import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Body} from '../components/Body';
import axios from 'axios';

export class Main extends Component {

    constructor() {
        super();
        this.state = {
            wordData: {},
            word: '',
            definitions:[],
            guessedWords: []
        };
        this.handleNewWordClick = this.handleNewWordClick.bind(this);
        this.handleGuessKeyDown = this.handleGuessKeyDown.bind(this);
    }


    handleNewWordClick() {
        const headers = {
            'X-Mashape-Key' : 'D418RnmwCcmshvZTnAwHPVrp115Tp1QCGPjjsnHVYuXPHKDCAV',
            'X-Mashape-Authorization' : 'D418RnmwCcmshvZTnAwHPVrp115Tp1QCGPjjsnHVYuXPHKDCAV'
        };
        axios.get('https://wordsapiv1.p.mashape.com/words/?random=true', { headers })
            .then((response) => {
                let word = response.data.word;
                axios.get(`https://wordsapiv1.p.mashape.com/words/${word}/definitions`, { headers })
                    .then((resp) => {
                        let definition = resp.data.definitions;
                        if (definition.length < 1) {
                            definition = [{definition : 'No clues'}];
                        }
                        this.setState({
                            definitions: definition,
                            word,
                            guessedWords: []
                        });
                    });
            });
    }

    handleGuessKeyDown(keypress) {
        let guesses = this.state.guessedWords;
        guesses.push(keypress);
        this.setState({
            guessedWords: guesses
        });
    }


    render() {
        return (
            <section className={'container'}>
                <Header heading={'Guess The Word!'}/>
                <Body
                    wordData={this.state.wordData}
                    word={this.state.word}
                    onNewClick={this.handleNewWordClick}
                    onGuessKeyDown={this.handleGuessKeyDown}
                    guessedWords={this.state.guessedWords}
                    definitions={this.state.definitions}
                />
            </section>
        );
    }
}