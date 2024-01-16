import './App.css';
import Chip from './Chip';
import Dropdown from './Dropdown';
import { Fragment, useRef, useState, useEffect } from 'react';
import logo from './icons8-test-account-16.png';

let dummyData = [
  {
    id: 1,
    name: 'Piyush Gaur',
    img: logo,
  },
  {
    id: 2,
    name: 'Gaurav Arora',
    img: logo,
  },
  {
    id: 3,
    name: 'Kushagra Garg',
    img: logo,
  },
  {
    id: 4,
    name: 'Piyush Manocha',
    img: logo,
  },
  {
    id: 5,
    name: 'Paras Sharma',
    img: logo,
  },
  {
    id: 6,
    name: 'Limbachiyaa Arhama',
    img: logo,
  }
]

function App() {
  const userInput = useRef();
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ dropdownList, setDropdownList ] = useState(dummyData);
  const [ chipComponentList, setChipComponentList ] = useState([]);
  const [ filterDataList, setFilterDataList ] = useState(dropdownList);
  const [ enteredRef, setEnteredRef ] = useState('');

  const setChipComponentHandler = (newAdd) => {
    setChipComponentList( prev => [...prev, newAdd]);
  }

  useEffect(() => {
    
    const timer = setTimeout(() => {
      //here we will check value entered is same as 1000 milliseconds ago!
      if( '' === userInput.current.value ){
        setFilterDataList([...dropdownList]);
      }

      else{
        
        const userFilteredList = dropdownList.filter(data => data.name.toLowerCase().includes(userInput.current.value.toLowerCase()))

        setFilterDataList(userFilteredList)
        
      }

      return () => {
        clearTimeout(timer);
      }

    }, 1000);

  }, [enteredRef, userInput])


  const toggleDropdownHandler = (e) => {

    let elementToRemoved = e.getAttribute('data-item')

    let chipAdd;
    setDropdownList(
      dropdownList.length ? dropdownList.filter(ele => {
        if( ele.id==elementToRemoved ) chipAdd = ele
        return ele.id!=elementToRemoved
      }) : []
    )

    setFilterDataList( filterDataList.filter(
      d => d.id != chipAdd.id
    ))

    setChipComponentHandler(chipAdd);

    setEnteredRef('')

  }

  const chipToggleHandler = (e) => {

    let elementToRemoved = e!=undefined ? e.getAttribute('data-item') : undefined;
    if(elementToRemoved === undefined)
    return

    let chipAdd;
  
    setChipComponentList(
      chipComponentList.length ? chipComponentList.filter(ele => {
        if( ele.id==elementToRemoved ) chipAdd = ele
        return ele.id!=elementToRemoved
      }) : []
    )

    setFilterDataList( filterDataList => [ ...filterDataList, chipAdd] )
    setDropdownList( dropdownList => [...dropdownList, chipAdd])

    setEnteredRef('')

  }

  const keyStrokeHandling = (e) => {
    if( e!=undefined && e.code == "Backspace"){
      
      //now I want to delete the last element in chipComponentList
      if( chipComponentList.length == 0 ){
        return;
      }

      let ele = chipComponentList[chipComponentList.length-1]
      let elementToRemoved = ele.id;

      setChipComponentList(
        chipComponentList.length ? chipComponentList.filter(ele => ele.id!=elementToRemoved) : []
      )
  
      setFilterDataList( filterDataList => [ ...filterDataList, ele] )
      setDropdownList( dropdownList => [...dropdownList, ele])
  
      setEnteredRef('')

    }

  }


  return (
    <Fragment>

    <div className="App">

      {/* Re-usable Chip component */}
      { chipComponentList.length!=0 && chipComponentList.map(data => <Chip chipDeleteHandler={chipToggleHandler} key={data.id} itemDetails={data} isChip={true} />) }

      {/* Automatic Adjusted Input field */}
      <input className='input' label="user-input" onKeyDown={keyStrokeHandling} value={enteredRef} onChange={event => setEnteredRef(event.target.value)} onFocus={() => setShowDropdown(true)} ref={userInput} />

    </div>
    
    {/* dropdown component */}
    {showDropdown && filterDataList.length!=0 && <Dropdown toggleSelectedWord={toggleDropdownHandler} dataList={filterDataList} isChipp={false} />}

    </Fragment>
  );
}

export default App;
