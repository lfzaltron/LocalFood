import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const ImageButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const Image = styled.Image`
  height: 250px;
  width: 350px;
  align-self: center;
`;
