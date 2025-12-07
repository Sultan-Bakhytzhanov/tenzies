import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';
let init = false;

export default function App() {
	const [dice, setDice] = useState(() => generateAllNewDice());
	const buttonRef = useRef(null);

	const gameWon =
		dice.every(item => item.isHeld) &&
		dice.every(item => {
			const num = dice[0].value;
			return item.value === num;
		});

	useEffect(() => {
		gameWon ? buttonRef.current.focus() : null;
	}, [gameWon]);

	if (gameWon && !init) {
		console.log('Victory!');
		init = true;
	}

	function generateAllNewDice() {
		return new Array(10).fill(0).map(() => ({
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}));
	}

	function rollDice() {
		setDice(prevDice =>
			prevDice.map(item =>
				item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) }
			)
		);
	}

	function hold(id) {
		setDice(prevDice =>
			prevDice.map(item =>
				item.id === id ? { ...item, isHeld: !item.isHeld } : item
			)
		);
	}

	const diceList = dice.map(die => (
		<Die
			key={die.id}
			id={die.id}
			value={die.value}
			isHeld={die.isHeld}
			hold={hold}
		/>
	));

	return (
		<main>
			{gameWon ? <Confetti /> : null}
			<div aria-live='polite' className='sr-only'>
				{gameWon ? (
					<p>Congratulations, you won! Press "new game" to play again.</p>
				) : null}
			</div>
			<h1 className='title'>Tenzies</h1>
			<p className='instructions'>
				Roll until all dice are the same. Clich each die to freeze it at it's
				current value between rolls
			</p>
			<div className='dice-container'>{diceList}</div>
			<button
				ref={buttonRef}
				className='roll'
				onClick={gameWon ? () => setDice(generateAllNewDice) : rollDice}
			>
				{gameWon ? 'New game' : 'Roll'}
			</button>
		</main>
	);
}
