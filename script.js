const url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"

async function fetchdata(){

   let feetching = new Promise((resolve,reject)=>{
    let request = fetch(url)
    // console.log(request)
    request.then((Requestdata)=>{
      // console.log(data)
      if(Requestdata.status==200){
        console.log("haa milgay")
        resolve (Requestdata.json())
      }
      else{
        console.log("nahi milgay")
        reject(Requestdata.statusText)
      }
    })
    })
    let Feetchdata = await feetching
    return Feetchdata
    
  }

fetchdata().then(objectdata =>{
  let tabledata=""
  objectdata.map((values)=>{
  
    // this function will change the number to currency
    let number1 = values.current_price;
      let current_price = new Intl.NumberFormat("en-US",{
        style: 'currency',
        currency:'USD'
      }).format(number1);
    let number2 = values.market_cap_change_24h;
      let market_cap_change_24h = new Intl.NumberFormat("en-US",{
        style: 'currency',
        currency:'USD'
      }).format(number2);
    let number3 = values.market_cap;
      let market_cap = new Intl.NumberFormat("en-US",{
        style: 'currency',
        currency:'USD'
      }).format(number3);
      // ---------
      // varible for display data
      tabledata +=
      `<tr style="Border-bottom:2px solid white">
      <td><img src="${values.image}">    ${values.name}</td>
      <td>${(values.symbol).toUpperCase()}</td>
      <td>${current_price}</td>
      <td>${market_cap_change_24h}</td>
      <td class ="${values.price_change_percentage_24h > 0 ? "positive": "negative"}"> ${parseFloat(values.market_cap_change_percentage_24h).toFixed(2)}% </td>
      <td>Mkt Cap: ${market_cap}</td> 
      </tr>`;
  })
  document.getElementById("table_body").innerHTML=tabledata;
})

fetchdata().catch(err => {
  alert("Something Went Wrong");
})
