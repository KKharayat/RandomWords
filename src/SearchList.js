import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/Feather';
import randomWords from './randomWordsData';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      inputText: '',
    };
  }

  randomWordsCreator = () => {
    const word = randomWords[Math.floor(Math.random() * randomWords.length)];
    //filtering duplicates from list of text items
    if (this.state.text.length > 0) {
      const duplicateCheck = this.state.text.find(element => element === word);
      let present = duplicateCheck !== undefined ? true : false;
      if (present) {
        if (randomWords.length === this.state.text.length) {
          this.toast.show('Words limit has been reached', 2000);
        }
        if (randomWords.length !== this.state.text.length) {
          return this.randomWordsCreator();
        }
      } else this.setState({text: [...this.state.text, word]});
    }
    if (this.state.text.length === 0) {
      this.setState({text: [...this.state.text, word]});
    }
  };

  render() {
    let filteredData = this.state.text;
    // Searching list
    if (this.state.inputText !== '') {
      let searchText = new RegExp(this.state.inputText, 'ig');
      filteredData = filteredData.filter(item => {
        return searchText.test(item);
      });
    }
    return (
      <View
        style={{flex: 1, paddingHorizontal: 24, backgroundColor: '#D2D5D6'}}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.setState({text: []})}>
            <Icon name="trash-2" size={24} color="#D2D5D6" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            value={this.state.input}
            onChangeText={text => this.setState({inputText: text})}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.randomWordsCreator()}>
            <Icon name="plus" size={24} color="#D2D5D6" />
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={filteredData}
          renderItem={({item}) => {
            return (
              <View style={styles.word}>
                <Text style={{fontSize: 16}}>{item}</Text>
              </View>
            );
          }}
        />
        <Toast
          ref={toast => (this.toast = toast)}
          style={styles.toastStyle}
          position="bottom"
          positionValue={200}
          textStyle={styles.toastText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  word: {
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  textInput: {
    paddingLeft: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 25,
    width: '70%',
    height: 50,
    marginVertical: 6,
  },
  toastStyle: {
    padding: 10,
    width: 280,
    backgroundColor: '#8C8C8C',
    borderColor: '#8C8C8C',
    borderRadius: 50,
    overflow: 'hidden',
  },
  toastText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },
});

export default SearchList;
