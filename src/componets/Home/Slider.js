import React from 'react';
import { s1, s2, s3, s4, s5, s6, s7, sliderBg } from '../../assets';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Slider = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div>
            <div
                className="bg-cover bg-center h-[660px] w-full "
                style={{ backgroundImage: `url(${sliderBg})` }}
            >
                <h3 className='font-Great pt-10 text-black text-[32px]'>
                    Awesome Musical Night
                </h3>
                <h1 className="uppercase text-[32px] font-semibold text-black mt-2 font-Lexend">PREMIUM MUSICAL ICONS</h1>
                <div className="flex ml-[53.5%] mt-[-19px] mb-3 bg-gradient-to-r from-purple-400 via-pink-200 to-pink-400 h-3 w-[166px]"></div>
                <Carousel
                    responsive={responsive}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    showDots={true}
                    dotsClass="custom-dot-class"
                    arrows={false}
                    infinite={true}
                >
                    {[s1, s2, s3, s4, s5, s6, s7].map((src, index) => (
                        <div key={index} className='flex justify-center items-center'>
                            <img src={src} alt={`image-${index + 1}`} className='w-fit' />
                        </div>
                    ))}
                </Carousel>
            </div>

        </div>
    );
}

export default Slider;
