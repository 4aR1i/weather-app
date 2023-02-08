import React from 'react';
import ContentLoader from 'react-content-loader';

import './index.scss';

const Loader: React.FC = () => (
  <ContentLoader className="loader" speed={2} width={270} height={280} viewBox="0 0 270 285" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
    <rect x="570" y="357" rx="3" ry="3" width="88" height="6" />
    <rect x="551" y="350" rx="3" ry="3" width="52" height="6" />
    <rect x="503" y="380" rx="3" ry="3" width="410" height="6" />
    <rect x="423" y="353" rx="3" ry="3" width="380" height="6" />
    <rect x="423" y="369" rx="3" ry="3" width="178" height="6" />
    <circle cx="589" cy="364" r="20" />
    <rect x="568" y="327" rx="0" ry="0" width="41" height="144" />
    <rect x="0" y="0" rx="5" ry="5" width="234" height="38" />
    <rect x="27" y="58" rx="5" ry="5" width="73" height="60" />
    <rect x="110" y="58" rx="5" ry="5" width="73" height="60" />
    <rect x="0" y="138" rx="5" ry="5" width="270" height="42" />
    <rect x="0" y="195" rx="5" ry="5" width="130" height="24" />
    <rect x="140" y="195" rx="5" ry="5" width="130" height="24" />
    <rect x="0" y="227" rx="5" ry="5" width="130" height="24" />
    <rect x="140" y="227" rx="5" ry="5" width="130" height="24" />
    <rect x="0" y="259" rx="5" ry="5" width="130" height="24" />
  </ContentLoader>
);

export default Loader;
