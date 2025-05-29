"use strict";

import CadetSDK from './index';

jest.setTimeout(20000);

describe('CadetSDK-Get-KOL-Test', () => {
  let sdk: CadetSDK;

//   beforeEach(() => {
//     // Setup can be added here if needed
//   });

  test('should retrieve recent KOL tweets', async () => {
     sdk = new CadetSDK('pk_IiWpVuQwaQgYDwqm1cU7Tt9MRqstRZTn','sk_SkbxjpT4jnQzyTZShqeIz2TbOjZd1xg5');
    await sdk.authenticate();

    const response = await sdk.getKolTweets();

    console.log(response);

    expect(response.message).toBe('success');
    response.data.forEach((tweet: any) => {
      expect(tweet).toHaveProperty('url');
      expect(tweet).toHaveProperty('added');
    });
  });
});
