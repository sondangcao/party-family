import {Card} from '@rneui/base';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('window');
const HorizontalScrollView = ({data}: {data: any[]}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.dishTitle}>Các món ăn đã tạo</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => console.log('Card clicked!', index)}
            activeOpacity={0.9}>
            <Card
              key={item.id}
              containerStyle={[
                styles.tile,
                index !== data.length - 1 ? styles.card : styles.mr8,
              ]}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FF99FF',
    padding: 8,
    borderRadius: 8,
  },
  dishTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  card: {
    margin: 0,
    marginRight: 8,
  },
  mr8: {
    margin: 0,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  tile: {
    width: width - 48,
    minHeight: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HorizontalScrollView;
