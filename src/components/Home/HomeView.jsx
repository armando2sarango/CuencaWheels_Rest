import React from 'react';
import './Home.css'; 
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Statistic, 
  Space,
  Button
} from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  SmileOutlined,
  CarOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from '@ant-design/icons';
// import { getAuth } from '../../services/auth';

// const auth = getAuth();
// if (auth) {
//   console.log('Usuario logueado:', auth.userName, auth.userId);
// }
const { Title, Paragraph, Text } = Typography;

const HomeView = () => {
  const navigate = useNavigate();

  const empresaInfo = {
    nombre: "Cuenca Wheels",
    descripcion: "Líder en alquiler de vehículos con más de 10 años de experiencia",
    mision: "Proporcionar soluciones de movilidad confiables y accesibles para nuestros clientes, ofreciendo vehículos de calidad y un servicio excepcional que supere las expectativas.",
    vision: "Ser la empresa de alquiler de vehículos más confiable y preferida en Ecuador, reconocida por nuestra excelencia en el servicio y compromiso con la satisfacción del cliente.",
    valores: [
      "Compromiso con el cliente",
      "Calidad en el servicio",
      "Integridad y transparencia",
      "Innovación constante"
    ],
    estadisticas: [
      { titulo: "Clientes Satisfechos", valor: "5000+", icono: "smile" },
      { titulo: "Vehículos Disponibles", valor: "150+", icono: "car" },
      { titulo: "Años de Experiencia", valor: "10+", icono: "trophy" },
      { titulo: "Ciudades Cubiertas", valor: "15+", icono: "environment" }
    ],
    servicios: [
      {
        titulo: "Alquiler Diario",
        descripcion: "Vehículos disponibles por día con tarifas competitivas y sin compromisos a largo plazo.",
        icono: "calendar"
      },
      {
        titulo: "Alquiler Mensual",
        descripcion: "Planes especiales para alquileres de larga duración con descuentos atractivos.",
        icono: "schedule"
      },
      {
        titulo: "Servicio Corporativo",
        descripcion: "Soluciones personalizadas para empresas con flotas y servicios exclusivos.",
        icono: "team"
      },
      {
        titulo: "Asistencia 24/7",
        descripcion: "Soporte y asistencia en carretera las 24 horas del día, los 7 días de la semana.",
        icono: "phone"
      }
    ],
    contacto: {
      telefono: "+593 958832936",
      email: "cuentarentcar@gmail.com",
      direccion: "Av. Orellana E4-431 y Juan León Mera, junto al hotel Marriot.",
      horario: "Lunes a Viernes: 8:00 AM - 6:00 PM | Sábados: 9:00 AM - 2:00 PM"
    },
  };

  const iconMap = {
    smile: <SmileOutlined />,
    car: <CarOutlined />,
    trophy: <TrophyOutlined />,
    environment: <EnvironmentOutlined />,
    calendar: <CalendarOutlined />,
    schedule: <ScheduleOutlined />,
    team: <TeamOutlined />,
    phone: <PhoneOutlined />,
    facebook: <FacebookOutlined />,
    instagram: <InstagramOutlined />,
    twitter: <TwitterOutlined />,
    linkedin: <LinkedinOutlined />
  };

  return (
    <div className="home-container">
      
      <div className="hero-section">
        <Title level={1} className="hero-title">
          {empresaInfo.nombre}
        </Title>
        <Paragraph className="hero-subtitle">
          {empresaInfo.descripcion}
        </Paragraph>
        <Space size="large">
          <Button 
            size="large" 
            className="hero-button"
            onClick={() => navigate('/autos')}
          >
            Ver Vehículos
          </Button>
          <Button 
          
            size="large" 
            className="hero-button"
            onClick={() => window.open('https://wa.link/0an2d8', '_blank')}
          >
            Contáctanos
          </Button>
        </Space>
      </div>

      {/* Estadísticas */}
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        {empresaInfo.estadisticas.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card hoverable className="stat-card">
              <div className="stat-icon">
                {iconMap[stat.icono]}
              </div>
              <Statistic 
                title={stat.titulo} 
                value={stat.valor}
                valueStyle={{ color: '#4c68e5', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        <Col xs={24} lg={12}>
          <Card title={<Title level={3}>Nuestra Misión</Title>} className="mision-card">
            <Paragraph style={{ fontSize: '16px' }}>{empresaInfo.mision}</Paragraph>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<Title level={3}>Nuestra Visión</Title>} className="vision-card">
            <Paragraph style={{ fontSize: '16px' }}>{empresaInfo.vision}</Paragraph>
          </Card>
        </Col>
      </Row>

      <Card 
        title={<Title level={3}>Nuestros Valores</Title>} 
        className="valores-container"
      >
        <Row gutter={[16, 16]}>
          {empresaInfo.valores.map((valor, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <div className="valor-item">
                <Text className="valor-text">{valor}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Servicios */}
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        Nuestros Servicios
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        {empresaInfo.servicios.map((servicio, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card hoverable className="servicio-card">
              <div className="servicio-icon">
                {iconMap[servicio.icono]}
              </div>
              <Title level={4}>{servicio.titulo}</Title>
              <Paragraph>{servicio.descripcion}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
      <Card 
        title={<Title level={2} style={{ textAlign: 'center' }}>Contáctanos</Title>} 
        className="contact-card"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <PhoneOutlined className="contact-icon" />
                <Text className="contact-info">{empresaInfo.contacto.telefono}</Text>
              </div>
              <div>
                <MailOutlined className="contact-icon" />
                <Text className="contact-info">{empresaInfo.contacto.email}</Text>
              </div>
              <div>
                <HomeOutlined className="contact-icon" />
                <Text className="contact-info">{empresaInfo.contacto.direccion}</Text>
              </div>
              <div>
                <ClockCircleOutlined className="contact-icon" />
                <Text className="contact-info">{empresaInfo.contacto.horario}</Text>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomeView;
