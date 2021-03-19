import styled from 'styled-components/native';
import { FlatList, Platform } from 'react-native';
import { Form as Unform } from '@unform/mobile';

import { TagItem } from '.';

import {
  NORMAL_TEXT_COLOR,
  BACKGROUND_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  DARK_TEXT_COLOR,
} from '../../constants';

interface TagTextProps {
  checked: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding-bottom: 16px;
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

export const ListContainer = styled.View`
  width: 100%;
  height: 160px;
  padding: 16px 16px;
  background: ${LIGHT_HIGHLIGHT_COLOR};
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: ${LIGHT_HIGHLIGHT_COLOR};
`;

export const TagList = styled(FlatList as new () => FlatList<TagItem>)``;

export const TagContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
`;

export const TagText = styled.Text<TagTextProps>`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${props => (props.checked ? DARK_TEXT_COLOR : NORMAL_TEXT_COLOR)};
`;
