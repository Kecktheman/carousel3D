import React from 'react'
import './Carousel3D.scss'

function Carousel3D(props) {
     const { useRef, useEffect, useState } = React
     const carouselWrapper = useRef(null)
     const carousel = useRef(null)

     const [carouselRotation, setCarouselRotation] = useState(0)
     const [carouselitemRotation, setCarouselItemRotation] = useState(360 / props.options.items.length)
     const [carouselZOffset, setCarouselZOffset] = useState(0)
     const { items, transition, perspective, backfaceVisibility } = props.options

     let carouselWrapperWidth = carouselWrapper.current?.offsetWidth
     
     useEffect(() => {
          const handleResize = () => {
               // width = mount.current.clientWidth
               // height = mount.current.clientHeight
          }

          // Setup
          // controls.current = { next, prev }
          window.addEventListener('resize', handleResize)

          return () => {
               // On component unmount
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     useEffect(() => { setCarouselZOffset(calculateCarouselZOffset(carouselWrapperWidth, props.options.items.length)) }, [carouselWrapperWidth])

     const handlePrev = () => { handleRotate(carouselitemRotation) }
     const handleNext = () => { handleRotate(-carouselitemRotation) }
     const handleRotate = async (rotateValue) => {
          let prevStepValue = carouselRotation
          let nextStepMaxValue = prevStepValue + rotateValue
          setCarouselRotation(nextStepMaxValue)
     }

     var propsListLength = items.length

     //setInterval(() => handleNext(), 5000)

     return (
          <div ref={carouselWrapper} className="carousel3D__wrapper"
               style={{
                    '--carouselPerspective': perspective
               }}>

               <div className="carousel3D__controls">
                    <button onClick={handlePrev}><span>{'<'}</span></button>
                    <button onClick={handleNext}><span>{'>'}</span></button>
               </div>

               <div className="carousel3D__scene"
                    style={{
                         '--carouselZOffset': `-${carouselZOffset}px`,
                    }}>

                    <div ref={carousel} className="carousel3D__carousel"
                         style={{
                              '--carouselRotation': `${carouselRotation}deg`,
                              '--carouselTransition': transition
                         }}>
                         {
                              items.map((item, index) => (
                                   <div key={index}
                                        className={returnItemClasses(item, index, propsListLength, carouselRotation)}
                                        style={returnItemStyle(item, index, propsListLength, carouselZOffset, backfaceVisibility)}>
                                        <h4>{item.label}</h4>
                                        <p>{item.text}</p>
                                        <p>My rotation: {returnIndexRotateValue(index, propsListLength)}</p>
                                   </div>
                              ))
                         }
                    </div>
               </div>
          </div>
     );
}

function calculateCarouselZOffset(sideLength, numberOfSides, circumradius) {
     return (1 / 2) * sideLength * (1 / Math.tan(Math.PI / numberOfSides))
}

function calculateCarouselItemZOffset(carouselZOffset) {
     return carouselZOffset + 50
}

function returnItemClasses(item, index, propsListLength, carouselRotation) {
     let classes = []

     if ((360 - carouselRotation) % 360 == returnIndexRotateValue(index, propsListLength))
          classes.push('carousel3D__item__active')


     return classes.join(' ')
}

function returnItemStyle(item, index, propsListLength, carouselZOffset, backfaceVisibility) {
     return {
          'backgroundColor': item.backgroundColor,
          'backgroundImage': `url(${item.backgroundImage})`,
          'backfaceVisibility': backfaceVisibility,
          '--itemRotation': `${returnIndexRotateValue(index, propsListLength)}deg`,
          '--carouselItemZOffset': `${calculateCarouselItemZOffset(carouselZOffset)}px`
     }
}

function returnIndexRotateValue(index, propsListLength) {
     let rotateValue = (360 / propsListLength) * (index + 1)
     if (rotateValue == 360) return 0
     return rotateValue
}

export default Carousel3D;
