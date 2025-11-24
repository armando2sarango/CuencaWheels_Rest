import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center', padding: '20px 50px' }}>
      © 2025 Arriendo de autos lo mejor para ti.
    </AntFooter>
  );
};

export default Footer;
