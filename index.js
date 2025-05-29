"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
jest.setTimeout(15000);
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class CadetSDK {
    constructor(apiKey, secretKey, baseUrl = 'http://localhost:8001/api/') {
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.baseUrl = baseUrl;
        this.token = null; // Store the authentication token
        if (!apiKey || !secretKey) {
            throw new Error('Both apiKey and secretKey are required.');
        }
        this.client = axios_1.default.create({
            baseURL: baseUrl,
            timeout: 5000, // 5 seconds timeout
            headers: {
                'X-Secret-Key': secretKey,
                'Content-Type': 'application/json',
            },
        });
    }
    /**
    * Authenticate and retrieve a session token
    */
    
    async authenticate() {
    try {
        const response = await this.client.post('/admin/authenticate', {
        publicKey: this.apiKey,
        secretKey: this.secretKey,
        });
        this.token = response.data.sessionToken;
        this.client.defaults.headers.Authorization = `Bearer ${this.token}`;
    } catch (error) {
        console.error('Auth error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
    }

    async getKolTweets() {
        var _a, _b;
        try {
            const response = await this.client.get('/user/get-kol-tweets');
            return response.data;
        }
        catch (error) {
            throw new Error(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message);
        }
    }
}

exports.default = CadetSDK;