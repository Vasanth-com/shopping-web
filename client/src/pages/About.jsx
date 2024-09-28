import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import {assets} from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
       <img src={assets.about_img} className='w-full md:max-w-[450px]'  alt="" />
       <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet. Pellentesque finibus, est et iaculis suscipit, dolor nulla commodo dui, nec ultricies arcu nisl tristique eros. Morbi eros est, pulvinar eget ornare ac, ultrices eget risus. Ut lobortis pellentesque pretium. Praesent sollicitudin vestibulum iaculis. Mauris a finibus orci.</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet. Pellentesque finibus, est et iaculis suscipit, dolor nulla commodo dui, nec ultricies arcu nisl tristique eros. Morbi eros est, pulvinar eget ornare ac, ultrices eget risus. Ut lobortis pellentesque pretium. Praesent sollicitudin vestibulum iaculis. Mauris a finibus orci.s</p>
        <b className='text-gray-600'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet. Pellentesque finibus, est et iaculis suscipit, dolor nulla commodo dui, nec ultricies arcu nisl tristique eros. Morbi eros est, pulvinar eget ornare ac, ultrices eget risus. Ut lobortis pellentesque pretium. Praesent sollicitudin vestibulum iaculis. Mauris a finibus orci. Quisque ipsum nunc, efficitur sit amet blandit ut, aliquam quis dui. Phasellus interdum leo eu ipsum malesuada, et interdum diam egestas</p>
       </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet.Lorem ipsum </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convinence:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet.Lorem ipsum</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet. Lorem ipsum </p>
        </div>
      </div>
      <Newsletter/>
    </div>
  )
}

export default About
