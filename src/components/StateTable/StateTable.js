import React from 'react';
import useAxios from 'axios-hooks';
import TableCustom from './TableCustom.js';
import GameSearch from 'components/Select/GameSearch.js';
  
  export default function StateTable(props) {
    const [state, setState] = React.useState(props.state)
    const [sport] = React.useState(props.sport);
    const [region] = React.useState(props.region);
    const [market, setMarket] = React.useState(props.market);
    const [oddsFormat, setOddsFormat] = React.useState(props.oddsFormat);
    const [apiKey] = React.useState(props.apiKey);
    const [sportType] = React.useState(props.sportType);
    const [filter, setFilter] = React.useState("");
    const [customData, setCustomData] = React.useState({"success": false, "data": []})
    const [hasUpdated, setHasUpdated] = React.useState(false);

    const updateProps = (newProps) => 
      {setMarket(newProps.market); 
      setOddsFormat(newProps.oddsFormat); 
      setState(newProps.state);}
    
    React.useEffect(() => 
      updateProps(props),
      [props.market, props.oddsFormat, props.state]
    );
   // https://fxe3hhzmk9.execute-api.us-east-2.amazonaws.com/beta/odd - API link to request in format {sport, region, market, oddsFormat}
   // OLD DIRECT ODDS API REQ 
   /*const apiLink = "https://api.the-odds-api.com/v3/odds/?sport=" + sport + "&region=" + region + "&mkt=" + market + "&dateFormat=iso&oddsFormat=" + oddsFormat + "&apiKey=" + apiKey;
    const [{ data, loading, error }, refetch] = useAxios(
      apiLink,  
    )
    if (loading) {console.log("API loaded"); return <p>Loading...</p>}
    if (error) return <p>Error fetching API data!</p>*/
    if (!hasUpdated){
      setHasUpdated(true);  
      var url = "https://fxe3hhzmk9.execute-api.us-east-2.amazonaws.com/beta/odd";
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json");
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            
            console.log(xhr.status);
            setCustomData(JSON.parse(JSON.parse(JSON.parse(xhr.responseText).body)));            
        }};
      var data2 = JSON.stringify({"sport": sport, "region": region, "market": market, "oddsFormat": oddsFormat});    
      xhr.send(data2);
  }  
    const handleChangeSearch = (newValue) => {setFilter(newValue);};
   
    return (
        <div>
          <div>
            <p>Click an arrow next to a fixture to show all available odds for that fixture. To filter by team use the search box below.</p>
            <GameSearch onChange={handleChangeSearch}></GameSearch>  
          </div>
        <TableCustom data={customData} sportType={sportType} market={market} state={state} filter={filter} oddsFormat={oddsFormat}></TableCustom>
        </div>
        );
}