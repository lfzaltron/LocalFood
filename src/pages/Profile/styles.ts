import styled from 'styled-components/native';
import {
  DARK_TEXT_COLOR,
  HIGHLIGHT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
} from '../../constants';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 16px;
`;

export const Header = styled.View`
  height: 150px;
  width: 100%;
  background-color: ${LIGHT_HIGHLIGHT_COLOR};
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
`;

export const NameButton = styled.TouchableOpacity``;

export const NameText = styled.Text`
  font-size: 24px;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Medium';
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

export const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 40px 24px 20px;
  justify-content: space-between;
`;

export const UpdateLocationButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 20px 0;
`;

export const UpdateLocationText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: ${HIGHLIGHT_COLOR};
  font-size: 18px;
  margin-left: 16px;
`;
