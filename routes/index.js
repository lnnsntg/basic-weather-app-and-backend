const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require('apicache')

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_PARAM = process.env.API_KEY_PARAM;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const UNITS_PARAM = process.env.UNITS_PARAM;
const UNITS_VALUE = process.env.UNITS_VALUE;

// Init cache
let cache = apicache.middleware

router.get("/", cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_PARAM]: API_KEY_VALUE,
            [UNITS_PARAM]: UNITS_VALUE,
            ...url.parse(req.url, true).query,
        });
        console.log(`${API_BASE_URL}?${params}`);

        const apiRest = await needle("get", `${API_BASE_URL}?${params}`);

        const data = apiRest.body;

        if (process.env.NODE_ENV !== 'production') {
            console.log(`Request: ${API_BASE_URL}?${params}`)
        }
        res.status(200).json(data);
        /*         const data = await
                        fetch(`${API_BASE_URL}?${params}`)
                            .then(res => res.json())
                            .then(data => data)
            
                    res.status(200).json(data) */
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;