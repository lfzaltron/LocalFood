import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  SMOOTH_HIGHLIGHT_COLOR,
} from '../../constants';

interface ContainerProps {
  isFocused: boolean;
  numberOfLines: number;
}

interface InputProps {
  numberOfLines: number;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${props => props.numberOfLines * 22 + 38}px;
  padding: 16px 16px;
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

export const TextInput = styled.TextInput<InputProps>`
  flex: 1;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  height: ${props => props.numberOfLines * 22}px;
  min-height: 60px;
`;
