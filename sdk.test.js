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

        sdk = new CadetSDK('pk_xl0v4jIHnZbIowGwwTPy1JylV8ApPN2y','sk_qhwngILsF22bYbjEGaurUnDCGUfA3osX');
        await sdk.authenticate(); 
        const response = await sdk.getKolTweets();
        console.log(response);
        expect(response.message).toBe("success");
        response.data.forEach(tweet => {
            expect(tweet).toHaveProperty('url');
            expect(tweet).toHaveProperty('added');
        });
    });


    test('should fail authentication with invalid keys', async () => {
        jest.setTimeout(30000); // 30 seconds
        sdk = new CadetSDK('123', '123');
        await expect(sdk.authenticate()).rejects.toThrow(/invalid|unauthorized|error|timeout/i);
    });

});