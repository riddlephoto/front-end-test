
const BaseUrl = 'https://content.guardianapis.com';
const key = process.env.REACT_APP_NEWS_API_KEY

export const fetchNewsData = async(url) => {
  try { 

    const response = await fetch(`${BaseUrl}/${url}&api-key=${key}`);
    const data = await response.json();

    return data;
    
  } catch(error) {

    console.error("Fetching Error")
  }
}

export const fetchNewsDetail = async(id) => {
  try { 

    const response = await fetch(`${BaseUrl}/${id}&api-key=${key}`);
    const data = await response.json();

    return data;
    
  } catch(error) {

    console.error("Fetching Error")
  }
}
