import { config } from '../../config';

const httpGetAsync = (method, url) => {
    return new Promise(function(resolve, reject) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open(method, url);
        httpRequest.send();
        httpRequest.onload = () => {
            const data = JSON.parse(httpRequest.responseText);
            resolve(data);
        };
        httpRequest.onerror = reject;
    });
};

const baseUrl = 'https://rest.bandsintown.com';

export const getArtistInformationApi = (query) =>
    httpGetAsync('GET', `${baseUrl}/artists/${query}?app_id=${config.bandsintownToken}`);

export const getArtistEventsApi = (artistName) =>
    httpGetAsync('GET', `${baseUrl}/artists/${artistName}/events?app_id=${config.bandsintownToken}&date=all`);
