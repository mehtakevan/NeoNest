import card from './card.png'
import card2 from './card2.png'
import card3 from './card3.png'
import secure from '../../assets/secure.jpg'
import {useState, useEffect} from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import {RxDotFilled} from 'react-icons/rx'

const Slide = () => {
    const slides = [
        {
            url : 'https://img.freepik.com/free-vector/digital-indian-rupee-rise-up-arrow-background-trading-concept_1017-42460.jpg?w=1800&t=st=1706096997~exp=1706097597~hmac=2209c9036f5818a8756ecfeb492ec986291ae6dd8a5f0a246a16423e8b9be105'
        },
        {
            url : 'https://img.freepik.com/free-vector/purchase-online-onboarding-app-screens_23-2148400185.jpg?w=1800&t=st=1706096918~exp=1706097518~hmac=6da2ea7c2f4cf9b86a6ea226d6140f1e80e9e019a83c3a439da60f8363ead616'
        },
        {
            url : 'https://img.freepik.com/premium-photo/online-banking-concept-with-digital-classic-bank-building-symbol-laptop-monitor-businessman-hands_670147-509.jpg?w=1800'
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);    
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex) ;
    };

    const goToSlide = (slideIndex) =>  {
         setCurrentIndex(slideIndex);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(currentIndex === 2){
                setCurrentIndex(0);
            }
            else{
                setCurrentIndex(currentIndex+1);
            }
        },5000)
    },[currentIndex])
    

    return (

<>
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
            <div style={{backgroundImage: `url(${slides[currentIndex].url})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>

            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick = {prevSlide} size={30} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick = {nextSlide} size={30} />
            </div>
            {/* <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                    <div key = {slideIndex} onClick = {() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>
                        <RxDotFilled/>
                    </div>
                ))}
            </div> */}
        </div>
</>
)
}
export default Slide
