const fetch = require('node-fetch');
const config = require('config');
const GOOGLE_API_BASE_URL = "https://www.googleapis.com/customsearch/v1";

class GoogleSearchResults {

    static async getResults(query) {

        let url = `${GOOGLE_API_BASE_URL}?key=${config.get("google_api_key")}&cx=${config.get("google_custom_search_key")}&q=${query}`;
        let searchResults = [];
        try {
            searchResults = await fetch(url);
            searchResults = await searchResults.json();
        }
        catch(e) {

            console.error(e);
            return "Something went wrong!"
        }

        if(!(searchResults.items && searchResults.items.length)) {

            return `No result found for ${query}`;
        }

        const responseList = [];

        for(let item of searchResults.items.slice(0, 5)) {

            responseList.push(`[${item.title}] [${item.link}]`);
        }

        if(searchResults.items.length < 5) {

            responseList.push(`Only ${searchResults.items.length} results found`);
        }

        return "\n" + responseList.join("\n");
    }
}

module.exports = GoogleSearchResults;