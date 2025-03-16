import {Badge, Card} from '@rneui/base';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../Button';
const {width} = Dimensions.get('window');
const HorizontalScrollView = ({data}: {data: any[]}) => {
  const colors = ['red', 'blue', 'green', 'orange'];
  return (
    <View style={styles.view}>
      <View style={styles.view3}>
        <Text style={styles.dishTitle}>Các món ăn đã tạo</Text>
        <AppButton
          onClick={() => {}}
          title="Thêm món"
          size="sm"
          radius="md"
          type="solid"
          color="red"
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => console.log('Card clicked!', item.id)}
            activeOpacity={0.9}>
            <Card
              key={item.id}
              containerStyle={[
                styles.tile,
                index !== data.length - 1 ? styles.card : styles.mr8,
              ]}>
              <Text style={styles.title}>{`Tên món: ${item.name}`}</Text>
              <Text style={styles.title}>Nguyên liệu:</Text>
              <View style={styles.view2}>
                {item.ingredient?.map((it: string, idx: number) => (
                  <Badge
                    key={idx}
                    value={it}
                    textStyle={styles.ingredient}
                    containerStyle={styles.mr4}
                    badgeStyle={[
                      styles.badge,
                      {
                        backgroundColor: colors[idx % colors.length],
                      },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.title}>Cách chế biến:</Text>
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
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 30,
  },
  mr4: {
    margin: 4,
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  view3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
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
  ingredient: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default HorizontalScrollView;
