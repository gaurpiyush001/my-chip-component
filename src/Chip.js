import './Chip.css';

function Chip(props) {
    console.log('propsss,,', props.isChip)
    let l = `item${props.isChip ? " Capsule" : " drop"}`
    return (
        <div className={l}>
            <img data-item={props.itemDetails.id} className={props.itemDetails.img} />
            <span data-item={props.itemDetails.id} className="Chip_text">{props.itemDetails.name}</span>
            { props.isChip && <button data-item={props.itemDetails.id} className="Chip_cancel">X</button>}
        </div>
    )
}

export default Chip;

