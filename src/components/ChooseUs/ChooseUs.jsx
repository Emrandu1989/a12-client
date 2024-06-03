import settingImg from '../../assets/New folder/cogwheel-gear-mechanism-vector-settings-260nw-226269949.webp';
import safImg from '../../assets/New folder/gettyimages-1134590559-612x612.jpg'
import enhanceImg from '../../assets/New folder/stock-vector-vector-illustration-of-stairs-steps-with-a-star-on-every-rung-icon-of-rating-review-symbol-of-2094087820.jpg';
import envirImg from '../../assets/New folder/360_F_199850553_BQkLfMhn0yjxf5SSTL0XBbdCvbWNNvlP.jpg'

import img1 from '../../assets/New folder/chooseImg1.jpg';
import img2 from '../../assets/New folder/chooseImg2.jpg';

const ChooseUs = () => {
    return (
        <>
              <div className='flex flex-col lg:flex-row gap-3 px-12 mt-12'>
              <div className='lg:w-1/2 w-full'>
                     <div>
                     <h5 className="text-red-400 font-bold text-xl mb-6">Why Choose Us</h5>
                         <h2 className='text-2xl font-semibold text-gray-400'>World class quality is our priority</h2>
                         <p className='mt-2 text-gray-600'>We provide best services and our product quality is 100% praiseworthy.Everyone should choose us</p>
                         <div className="divider"></div> 
                     </div>
                         
                         <div className='space-y-5'>
                            <div className='flex justify-center items-center lg:flex-row flex-col gap-4 bg-gray-200 p-5 rounded'>
                                 <img className='w-16 h-16 rounded-full' src={settingImg} alt="" />
                                 <div>
                                     <h3 className='text-xl font-semibold'>Extended Equipment Lifespan</h3>
                                     <p>Quam adipiscing habitant lacinia odio proin class quisque in lectus nostra nibh</p>
                                 </div>
                            </div>
                            <div className='flex justify-center items-center lg:flex-row flex-col gap-4 bg-gray-200 p-5 rounded'>
                                 <img className='w-16 h-16 rounded-full' src={safImg} alt="" />
                                 <div>
                                     <h3 className='text-xl font-semibold'>Improved Safety Standards</h3>
                                     <p>Quam adipiscing habitant lacinia odio proin class quisque in lectus nostra nibh</p>
                                 </div>
                            </div>
                            <div className='flex justify-center items-center lg:flex-row flex-col gap-4 bg-gray-200 p-5 rounded'>
                                 <img className='w-16 h-16 rounded-full' src={enhanceImg} alt="" />
                                 <div>
                                     <h3 className='text-xl font-semibold'>Enhanced Customer Satisfaction</h3>
                                     <p>Quam adipiscing habitant lacinia odio proin class quisque in lectus nostra nibh</p>
                                 </div>
                            </div>
                            <div className='flex justify-center items-center lg:flex-row flex-col gap-4 bg-gray-200 p-5 rounded'>
                                 <img className='w-16 h-16 rounded-full' src={envirImg} alt="" />
                                 <div>
                                     <h3 className='text-xl font-semibold'>Environmental Sustainability</h3>
                                     <p>Quam adipiscing habitant lacinia odio proin class quisque in lectus nostra nibh</p>
                                 </div>
                            </div>
                         </div>

                  </div>
                  <div className='flex gap-2 w-1/2'>
                          <img className='w-[500px]' src={img1} alt="" />
                          <img className='w-[500px]' src={img2} alt="" />
                    </div> 
                 </div>  
        </>
    );
};

export default ChooseUs;