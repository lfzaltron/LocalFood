import React from 'react';

import { HeaderContainer, HeaderTitle } from './styles';

const Header: React.FC = ({ children }) => (
  <HeaderContainer>
    <HeaderTitle>{children}</HeaderTitle>
  </HeaderContainer>
);

export default Header;
