import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import './Carousel3D.scss'

function Carousel3D(props) {
     const { useRef, useEffect, useState } = React
     const carouselWrapper = useRef(null)
     const carousel = useRef(null)

     const [carouselRotation, setCarouselRotation] = useState(0)
     const [carouselitemRotation, setCarouselItemRotation] = useState(null)
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

     //#region Watchers
     useEffect(() => { 
          setCarouselRotation(0)
          setCarouselItemRotation(360 / items.length)
          setCarouselZOffset(calculateCarouselZOffset(carouselWrapperWidth, props.options.items.length))

          // setInterval(handleNext(), 5000)

     }, [items.length])
     useEffect(() => { setCarouselZOffset(calculateCarouselZOffset(carouselWrapperWidth, props.options.items.length)) }, [carouselWrapperWidth])
     //#endregion

     //#region Movement
     const handlePrev = () => handleRotate(carouselitemRotation)
     const handleNext = () => handleRotate(-carouselitemRotation)
     const handleRotate = async (rotateValue) => {
          console.log(rotateValue)
          let prevStepValue = carouselRotation
          let nextStepMaxValue = prevStepValue + rotateValue
          setCarouselRotation(nextStepMaxValue)
     }
     
     const [drag, setDrag] = useState({
          right: 0,
          left: 0,
          dragging: false
     })
     const handleDragStart = (e) => {
          setDrag({ ...drag, dragging: true})
     }
     const handleDragEnd = (e) => {
          setDrag({ ...drag, dragging: false})
     }
     const handleDrag = (e) => {
          drag.dragging ? console.log("isDragging") : console.log("no dragging")
     }
     //#endregion

     var propsListLength = items.length

     return (
          <div ref={carouselWrapper} className="carousel3D__wrapper"
               style={{
                    '--carouselPerspective': perspective + 'vw'
               }}>

               <div className="carousel3D__controls carousel3D_controls_left">
                    <button onClick={handlePrev}>
                         <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
               </div>

               <div className="carousel3D__controls carousel3D_controls_right">
                    <button onClick={handleNext}>
                         <FontAwesomeIcon icon={faChevronRight} />
                    </button>
               </div>

               <div className="carousel3D__scene"
                    style={{
                         '--carouselZOffset': `-${carouselZOffset}px`,
                    }}>

                    <div ref={carousel} className="carousel3D__carousel"
                         style={{
                              '--carouselRotation': `${carouselRotation}deg`,
                              '--carouselTransition': transition
                         }}
                         onMouseDown={handleDragStart}
                         onMouseUp={handleDragEnd}
                         onMouseMove={_.debounce(handleDrag, 100)}>
                         {
                              items.map((item, index) => (
                                   <div key={index}
                                        className={returnItemClasses(item, index, propsListLength, carouselRotation)}
                                        style={returnItemStyle(item, index, propsListLength, carouselZOffset, backfaceVisibility)}>
                                        <article>
                                             <h4>
                                                  {
                                                       item.link 
                                                            ? <a href={item.link}>
                                                                 {item.label}
                                                                 <FontAwesomeIcon icon={faArrowAltCircleRight} />
                                                            </a>
                                                            : item.label
                                                  }
                                             </h4>
                                             <p>{item.text}</p>
                                             <div className="carousel3D_overflow"></div>
                                        </article>
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
