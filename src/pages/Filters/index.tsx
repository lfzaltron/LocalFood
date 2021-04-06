import React, { useCallback, useEffect, useRef, useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';
import firestore from '@react-native-firebase/firestore';
import { Slider } from 'react-native-elements';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ListTags from '../../components/ListTags';
import { useGeolocation } from '../../hooks/geolocation';
import { TagItem } from '../../types/Tag';
import { useFilter } from '../../hooks/filter';

import {
  DARK_TEXT_COLOR,
  HIGHLIGHT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
} from '../../constants';

import { Container, Label, Section } from './styles';

interface PriceFormContent {
  minPrice: number;
  maxPrice: number;
}

const Filters: React.FC = () => {
  const {
    order,
    setOrder,
    setPosition,
    maxDistance,
    setMaxDistance,
    tags,
    setTags,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
  } = useFilter();
  const [orderBy, setOrderBy] = useState(
    // eslint-disable-next-line no-nested-ternary
    order === 'date' ? 0 : order === 'distance' ? 1 : 2,
  );
  const [distance, setDistance] = useState(maxDistance);
  const [rating, setRating] = useState(minRating);
  const [tagItems, setTagItems] = useState<TagItem[]>([]);
  const formRef = useRef<FormHandles>(null);
  const { currentPosition, updateCurrentPosition } = useGeolocation();
  const { goBack } = useNavigation();

  const handleClearPress = useCallback(() => {
    setDistance(100);
    setTagItems(
      tagItems.map(t => {
        return { ...t, checked: false };
      }),
    );
    setRating(0);
    formRef.current?.clearField('minPrice');
    formRef.current?.clearField('maxPrice');
  }, [tagItems]);

  const handleDoFilterPressed = useCallback(
    (data: PriceFormContent) => {
      switch (orderBy) {
        case 0:
          setOrder('date');
          break;
        case 1:
          setOrder('distance');
          break;
        case 2:
          setOrder('rating');
          break;
        default:
          break;
      }
      setPosition(currentPosition);
      setMaxDistance(distance);
      setMinRating(rating);
      setTags(tagItems.filter(item => item.checked).map(item => item.tag));
      setMinPrice(data.minPrice);
      setMaxPrice(data.maxPrice);
      goBack();
    },
    [
      currentPosition,
      distance,
      goBack,
      orderBy,
      rating,
      setMaxDistance,
      setMaxPrice,
      setMinPrice,
      setMinRating,
      setOrder,
      setPosition,
      setTags,
      tagItems,
    ],
  );

  const fetchTags = useCallback(async () => {
    const tagsCollection = await firestore().collection('Tags').get();

    setTagItems(
      tagsCollection.docs.map(item => ({
        checked: !!tags.find(t => t.title === item.id),
        tag: { title: item.id },
      })),
    );
  }, [tags]);

  useEffect(() => {
    fetchTags();
    updateCurrentPosition();
  }, [fetchTags, updateCurrentPosition]);

  const selectTag = useCallback(
    (tag: TagItem) => {
      setTagItems(
        tagItems.map(item => {
          // eslint-disable-next-line no-param-reassign
          if (item.tag === tag.tag) item.checked = !item.checked;
          return item;
        }),
      );
    },
    [tagItems],
  );

  const options = [
    { label: 'Data', value: 0 },
    { label: 'Distância', value: 1 },
    { label: 'Avaliação', value: 2 },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
      enabled
    >
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <Container>
          <Section>Ordenar por</Section>
          <SwitchSelector
            options={options}
            initial={orderBy}
            onPress={v => setOrderBy(v as number)}
            textColor={DARK_TEXT_COLOR}
            selectedColor={DARK_TEXT_COLOR}
            buttonColor={LIGHT_HIGHLIGHT_COLOR}
            borderColor={LIGHT_HIGHLIGHT_COLOR}
          />
          <Section>Filtros</Section>
          <Label>
            {distance && distance < 100
              ? `Distância: até ${distance} kilômetros`
              : 'Distância: qualquer'}
          </Label>
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
          <Label>{`Avaliação mínima: ${rating.toFixed(1)}`}</Label>
          <Slider
            value={rating}
            maximumValue={5}
            minimumValue={0}
            step={0.1}
            onValueChange={setRating}
            minimumTrackTintColor={HIGHLIGHT_COLOR}
            maximumTrackTintColor={NORMAL_TEXT_COLOR}
            thumbTintColor={HIGHLIGHT_COLOR}
            thumbStyle={{ height: 30, width: 30 }}
          />
          <Label>Tags</Label>
          <ListTags tags={tagItems} onSelect={selectTag} />
          <Label>Preço (R$)</Label>
          <Form
            ref={formRef}
            onSubmit={handleDoFilterPressed}
            initialData={{
              minPrice: minPrice ? `${minPrice}` : '',
              maxPrice: maxPrice ? `${maxPrice}` : '',
            }}
          >
            <Input
              name="minPrice"
              icon=""
              placeholder="Mínimo"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="decimal-pad"
              returnKeyType="default"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Input
              name="maxPrice"
              icon=""
              placeholder="Máximo"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="decimal-pad"
              returnKeyType="default"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={handleClearPress}>Limpar</Button>
            <Button onPress={() => formRef.current?.submitForm()}>
              Filtrar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Filters;
