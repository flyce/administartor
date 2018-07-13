import config from '../Config/env';
import { getItem } from "./storage";

export function get(url, containUserInfo = true) {
    let headers;
    if(containUserInfo) {
        const auth = getItem("token");
        headers = {
            auth,

            'Content-Type': 'application/json'
        }
    } else {
        headers = {
            'Content-Type': 'application/json'
        }
    }
    const result = fetch(config.url + url, {
        headers
    }).then(function (response) {
        return response.json();
    });
    return result;
}

export function post(url, json, containUserInfo = true) {
    let headers;
    if(containUserInfo) {
        const auth = getItem("token");
        headers = {
            auth,

            'Content-Type': 'application/json'
        }
    } else {
        headers = {
            'Content-Type': 'application/json'
        }
    }
    const result = fetch(config.url + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(json)
    }).then(function (response) {
        return response.json();
    });

    return result;
}