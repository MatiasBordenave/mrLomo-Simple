import React from 'react';
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <div className='footer'>
      <div className=''>
        {/* Nombre a la izquierda */}
        <div className='footer_copyR'>
          <p>Matias Bordenave</p>
        </div>

        {/* Copyright en el centro */}
        <div className='footer_copyR center'>
          <p>© Copyright 2023. Made by Matias Bordenave.</p>
        </div>

        {/* Redes sociales a la derecha */}
        <div className='footer_media'>
          <a href="https://www.linkedin.com/in/matias-bordenave-221986251/" target='_blank'>
            <img src="https://d33wubrfki0l68.cloudfront.net/7f29579dde49e02480372aa49f7189c5536b0118/34b92/assets/png/linkedin-ico.png" alt="LinkedIn" />
          </a>
          <a href="https://github.com/MatuqE" target='_blank'>
            <img src="https://d33wubrfki0l68.cloudfront.net/5557d5a11584d7201a38ee1a95200f57a4cc0f88/15085/assets/png/github-ico.png" alt="GitHub" />
          </a>
          <a href="https://github.com/MatuqE" target='_blank'>
            <img src="https://cdn.pixabay.com/photo/2020/08/25/02/16/facebook-5515461_1280.png" alt="Facebook" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
