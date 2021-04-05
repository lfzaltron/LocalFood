import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { DARK_TEXT_COLOR, LIGHT_HIGHLIGHT_COLOR } from '../../constants';

export const Container = styled.View`
  flex: 1;
`;

export const UserData = styled.View`
  margin: 20px;
  padding: 10px 0 0;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
`;

export const NameText = styled.Text`
  font-size: 20px;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`;

export const Form = styled(Unform)`
  margin: 0 20px;
`;

export const RatingView = styled.View`
  margin: 20px;
`;
