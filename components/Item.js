const Item = (props) => {
	return <li key={props.item.id}>Pomiar {props.item.id}{" "}{'/' + props.item.time}</li>
}