import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  SMOOTH_HIGHLIGHT_COLOR,
} from '../../constants';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${LIGHT_HIGHLIGHT_COLOR};
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: ${LIGHT_HIGHLIGHT_COLOR};

  ${props =>
    props.isFocused &&
    css`
      border-color: ${SMOOTH_HIGHLIGHT_COLOR};
    `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;
