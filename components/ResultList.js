const ResultList = (props) => {
	return (
		<ul className="result">
			{props.list.map( item => {
				return <Item item={item} />}
			)}
		</ul>
	)
}