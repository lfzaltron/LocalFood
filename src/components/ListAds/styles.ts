import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Ad from '../../types/Ad';
import { DARK_TEXT_COLOR, NORMAL_TEXT_COLOR } from '../../constants';

export const AdList = styled(FlatList as new () => FlatList<Ad>)`
  padding: 12px;
`;

export const AdContainer = styled(RectButton)`
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
`;

export const AdImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 2px;
`;

export const AdInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const AdTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
`;

export const AdMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const AdMetaText = styled.Text`
  margin-left: 8px;
  color: ${NORMAL_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
`;
