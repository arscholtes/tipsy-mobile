import React from 'react';
import Expo from "expo";
import { StyleSheet, Text, View } from 'react-native';
import { 
  Body, 
  Button, 
  Container, 
  Content, 
  Footer,
  FooterTab,
  Header, 
  Icon,
  Left, 
  Right, 
  Title
} from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });

    this.setState({isLoading: false});
  }

  render() {
    if (this.state.isLoading) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Tipster</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>The Iron Yard</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
