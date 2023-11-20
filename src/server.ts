import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

// Connect to mongodb
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to MongoDB.');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect: ');
        Logging.error(error);
    });

/**Only start the server if Mongo Connects */
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the request
        Logging.info(`Incoming => Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        // Listen the response - on finish event
        res.on('finish', () => {
            Logging.info(`Outgoing => Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    /** Get only json request - body parser*/
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of API */
    router.use((req, res, next) => {
        // Request can from anywhere
        res.header('Access-Control-Allow-Origin', '*');

        // What headers allow to use
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        // If pass OPTION method -> Return all options can use in API
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GAT');
            return res.status(200).json({});
        }
        next();
    });

    /** Routes */

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found!');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    /** Create server */
    http.createServer(
        router.listen(config.server.port, () => {
            Logging.info(`Server listening on port ${config.server.port}`);
        })
    );
};
