import './styles.css';

export function Login() {
	return (
		<form>
			<input className="login-input" type="text" placeholder="login" />
			<input className="login-input" type="text" placeholder="senha" />
			<button type="submit">Logar na plataforma</button>
		</form>
	);
}
