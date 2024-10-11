import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Highlights = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 6,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
        },
    };

    return (
        <div>
            <h2 className='text-[32px] font-Great my-5 text-black'>Highlights of Events..!!</h2>
            <Carousel
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={3000}
                showDots={true}
                dotsClass="custom-dot-class"
                arrows={false}
                infinite={true}
            >
                {[
                    'https://cdn.shopify.com/videos/c/o/v/15c9d508f3b84136a62814a83232f9cd.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/6697af17f4244d9e86650c5311ed1f8a.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/156a766fec82478b89e5b3079873ea76.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/0e1a2d0678a6408caa88c64adef3cef6.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/298cfc12710b4387af9674c291e83bea.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/5f63a7508b844bad9543122492802fa3.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/298cfc12710b4387af9674c291e83bea.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/25dd0f54d61743bd87780d08f8518276.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/5852f893e584423fb9b8acbcd71fa021.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/5852f893e584423fb9b8acbcd71fa021.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/f79d98e76ec84639843ee5433737f546.mp4',
                    'https://cdn.shopify.com/videos/c/o/v/298cfc12710b4387af9674c291e83bea.mp4',
                ].map((src, index) => (
                    <div key={index} className='flex justify-center items-center'>
                        <video
                            src={src}
                            autoPlay={true}
                            muted={true}
                            loop={true} // Ensure video loops
                            className='rounded-xl h-[320px]'
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default Highlights;
