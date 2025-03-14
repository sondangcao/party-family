import React, {useEffect, useState} from 'react';
import {
  AppHeader,
  HorizontalScrollView,
  ImageBg,
  NotificationIcon,
} from '../../components';
import axiosClient from '../../config/axiosConfig';
import {ListItem} from '@rneui/themed';
import {Icon} from 'react-native-elements';
import {
  ScrollView,
  Text,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import styles from './styles';

const HomeScreen = () => {
  const [name, setName] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<{[key: number]: boolean}>(
    {},
  );
  const [listParty, setListParty] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const user = await axiosClient.get('/user/profile');
      const parties = await axiosClient.get('/party/list');
      setName(`${user.data.user.firstName} ${user.data.user.lastName}`);
      setListParty(parties?.data.parties);
    })();

    return () => {};
  }, []);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleAccordion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <ImageBg>
      <AppHeader
        title={`Xin chao, ${name}`}
        rightHeader={<NotificationIcon />}
      />
      <ScrollView>
        <View style={styles.view}>
          <View style={styles.partyWrapper}>
            <Text style={styles.partyTitle}>Những bữa tiệc sắp tới</Text>
            {listParty.map((item: any, index: number) => (
              <ListItem.Accordion
                key={index}
                content={
                  <>
                    <Icon
                      name="party-popper"
                      type="material-community"
                      size={20}
                      style={styles.mr8}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{item.name}</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={!!expandedItems[index]}
                onPress={() => toggleAccordion(index)}>
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item.description}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </ListItem.Accordion>
            ))}
          </View>
          <HorizontalScrollView
            data={[
              {title: 'Party 1', description: 'https://example.com/image1.jpg'},
              {title: 'Party 2', description: 'https://example.com/image2.jpg'},
              {title: 'Party 3', description: 'https://example.com/image3.jpg'},
            ]}
          />
        </View>
      </ScrollView>
    </ImageBg>
  );
};

export default HomeScreen;
