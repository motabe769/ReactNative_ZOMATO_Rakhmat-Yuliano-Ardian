import React, { Component } from 'react';
import { Container, Header, Content, Footer, Thumbnail, Text, Icon, Button, Item, Input, View, Card, CardItem,
  List, ListItem, Left, Right,Body} from 'native-base';
import { ScrollView,Image }from 'react-native';
import axios from 'axios';

class App extends Component{

  constructor(){
    super();
    this.state={resto:[],nama:''};
  }

  klik(){
    var Nama=this.state.nama;
    var url ='https://developers.zomato.com/api/v2.1/search?q='+Nama;
    var config = {
      headers:{'user-key':'98a10a3a45a70e3c3e9e85c3b95193cd'}
    };
    axios.get(url, config).then((ambilData)=>{
      console.log(ambilData.data);
      this.setState({
      resto: ambilData.data.restaurants
      })
    })
  }
  componentDidMount(){}
  render() {
    const data=this.state.resto.map((item,index)=>{
      var namaResto = [item.restaurant.name];
      var kotaResto = [item.restaurant.location.city];
      var alamatResto = [item.restaurant.location.address];
      var hargaMakanan = [item.restaurant.average_cost_for_two];
      var hargaMakanan2 = hargaMakanan/2;
      var gambarResto = item.restaurant.thumb;
      if (gambarResto==''){
        gambarResto="https://cdn2.iconfinder.com/data/icons/customer-support-4/32/48_error_page_not_found_bug_maintenance-128.png"
      }
      return(
         <Card avatar key={index}>
              <CardItem header>
                <Left>
                  <Thumbnail source={{uri:gambarResto}}/>
                  <Body>
                    <Text>{namaResto}</Text>
                    <Text note>{kotaResto}</Text>
                    </Body>
                </Left>
                <Right>
                  <Text>Rp.{hargaMakanan2},-</Text>
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri:gambarResto}} style={{height:400,width:400,flex:1}}/>
              </CardItem>
              <CardItem footer>
                <Left>
                    <Icon name="navigate"/>
                    <Text>{alamatResto}</Text>
                </Left>
              </CardItem>
            </Card>
          )
        }
      )
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Button transparent onPress={()=>this.klik()}><Icon name="search"/></Button>
          <Input placeholder="Cari restoran..." onChangeText={(x)=>{this.setState({nama:x})}} />
        </Item>
      </Header>
        <ScrollView>
          {data}
        </ScrollView>
     </Container>
    );
  }
}
export default App;