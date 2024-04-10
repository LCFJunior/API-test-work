//API's: New York Times API   |   OpenGraph API

//Configurações e constantes
require('dotenv').config();
const fetch = require('node-fetch');
const apiKeyNYT = /*your_key*/;
const urlNYT = `https://api.nytimes.com/svc/archive/v1/2022/3.json?&api-key=${apiKeyNYT}`;

//Chamada de função da API do New York Times
fetch(urlNYT)
  .then(response => response.json())
  .then(data => {
    if (data.response && data.response.docs && data.response.docs.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.response.docs.length);
      const randomArticle = data.response.docs[randomIndex]; //Validar apenas um dos artigos

      const articleUrl = randomArticle.web_url; 

      if (!articleUrl || !articleUrl.startsWith('http')) {
        console.error('Invalid article URL:', articleUrl);
        return;
      }

      const openGraphUrl = `https://opengraph.io/api/1.1/site/${encodeURIComponent(articleUrl)}?app_id=${process.env.OPENGRAPH_APP_ID}`;

      fetch(openGraphUrl)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.log('Error fetching Open Graph information:', data.error.message);
          } else {
            console.log('ㅤㅤㅤㅤㅤㅤ-------------------------------------------------------------------------------------------------------------------------------------------------------------------ㅤㅤㅤㅤㅤㅤ')
            console.log('ㅤ')
            console.log('ㅤTITLE:', data.hybridGraph.title );
            console.log('ㅤ')
            console.log('ㅤDESCRIPTION:', data.hybridGraph.description);
            console.log('ㅤ')
            console.log('ㅤIMAGE:', data.hybridGraph.image);
            console.log('ㅤ')
            console.log('ㅤPAGE URL:', articleUrl);
            console.log('ㅤ')
            console.log('ㅤㅤㅤㅤㅤㅤ-------------------------------------------------------------------------------------------------------------------------------------------------------------------ㅤㅤㅤㅤㅤㅤ')
          }
        })
        .catch(error => console.error('Error fetching Open Graph information:', error));
    } else {
      console.log('No documents found.');
    }
  })
  .catch(error => console.error('Error fetching NYT request:', error));
