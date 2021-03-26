import styled from 'styled-components/native';
import { DARK_TEXT_COLOR, LIGHT_HIGHLIGHT_COLOR } from '../../constants';

export const Container = styled.View`
  flex: 1;
`;

export const SellerDataContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  height: 150px;
  width: 100%;
  background-color: ${LIGHT_HIGHLIGHT_COLOR};
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
`;

export const NameText = styled.Text`
  font-size: 24px;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Medium';
`;

export const PhoneContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const PhoneText = styled.Text`
  font-size: 20px;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
  margin-left: 10px;
`;

export const Avatar = styled.View`
  background-color: ${DARK_TEXT_COLOR};
  height: 100px;
  width: 100px;
  margin-top: -50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
