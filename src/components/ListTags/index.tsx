import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { TagItem } from '../../types/Tag';
import { HIGHLIGHT_COLOR, NORMAL_TEXT_COLOR } from '../../constants';

import { ListContainer, TagContainer, TagList, TagText } from './styles';

interface ListTagsProps {
  tags: TagItem[];
  onSelect(tag: TagItem): void;
}

const ListTags: React.FC<ListTagsProps> = ({ tags, onSelect }) => {
  return (
    <ListContainer>
      <TagList
        data={tags}
        keyExtractor={item => item.tag.title}
        renderItem={({ item }) => (
          <TagContainer onPress={() => onSelect(item)}>
            <TagText checked={item.checked}>{item.tag.title}</TagText>
            <Icon
              name={item.checked ? 'check-circle' : 'circle'}
              size={20}
              color={item.checked ? HIGHLIGHT_COLOR : NORMAL_TEXT_COLOR}
            />
          </TagContainer>
        )}
      />
    </ListContainer>
  );
};

export default ListTags;
