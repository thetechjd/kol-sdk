"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
jest.setTimeout(20000); 
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const CadetSDK = require('./index').default;

describe('CadetSDK-Get-KOL-Test', () => {
    let sdk;

    beforeEach(async () => {
    });

    test('should retrieve recent KOL tweets', async () => {

        sdk = new CadetSDK('pk_IiWpVuQwaQgYDwqm1cU7Tt9MRqstRZTn','sk_SkbxjpT4jnQzyTZShqeIz2TbOjZd1xg5');
        await sdk.authenticate(); 
        const response = await sdk.getKolTweets();
        // console.log(response);
        expect(response.message).toBe("success");
        response.data.forEach(tweet => {
            expect(tweet).toHaveProperty('url');
            expect(tweet).toHaveProperty('added');
        });
    });
});