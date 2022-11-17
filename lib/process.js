import got from 'got';

/*
get data from endpoint in json format and parse it into a usable rendering format
*/

// set endpoint
const dataLoc = "https://dev-5513w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

export async function getInfo() {

  let jsonContent;
  try {
    jsonContent = await got(dataLoc);
  }catch(error){
    jsonContent.body=[];
  }  
  // convert string into json array object without html tags
  jsonContent.body=(jsonContent.body).replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '');
  const jsonArrObj = JSON.parse(jsonContent.body); 
  // use map() on array to extract properties into new array of obj values
  return jsonArrObj.map(item => {
    return {
      params: {
        id: item.ID.toString(),
        title: item.post_title,
        content: item.post_content,
        date: item.post_date
      }
    }
  });
}

// get IDs from json data at endpoint to be used in dynamic path
export async function getIds() {
  let jsonString;
  try {
    jsonString = await got(dataLoc);
  }catch(error){
    jsonString.body=[];
    console.log(error);
  }
  // convert string into json array object
  const jsonObj = JSON.parse(jsonString.body);

  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
}

 // get rest of data by ID
export async function getFavoriteData(idSelected) {

  let jsonString;
  try {
    jsonString = await got(dataLoc);
  }catch(error){
    jsonString.body=[];
    console.log(error);
  }
  // convert data from file into json array object without html tags
  jsonString.body=(jsonString.body).replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '');
  const jsonObj = JSON.parse(jsonString.body);
  // find object value that matches the ID
  const objMatch = jsonObj.filter(obj => {
    // convert the id to a string
    return obj.ID.toString() === idSelected;
  });

  // extract object value in filtered array if any
  let objFound;
  // if there are more than one set of matched record
  // then only return the dynamic page for the first record
  if (objMatch.length > 0) {
    objFound = objMatch[0];
  // otherwise empty the array of data  
  } else {
    objFound = {};
  }

  // return object value found
  return objFound;
}