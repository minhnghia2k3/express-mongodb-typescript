import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';

const router = express();

// Connect to mongodb
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((error) => {
        console.log('Connect error: ', error);
    });
