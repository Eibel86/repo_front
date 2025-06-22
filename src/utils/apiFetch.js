// const fetch = require("node-fetch")


/**
 * Realiza una petición HTTP genérica al backend y gestiona la respuesta JSON.
 *
 * @async
 * @function apiFetch
 * @param {string} url               - URL completa del endpoint al que hacer la petición.
 * @param {string} [method="GET"]    - Método HTTP a usar ("GET", "POST", "PUT", "DELETE").
 * @param {Object} [header={}]       - Encabezados adicionales a incluir en la petición.
 * @param {Object} [body={}]         - Cuerpo de la petición para métodos "POST" o "PUT".
 * @returns {Promise<Object>}        - Resuelve con el JSON de la respuesta si el estado es OK.
 * @throws {Object}                  - Lanza el JSON de error si el estado no es OK o falla la conexión.
 *
 * @example
 * // GET sin body
 * const data = await apiFetch("https://api.example.com/items", "GET", { Authorization: "Bearer token" });
 *
 * @example
 * // POST con body
 * const payload = { name: "Nueva película" };
 * const result = await apiFetch("https://api.example.com/create", "POST", {}, payload);
 */
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
        console.log(url)
        console.log(options)
        if (result.ok) {
            return await result.json();
        } else {
            throw await result.json();
        }
    } catch (error) {
        throw error;
    }
}


/**
 * Exporta la función utilitaria para realizar peticiones HTTP al backend.
 *
 * @module utils/apiFetch
 * @property {Function} apiFetch - Función genérica para fetch con JSON.
 */
module.exports = {
    apiFetch
}