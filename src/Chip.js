import './Chip.css';

function Chip(props) {

    const toggleChipElement = (e) => {
        var chipDeleteHandler = {...props}
        if(chipDeleteHandler === undefined){
            return
        }
        else{
            // console.log('e.target--->', e, e.target)
        props.chipDeleteHandler(e.target);
        }
    }
    let l = `item${props.isChip ? " Capsule" : " drop"}`
    return (
        <div className={l}>
            <img data-item={props.itemDetails.id} className={props.itemDetails.img} />
            <span data-item={props.itemDetails.id} className="Chip_text">{props.itemDetails.name}</span>
            { props.isChip && <button onClick={toggleChipElement} data-item={props.itemDetails.id} className="Chip_cancel">X</button>}
        </div>
    )
}

export default Chip;

