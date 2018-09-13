const Ingredient = ({name, amount, measurement}) =>
	<li>
		<span className="name">{name}</span>
		<span className="measurement">{measurement}</span>
		<span className="amount">{amount}</span>
	</li>

export default Ingredient