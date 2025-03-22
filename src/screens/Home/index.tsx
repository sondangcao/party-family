import React, {useEffect, useState} from 'react';
import {
  AppButton,
  AppHeader,
  HorizontalScrollView,
  ImageBg,
  NotificationIcon,
} from '../../components';
import axiosClient from '../../config/axiosConfig';
import {ListItem} from '@rneui/themed';
import {Avatar, Icon} from 'react-native-elements';
import {
  ScrollView,
  Text,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import styles from './styles';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setUserAction} from '../../redux/slices/userSlice';
import {userSelector} from '../../redux/selectors/userSelector';
import {useSelector} from 'react-redux';
import {logoutAction} from '../../redux/slices/authSlice';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<{[key: number]: boolean}>(
    {},
  );
  const [listParty, setListParty] = useState<any>([]);
  const [listDish, setListDish] = useState<any>([]);
  const userProfile = useSelector(userSelector);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = await axiosClient.get('/user/profile');
      const parties = await axiosClient.get('/party/list');
      const dishes = await axiosClient.get('dish/list');
      dispatch(setUserAction(user.data.user));
      setName(`${user.data.user.firstName} ${user.data.user.lastName}`);
      setListParty(parties?.data.parties);
      setListDish(dishes.data?.data);
      setLoading(false);
    })();

    return () => {};
  }, [dispatch]);

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
        title={`Xin chào, ${name}`}
        rightHeader={<NotificationIcon />}
        leftHeader={
          <Avatar source={{uri: userProfile?.avatar}} size={32} rounded />
        }
      />
      <ScrollView>
        {loading ? (
          <View style={styles.view}>
            <Text>Loading...</Text>
          </View>
        ) : (
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
            <HorizontalScrollView data={listDish} />
            <AppButton
              onClick={() => dispatch(logoutAction(false))}
              title="Thêm bữa tiệc của bạn"
              size="sm"
              radius="md"
              type="solid"
              color="#7ED957"
            />
          </View>
        )}
      </ScrollView>
    </ImageBg>
  );
};

export default HomeScreen;
