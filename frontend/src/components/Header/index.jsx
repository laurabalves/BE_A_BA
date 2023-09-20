import './style.css';

import Logo from '../../assets/logo.svg'
import { PresentationChart, Users } from 'phosphor-react';


export function Header() {
	return (
		<header>
			<img className='logo' src={Logo} alt="" />
			<button> <PresentationChart size={32} /> DashBoard </button>
			<button> <Users size={32}/> Lista de Usuarios</button>
		</header>
	);
}
