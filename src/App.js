import React, { Component } from 'react';
// import fetch from 'fetch';
import logo from './images/cyf.png';
import './styles/App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import ListOfYears from './components/ListOfYears';
import Display from './components/Display';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: [],
      listOfYears:[],
      countryData: {},
      countryCode: 'TUR',
      Year: '2013',
      displayDetail:false
    }
    //this.hundleCountryCode=this.hundleCountryCode.bind(this);
   // this.hundleYear=this.hundleYear.bind(this);
}
  
  render() {
    return (
      <div className="App">
        <div className="app-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>UNHCR Data Browser</h2>
        </div>
        <div className="app-search-box">
          <div>
            Country: <CountriesList countries={this.state.countriesList}  defalultValue={this.state.countryCode} getCountryCode={this.hundleCountryCode}/>
            Year: <ListOfYears defalutYear={this.state.Year} listOfYear={this.state.listOfYears} getYear={this.hundleYear} />
          </div>
          <button  onClick={this.hundleClick} type="submit">Retrieve Country statistics</button>
          <Display if={this.state.displayDetail}>
            <CountryDetails CountryDetail={this.state.countryData}/>
          </Display>          
        </div>        
      </div>
    );
  }
  
  hundleClick=()=>{
      this.getCountryStatistics(this.state.countryCode,this.state.Year);
      this.state.countryData ? this.setState({ displayDetail: true }) : this.setState({ displayDetail: false })
  };

  hundleCountryCode=(Code)=>{
    this.setState({ countryCode: Code });
  };

  hundleYear=(year)=>{
    this.setState({ Year: year});
  };

  componentDidMount=()=>{
      this.getCountriesList();
      this.getYears();
  };
  
  getCountriesList=()=>{
    fetch('http://data.unhcr.org/api/stats/country_of_residence.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ countriesList: data } );
      });
  };

  getYears=()=>{
    fetch('http://data.unhcr.org/api/stats/time_series_years.json')
    .then(response => response.json())
    .then(data=>{
      this.setState({listOfYears: data })
    });
  };
  
  getCountryStatistics=(countryCode, year)=>{
    const url = 'http://data.unhcr.org/api/stats/demographics.json?country_of_residence=' + countryCode + '&year=' + year;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      //The data comes back as an array, we take the first element of the array as it contains our country data
      this.setState({ countryData: data[0]})
    });
  };
  
}

export default App;
