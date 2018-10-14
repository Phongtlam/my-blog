import React from 'react';
import Particles from 'react-particles-js';

const Home = () => (
  <Particles
    params={{
      particles: {
        number: {
          value: 160,
          density: {
            enable: false
          }
        },
        color: {
          value: '#000000'
        },
        size: {
          value: 10,
          random: true
        },
        move: {
          direction: 'bottom',
          out_mode: 'out'
        },
        line_linked: {
          enable: false
        }
      }
    }}
  />
);

export default Home;
