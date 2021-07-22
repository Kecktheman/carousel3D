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
     let [perspective, setPerspective] = useState('160vw')
     let options = {
          items: gridList,
          transition: 'all .5s ease-in-out',
          perspective: perspective,
          backfaceVisibility: 'hidden'
     }

     function setSevenItems() {
          let _gridList = []
          _gridList.push(
               { label: 'Scötland', text: 'Här finns bron alla talar om!', backgroundColor: 'hsl(212, 100%, 60%)', backgroundImage: bridge },
               { label: 'Se Mälmo', text: 'Staden i syd.', backgroundColor: 'hsl(150, 100%, 60%)', backgroundImage: city },
               { label: 'Saharas strand', text: 'Dock utan hav.', backgroundColor: 'hsl(30, 100%, 50%)', backgroundImage: dessert },
               { label: 'Skogen i Storfors.', text: 'Kampingliv när det är som finast!', backgroundColor: 'hsl(75, 100%, 50%)', backgroundImage: forrest },
               { label: 'Mongolien', text: 'Sand, Smör, och Snus.', backgroundColor: 'red', backgroundImage: stepps },
               { label: 'Bergdalen.', text: '<Kommer snart>', backgroundColor: 'hsl(75, 100%, 50%)' },
               { label: 'Toppen av Mount Everest', text: '<Kommer snart>', backgroundColor: 'red' }
          )
          setGridList(_gridList)
     }

     function setFiveItems() {
          let _gridList = []
          _gridList.push(
               { label: 'Scötland', text: 'Här finns bron alla talar om!', backgroundColor: 'hsl(212, 100%, 60%)', backgroundImage: bridge },
               { label: 'Se Mälmo', text: 'Staden i syd.', backgroundColor: 'hsl(150, 100%, 60%)', backgroundImage: city },
               { label: 'Saharas strand', text: 'Dock utan hav.', backgroundColor: 'hsl(30, 100%, 50%)', backgroundImage: dessert },
               { label: 'Skogen i Storfors.', text: 'Kampingliv när det är som finast!', backgroundColor: 'hsl(75, 100%, 50%)', backgroundImage: forrest },
               { label: 'Mongolien', text: 'Sand, Smör, och Snus.', backgroundColor: 'red', backgroundImage: stepps }
          )
          setGridList(_gridList)
     }

     function setThreeItems() {
          let _gridList = []
          _gridList.push(
               { label: 'Scötland', text: 'Här finns bron alla talar om!', backgroundColor: 'hsl(212, 100%, 60%)', backgroundImage: bridge },
               { label: 'Se Mälmo', text: 'Staden i syd.', backgroundColor: 'hsl(150, 100%, 60%)', backgroundImage: city },
               { label: 'Saharas strand', text: 'Dock utan hav.', backgroundColor: 'hsl(30, 100%, 50%)', backgroundImage: dessert },
          )
          setGridList(_gridList)

     }

     useEffect(() => {
          options.gridList = gridList
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
                    <input type="test" onChange={(e) => setPerspective(e.target.value)} value={options.perspective}></input>
               </div>

               <Carousel3D options={options} />

          </div>
     );
}

export default App;
