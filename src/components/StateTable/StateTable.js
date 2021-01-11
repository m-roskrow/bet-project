import React from 'react';
import useAxios from 'axios-hooks';
import TableCustom from './TableCustom.js';
  
  export default function StateTable(props) {
    
    const [sport] = React.useState(props.sport);
    const [region] = React.useState(props.region);
    const [market, setMarket] = React.useState(props.market);
    const [oddsFormat, setOddsFormat] = React.useState(props.oddsFormat);
    const [apiKey] = React.useState(props.apiKey);
    const [sportType] = React.useState(props.sportType);
    const updateProps = (newProps) => {setMarket(newProps.market); setOddsFormat(newProps.oddsFormat)}
    
    React.useEffect(() => 
      updateProps(props),
      [props.market, props.oddsFormat]
    );

    const apiLink = "https://api.the-odds-api.com/v3/odds/?sport=" + sport + "&region=" + region + "&mkt=" + market + "&dateFormat=iso&oddsFormat=" + oddsFormat + "&apiKey=" + apiKey;
    const [{ data, loading, error }, refetch] = useAxios(
      apiLink
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    
   
    return (
        <div>
       <p>Click an arrow next to a feature to expand that row</p>
          
        <TableCustom data={data} sportType={sportType} market={market}></TableCustom>
        </div>
        );
}