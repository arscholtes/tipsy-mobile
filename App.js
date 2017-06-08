import React from 'react';
import Expo from "expo";
import { StyleSheet, Text, View } from 'react-native';
import getSymbol from "currency-symbol-map";
import {getTip, getTotal} from "tipsy";
import { 
  Body, 
  Button, 
  Card,
  Container, 
  Content, 
  Footer,
  FooterTab,
  Form,
  Header, 
  Icon,
  Input,
  Item,
  Label,
  Left, 
  Picker,
  Right, 
  Title,
} from "native-base";

import R from "ramda";


const mapI = R.addIndex(R.map);


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      currency: "USD",
      bill: 0,
      percentage: 20,
      tip: 0,
      party: 1,
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

  componentDidMount() {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then(response => {
        if(response.ok) {
          return response.json();
        }
      })
      .then(json => {
        const currencies = R.keys(json);
        this.setState({ currencies });
      });
  }

  updateCurrency = currency => {
    this.setState({ currency });
  }

  updateBill = text => {
    this.setState({ bill: parseFloat(text, 10) || 0 });
  }

  updateTip = text => {
    this.setState({ tip: parseInt(text, 10) || 0 });
  }

  updateParty = text => {
    this.setState({ party: parseInt(text, 10) || 0 });
  }

  render() {
    if (this.state.isLoading) {
      return <Expo.AppLoading />;
    }

    const {bill, percentage, party, currencies, currency} = this.state;
    const tip = getTip(bill, percentage, party);
    const total = getTotal(bill, percentage, party);

    return (
      <Container>
        <Header>
          <Body>
            <Title>Tipsy: Mobile</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Label>Currency</Label>
            <Picker 
              onValueChange={this.updateCurrency}
              selectedValue={currency}
              androidHeader="Currency"
            >
              {mapI(
                (c, i) => (
                  <Picker.Item key={i} label={c} value={c} /> 
                ),
                currencies
              )}
            </Picker>
            <Item floatingLabel>
              <Label>Bill Total</Label>
              <Input 
                defaultValue="0"
                onChangeText={this.updateBill} />
            </Item>
            <Item floatingLabel>
              <Label>Tip Percentage</Label>
              <Input 
                defaultValue="20"
                onChangeText={this.updateTip} 
              />
            </Item>
            <Item floatingLabel>
              <Label>Members in Party</Label>
              <Input 
                defaultValue="1"
                onChangeText={this.updateParty} 
              />
            </Item>
            <Label>Amount to tip: </Label>
            <Label>{getSymbol(currency) + tip.toFixed(2)}</Label>
            {party > 1 && <Text> per person</Text>}
            <Label>Total bill: </Label>
            <Label>
              {(getSymbol(currency) || "?") + total.toFixed(2)}
            </Label>
            {party > 1 && <Text> per person</Text>}
          </Form>
        </Content>
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
