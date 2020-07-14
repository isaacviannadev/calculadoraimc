import * as React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { TextInput, Button } from 'react-native-paper';

const image = {uri: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}

export default class App extends React.Component {
  // valores globais do app
  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    legenda: 'Indeterminado',
    cor: '#bdc3c7'
  };

  zerarIMC = () =>{
    this.setState({
      imc: 0,
      legenda: 'Indeterminado',
      cor: '#bdc3c7',
    });
  };

  calcularIMC = () => {
    const resultado = 
      this.state.peso / (this.state.altura * this.state.altura);

    this.setState({
      imc: Math.ceil(resultado)
    });
    
    if(resultado < 18.5) {
      this.setState({
        legenda: 'Magreza',
        cor: '#e74c3c'
      });
    } else if (resultado >= 18.5 && resultado < 25) {
      this.setState({
        legenda: 'Normal',
        cor: '#2ecc71'
      });
    } else if (resultado >= 25 && resultado < 30) {
     this.setState({
        legenda: 'Sobrepeso',
        cor: '#f1c40f'
      }); 
    } else if (resultado >= 30 && resultado < 40) {
      this.setState({
        legenda: 'Obesidade',
        cor: '#e74c3c'
      }); 
    } else if (resultado >= 40) {
      this.setState({
        legenda: 'Obesidade Grave',
        cor: '#c0392b'
      }); 
    }
  }
  
  render() {
    return (
      <View style={styles.app}>
           <ImageBackground source={image}  blurRadius={1} style={[styles.image,{width: '100%', height:'100%'}]}>
        <Text style={styles.legenda}>
          Seu IMC
        </Text>
        
        <View style={[styles.painel,{backgroundColor: this.state.cor}]}>
          <Text style={styles.resultado}>{this.state.imc}</Text>
          <Text style={styles.diagnostico}>{this.state.legenda}</Text>
        </View>

        <View>
          <TextInput 
            label= 'Peso'
            style={styles.peso} 
            onChangeText={valor =>{
              this.setState({peso: valor.replace(',','.')});
            }}
            />
          <TextInput 
            label= 'Altura'
            style={styles.altura} 
            onChangeText={valor =>{
              this.setState({altura: valor.replace(',','.')});
            }}
            />
          </View>
          <View style= {styles.botao}>
            <Button color='#16a085' mode='contained' onPress={this.calcularIMC}>Calcular</Button>
            <Button style= {styles.botao} color='#f39c12' mode='contained' onPress={this.zerarIMC}>Zerar</Button>
          </View>   
       </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  painel: {
    borderRadius: 7,
    alignSelf: 'center',
    width: 145,
    marginVertical: 10,
    padding: 8,
  },
  legenda: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  resultado: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  diagnostico: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  peso: {
    borderRadius: 8,
    marginVertical: 10,
    width: 250,
    alignSelf: 'center',
  },
  altura: {
    borderRadius: 8,
    marginVertical: 10,
    width: 250,
    alignSelf: 'center',
  },
  botao:{
    marginVertical: 10,
    alignSelf: 'center',
    width: 120,
  },
});

