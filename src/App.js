import './App.css';
import Chip from './Chip';
import Dropdown from './Dropdown';
import { Fragment, useRef, useState } from 'react';

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


  const getDropdownHandler = () => {
    setShowDropdown(true)
    getItems()
  }

  const setChipComponentHandler = (newAdd) => {
    setChipComponentList( prev => [...prev, newAdd]);
    console.log('dropdownList.length', dropdownList.length)
  }

  const filterDataListHandler = ( matches ) => {
    // console.log(matches.size)
    setFilterDataList(prev => {
      return prev.filter( curr => matches.has(curr.id) )
      // console.log('ppppp', p)
      // return p;
    })

  }

  const getItems = (e) => {

    // console.log('event on change only', e)

    if( userInput.current.value==='' ){
      setFilterDataList(prev => [...dropdownList]);
      return
    }

    const userFilteredList = dropdownList.filter(data => data.name.toLowerCase().includes(userInput.current.value.toLowerCase())).map(ele => ele.id)

    const st = new Set(userFilteredList);//yaha singleton chahiye hoga
    filterDataListHandler(st)
    st.clear()

  }

  return (
    <Fragment>
    <div className="App">
      { chipComponentList.map(data => <Chip key={data.id} itemDetails={data} isChip={true} />) }
      <input className='input' label="" onChange={getItems} onFocus={() => setShowDropdown(true)} ref={userInput} />
    </div>
    {showDropdown && <Dropdown dataList={filterDataList} isChipp={false} />}
    </Fragment>
  );
}

export default App;
