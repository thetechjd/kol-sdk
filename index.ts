"use strict";
import axios, { AxiosInstance, AxiosError } from "axios";

export interface CadetSDKOptions {
  apiKey: string;
  secretKey: string;
  baseUrl?: string;
}

export interface AuthResponse {
  sessionToken: string;
}

export interface KolTweet {
  url: string;
  added: string;
}

export interface KolTweetResponse {
  message: string;
  data: KolTweet[];
}

export default class CadetSDK {
    private apiKey: string;
    private secretKey: string;
    private baseUrl: string;
    private token: string | null;
    private client: AxiosInstance;

    constructor(apiKey: string, secretKey: string, baseUrl = "https://api.cryptocadet.app/api/") {
        if (!apiKey || !secretKey) {
        throw new Error("Both apiKey and secretKey are required.");
        }

        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.baseUrl = baseUrl;
        this.token = null;

        this.client = axios.create({
        baseURL: this.baseUrl,
        timeout: 5000,
        headers: {
            "X-Secret-Key": this.secretKey,
            "Content-Type": "application/json",
        },
        });
    }

  /**
   * Authenticate and retrieve a session token
   */
    async authenticate(): Promise<void> {
        try {
        const response = await this.client.post<AuthResponse>("/admin/authenticate", {
            publicKey: this.apiKey,
            secretKey: this.secretKey,
        });

        this.token = response.data.sessionToken;
        this.client.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        } catch (error) {
        const err = error as AxiosError<any>;
        console.error("Auth error:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || err.message);
        }
    }

  /**
   * Get KOL tweets
   */
    async getKolTweets(): Promise<KolTweetResponse> {
    try {
        const response = await this.client.get<KolTweetResponse>("/user/get-kol-tweets");
        return response.data;
    } catch (error) {
        const err = error as AxiosError<any>;
        throw new Error(err.response?.data?.message || err.message);
    }
    }
}
