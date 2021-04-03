import styled from 'styled-components/native';
import { DARK_TEXT_COLOR, NORMAL_TEXT_COLOR } from '../../constants';

export const Container = styled.View`
  flex: 1;
  margin: 0 20px;
`;

export const Section = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const Label = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${NORMAL_TEXT_COLOR};
  margin-bottom: 8px;
`;
