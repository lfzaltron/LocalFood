import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import {
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
} from '../../constants';
import { TagItem } from '../../types/Tag';

interface TagTextProps {
  checked: boolean;
}
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
