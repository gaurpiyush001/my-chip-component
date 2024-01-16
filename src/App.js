import { toBeChecked } from '@testing-library/jest-dom/matchers';
import './App.css';
import Chip from './Chip';
import Dropdown from './Dropdown';
import { Fragment, useRef, useState, useEffect } from 'react';

let dummyData = [
  {
    id: 1,
    name: 'Piyush Gaur',
    img: 'sdv',
  },
  {
    id: 2,
    name: 'Gaurav Arora',
    img: 'sdv',
  },
  {
    id: 3,
    name: 'Kushagra Garg',
    img: 'sdv',
  },
  {
    id: 4,
    name: 'Piyush Manocha',
    img: 'sdv',
  },
  {
    id: 5,
    name: 'Paras Sharma',
    img: 'sdv',
  },
  {
    id: 6,
    name: 'Limbachiyaa Arhama',
    img: 'sdv',
  },
]

function App() {
  const userInput = useRef();
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ dropdownList, setDropdownList ] = useState(dummyData);
  const [ chipComponentList, setChipComponentList ] = useState([]);
  const [ filterDataList, setFilterDataList ] = useState(dropdownList);
  const [ enteredRef, setEnteredRef ] = useState('');


  const getDropdownHandler = () => {
    setShowDropdown(true)
  }

  const setChipComponentHandler = (newAdd) => {
    setChipComponentList( prev => [...prev, newAdd]);
  }

  // const filterDataListHandler = ( matches ) => {
  //   // console.log(matches.size)
  //   setFilterDataList(prev => {
  //     return prev.filter( curr => matches.has(curr.id) )
  //   })

  // }

  // const getItems = (e) => {

  //   // console.log('event on change only', e)

  //   if( userInput.current.value==='' ){
  //     setFilterDataList(prev => [...dropdownList]);
  //     return
  //   }

  //   const userFilteredList = dropdownList.filter(data => data.name.toLowerCase().includes(userInput.current.value.toLowerCase()))

  //   setFilterDataList(userFilteredList)

  // }

  useEffect(() => {
    
    const timer = setTimeout(() => {
      //here we will check value entered is same as 500 milliseconds ago!
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

  const addDropDownHandler = (chipAdd) => {
    setDropdownList(prev => [...prev, chipAdd])
  }

  const chipToggleHandler = (e) => {

    let elementToRemoved = e!=undefined ? e.getAttribute('data-item') : undefined;
    let chipAdd;
    if(elementToRemoved === undefined)
    return

    setChipComponentList(
      chipComponentList.length ? chipComponentList.filter(ele => {
        if( ele.id==elementToRemoved ) chipAdd = ele
        return ele.id!=elementToRemoved
      }) : []
    )

  
    // addDropDownHandler(chipAdd);
    setFilterDataList( filterDataList => [ ...filterDataList, chipAdd] )
    setDropdownList( dropdownList => [...dropdownList, chipAdd])

    setEnteredRef('')


  }


  return (
    <Fragment>
    <div className="App">
      { chipComponentList.length && chipComponentList.map(data => <Chip chipDeleteHandler={chipToggleHandler} key={data.id} itemDetails={data} isChip={true} />) }
      <input className='input' label="" value={enteredRef} onChange={event => setEnteredRef(event.target.value)} onFocus={() => setShowDropdown(true)} ref={userInput} />
    </div>
    {showDropdown && <Dropdown toggleSelectedWord={toggleDropdownHandler} dataList={filterDataList} isChipp={false} />}
    </Fragment>
  );
}

export default App;
