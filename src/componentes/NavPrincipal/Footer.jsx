import React from 'react'
import "../../styles/footer.css";

export const Footer = () => {
  return (

     <div className='footer'>
      <div className='container'>

          <div className=' bg-darkk row divFooter'>
            <div className='footer_copyR bg-darkk col-lg-4 '>
                <p className='d-flex bg-darkk' >Matias Bordenave</p>
            </div>
            <div className='col-lg-4 justify-content-center bg-darkk d-flex'>
                <p className='copyRightP  bg-darkk'>© Copyright 2023. Made by Matias Bordenave.</p>
            </div>
            <div className='footer_media bg-darkk col-lg-4'>
                <div className=''>
                  <div className='col-12 justify-content-end bg-darkk  d-flex'>
                    <h3 className='bg-darkk' >social</h3>
                  </div>
                  
                  <div className='col-12 bg-darkk justify-content-end d-flex'>
                    <a className='bg-darkk' href="https://www.linkedin.com/in/matias-bordenave-221986251/" target='_blank'><img className='bg-darkk' src="https://d33wubrfki0l68.cloudfront.net/7f29579dde49e02480372aa49f7189c5536b0118/34b92/assets/png/linkedin-ico.png" alt="" /></a>
                    <a className='bg-darkk' href="https://github.com/MatuqE" target='_blank'><img className='bg-darkk' src="https://d33wubrfki0l68.cloudfront.net/5557d5a11584d7201a38ee1a95200f57a4cc0f88/15085/assets/png/github-ico.png" alt="" /></a>
                    <a className='bg-darkk' href="https://github.com/MatuqE" target='_blank'><img className='bg-darkk' src="https://cdn.pixabay.com/photo/2020/08/25/02/16/facebook-5515461_1280.png" alt="" /></a>
                  </div>
                </div>
              </div>
          </div>
          
      </div>
        </div>

  )
}

export default Footer