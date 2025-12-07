export default function Die(props) {
	const styles = {
		background: props.isHeld ? '#59e391' : '#fff',
	};
	return (
		<button
			onClick={() => props.hold(props.id)}
			style={styles}
			aria-pressed={props.isHeld}
			aria-label={`Die with a value of ${props.value}, ${
				props.isHeld ? 'held' : 'not held'
			}`}
		>
			{props.value}
		</button>
	);
}
