import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import firestore from '@react-native-firebase/firestore';
import { Slider } from 'react-native-elements';

import Button from '../../components/Button';
import ListTags from '../../components/ListTags';
import { useGeolocation } from '../../hooks/geolocation';
import { TagItem } from '../../types/Tag';

import {
  DARK_TEXT_COLOR,
  HIGHLIGHT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
} from '../../constants';

import { Container, Label, Section } from './styles';

const Filters: React.FC = () => {
  const [distance, setDistance] = useState(1);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    distancia: 0,
  });
  const {
    currentPosition,
    getDistanceToCurrentPosition,
    updateCurrentPosition,
  } = useGeolocation();

  const handleCurrentLocationPressed = useCallback(async () => {
    updateCurrentPosition();
  }, [updateCurrentPosition]);

  useEffect(() => {
    const distancia = getDistanceToCurrentPosition({
      latitude: -30.0429672,
      longitude: -51.217359,
    });
    setLocation({ ...currentPosition, distancia: distancia || 0 });
  }, [currentPosition, getDistanceToCurrentPosition]);

  const fetchTags = useCallback(async () => {
    const tagsCollection = await firestore().collection('Tags').get();

    setTags(
      tagsCollection.docs.map(item => ({
        checked: false,
        tag: { title: item.id },
      })),
    );
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const selectTag = useCallback(
    (tag: TagItem) => {
      setTags(
        tags.map(item => {
          // eslint-disable-next-line no-param-reassign
          if (item.tag === tag.tag) item.checked = !item.checked;
          return item;
        }),
      );
    },
    [tags],
  );

  const options = [
    { label: 'Data', value: 'date' },
    { label: 'Distância', value: 'distance' },
  ];

  return (
    <Container>
      <Section>Ordenar por</Section>
      <SwitchSelector
        options={options}
        initial={0}
        onPress={value => console.log(`Call onPress with value: ${value}`)}
        textColor={DARK_TEXT_COLOR} // '#7a44cf'
        selectedColor={DARK_TEXT_COLOR}
        buttonColor={LIGHT_HIGHLIGHT_COLOR}
        borderColor={LIGHT_HIGHLIGHT_COLOR}
      />
      <Section>Filtros</Section>
      <Label>{`Distância: até ${distance} kilômetros`}</Label>
      <Slider
        value={distance}
        maximumValue={100}
        minimumValue={1}
        step={1}
        onValueChange={setDistance}
        minimumTrackTintColor={HIGHLIGHT_COLOR}
        maximumTrackTintColor={NORMAL_TEXT_COLOR}
        thumbTintColor={HIGHLIGHT_COLOR}
        thumbStyle={{ height: 30, width: 30 }}
      />

      <Label>Tags</Label>
      <ListTags tags={tags} onSelect={selectTag} />
      <Label>Preço</Label>

      <Button onPress={handleCurrentLocationPressed}>Localizar!</Button>
      <Text>
        Latitude:
        {location.latitude}
      </Text>
      <Text>
        Longitude:
        {location.longitude}
      </Text>
      <Text>
        Distancia:
        {location.distancia}
      </Text>
    </Container>
  );
};

export default Filters;
