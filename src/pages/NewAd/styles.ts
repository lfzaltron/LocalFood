import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';

import { NORMAL_TEXT_COLOR, BACKGROUND_COLOR } from '../../constants';

export const Container = styled.View`
  flex: 1;
`;

export const ImageButton = styled.TouchableOpacity`
  height: 250px;
  margin-bottom: 8px;
`;

export const Image = styled.Image`
  flex: 1;
`;

export const AddImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  border-style: dashed;
  border-width: 2px;
  border-color: ${NORMAL_TEXT_COLOR};
  margin: 10px 10px 0;
`;

export const AddImageText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  color: ${NORMAL_TEXT_COLOR};
`;

export const Form = styled(Unform)`
  margin: 0 8px;
`;

export const Loading = styled.ActivityIndicator`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  z-index: 1;
  background-color: ${BACKGROUND_COLOR};
  opacity: 0.8;
`;
