import React from "react";
import { Helmet } from "react-helmet";

const Header: React.FC = () => (
  <Helmet>
    <title>Todos</title>
    <link
      rel="stylesheet"
      href="/webjars/bootstrap/3.3.6/css/bootstrap.min.css"
    />
    <style>{`
      .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px;
        background-color: #f5f5f5;
      }
    `}</style>
  </Helmet>
);

export default Header;