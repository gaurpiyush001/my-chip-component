import './Chip.css';

function Chip(props) {

    const toggleChipElement = (e) => {
        var chipDeleteHandler = {...props}
        if(chipDeleteHandler === undefined){
            return
        }
        else{
            props.chipDeleteHandler(e.target);
        }
    }

    let parentClass = `item${props.isChip ? " Capsule" : " drop"}`

    // Chip reusable component, with Dynamic props 
    return (
            props
            &&
            ( 
                <div className={parentClass} data-item={props.itemDetails.id}>
                    <img data-item={props.itemDetails.id} className={props.itemDetails.img} src={props.itemDetails.img} />
                    <span data-item={props.itemDetails.id} className="Chip_text">{props.itemDetails.name}</span>
                    { props.isChip && <button onClick={toggleChipElement} data-item={props.itemDetails.id} className="Chip_cancel">X</button>}
                </div>
            )
    )
}

export default Chip;

