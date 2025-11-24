import React from 'react';
import { Layout } from 'antd';
import '../footer.css'
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="custom-footer">
  © 2025 Arriendo de autos lo mejor para ti.
</AntFooter>

  );
};

export default Footer;
