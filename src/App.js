import React from 'react'

import Carousel3D from "./components/Carousel3D/Carousel3D"
import './App.scss';

import bridge from "./images/bridge.png"
import city from "./images/city.png"
import dessert from "./images/dessert.png"
import forrest from "./images/forrest.png"
import stepps from "./images/stepps.png"


function App() {
     const { useRef, useEffect, useState } = React

     let [gridList, setGridList] = useState([])
     let [perspective, setPerspective] = useState('160')
     let options = {
          items: gridList,
          transition: 'all .5s ease-in-out',
          perspective: perspective,
          backfaceVisibility: 'hidden'
     }

     let _gridList = [
          { label: 'Skottland', link: '#', text: 'Skottland är en självstyrande riksdel inom Storbritannien. Skottland upptar den norra tredjedelen av ön Storbritannien och delar gräns med England i söder medan det avgränsas av Nordsjön i öster,', backgroundColor: 'hsl(212, 100%, 60%)', backgroundImage: bridge },
          { label: 'Se Mälmo', text: 'Malmö är Sveriges tredje största tätort och Nordens sjätte största med 316 588 invånare i tätorten samt även länet Skånes residensstad.', backgroundColor: 'hsl(150, 100%, 60%)', backgroundImage: city },
          { label: 'Saharas strand', text: 'Dock utan hav.', backgroundColor: 'hsl(30, 100%, 50%)', backgroundImage: dessert },
     ]

     function setSevenItems() {
          setGridList([
               ..._gridList,
               { label: 'Skogen i Storfors.', text: 'Kampingliv när det är som finast!', backgroundColor: 'hsl(75, 100%, 50%)', backgroundImage: forrest },
               { label: 'Mongolien', text: 'Sand, Smör, och Snus.', backgroundColor: 'red', backgroundImage: stepps },
               { label: 'Bergdalen.', text: '<Kommer snart>', backgroundColor: 'hsl(75, 100%, 50%)' },
               { label: 'Toppen av Mount Everest', text: '<Kommer snart>', backgroundColor: 'red' }
          ])
     }

     function setFiveItems() {
          setGridList([
               ..._gridList,
               { label: 'Skogen i Storfors.', text: 'Kampingliv när det är som finast!', backgroundColor: 'hsl(75, 100%, 50%)', backgroundImage: forrest },
               { label: 'Mongolien', text: 'Sand, Smör, och Snus.', backgroundColor: 'red', backgroundImage: stepps }
          ])
     }

     function setThreeItems() {
          setGridList(_gridList)
     }

     useEffect(() => {
          let _options = options
          _options.gridList = gridList
          options = _options
     }, [gridList])

     useEffect(() => {
          options.perspective = perspective
     }, [perspective])

     useEffect(() => {
          setFiveItems()
     }, [])

     return (
          <div className="App">

               <h1>Marcus resebyrå AB</h1>

               <div>
                    <h2>Carousel items:</h2>
                    <div>
                         <button onClick={() => setThreeItems()}>Set three items</button>
                         <button onClick={() => setFiveItems()}>Set five items (default load)</button>
                         <button onClick={() => setSevenItems()}>Set seven items</button>
                    </div>
                    <h2>Set perspective</h2>
                    <input type="number" onChange={(e) => setPerspective(e.target.value)} value={options.perspective}></input>
               </div>

               { options && <Carousel3D options={options} />}

          </div>
     );
}

export default App;
