import './Dropdown.css';
import './Chip.css';
import Chip from './Chip';

//yaha pehle loop chla lo
//with DropDownItem component, DropDowncomponewnt mein dynamic props pass kro, jo ki aayengey input ki value se

function Dropdown(props) {
    console.log('props.data ', props.dataList)

    const selectedHandler = (e) => {
        console.log(e.target)
        props.toggleSelectedWord(e.target);
    }


    return (
        <div className="Dropdown" onClick={selectedHandler}>
            {
                props.dataList.map( ele => <Chip key={ele.id} isChip={props.isChipp} itemDetails={ele}/> )
            }
        </div>
    )
    
}

export default Dropdown;

// props.dataList.map( ele => <Chip key={ele.id} isChip={props.isChipp} itemDetails={ele} toggleSelectedElement={true}/> )