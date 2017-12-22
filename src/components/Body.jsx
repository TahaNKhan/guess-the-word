import React from 'react';
import PropTypes from 'prop-types';

export class Body extends React.Component  {
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-sm-3'}>
                        <button type='button' onClick={this.props.onNewClick} className='btn btn-primary'>New Word</button>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-sm-12'}>

                        {this.props.word !== '' ?
                            <div>
                                <h3 className={'inline'}>Word:</h3>
                                <p className={'inline'}>
                                    {
                                        this.props.word.split('').map((letter) => {
                                            if (this.props.guessedWords.indexOf(letter) < 0 && letter !== ' ') {
                                                return '#'
                                            } else {
                                                return letter;
                                            }
                                        })
                                    }
                                </p>
                                <p>
                                    Clues:
                                    {this.props.definitions.map((def) => {
                                        return `\n ${def.definition}` + (this.props.definitions.indexOf(def) === this.props.definitions.length - 1 ? '\n' : ', ');
                                    })}

                                </p>
                                <input ref={'inputbox'} type={'text'} onChange={(e) => {
                                    this.props.onGuessKeyDown(e.target.value);
                                    this.refs.inputbox.value = '';
                                }}/>
                                <p>Guessed Letters: {this.props.guessedWords.map((letter) => {return `${letter} `})} </p>
                            </div>
                            : null}
                    </div>
                </div>
            </div>

        );
    }
}

Body.propTypes = {
    onNewClick: PropTypes.func,
    onGuessKeyDown: PropTypes.func,
    guessedWords: PropTypes.array,
    word: PropTypes.string,
    wordData: PropTypes.object
};