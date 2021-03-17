import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Welcome to Le Magasin Shop!",
  description: "One stop shop for quality and practical everyday goods",
  keywords: "electronics, accessories, jewelry, home goods",
};

export default Meta;
