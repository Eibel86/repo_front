// const fetch = require("node-fetch")

const apiFetch = async (url, method = "GET", header = {}, body = {}) => {
    const options = {};

    if (method == "POST" || method == "PUT") {
        options.headers = { 'Content-Type': 'application/json', ...header }
        options.method = method;
        options.body = JSON.stringify(body);

    } else if (method == "GET" || method == "DELETE") {
        options.headers = { 'Content-Type': 'application/json', ...header }
        options.method = method;
    }
    try {
        const result = await fetch(url, options);
        if (result.ok) {
            return await result.json();
        } else {
            throw await result.json();
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    apiFetch
}