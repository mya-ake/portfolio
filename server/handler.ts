'use strict';

import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { app } from './app';

const server = awsServerlessExpress.createServer(app);

export const appHandler = (event: APIGatewayEvent, context: Context) => {
  console.log('[info]', 'Event', JSON.stringify(event));
  awsServerlessExpress.proxy(server, event, context);
};
