import React from 'react';

class CountryDetails extends React.Component{

	
	render(){

		const demographic=this.props.CountryDetail;	
		const sum=(numberFemale,numberMale)=>{
			return parseInt(numberFemale) + parseInt(numberMale);
		}
		return(
			<div className="app-country-statistics">
				<strong>Country: </strong>{demographic.country_of_residence_en}<br/>
				<strong>Year: </strong>{demographic.year}<br/>
				<strong>Female Refugees: </strong>{demographic.female_total_value}<br/>
				<strong>Male Refugees: </strong>{demographic.male_total_value}<br/>
				<strong>Total: </strong>{sum(demographic.female_total_value,demographic.male_total_value)}
			</div>
		);
	
	}

}

export default CountryDetails;