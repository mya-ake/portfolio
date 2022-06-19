module.exports.getApiEndpoint = (appEnv) => {
  switch (appEnv) {
    case 'prod':
      return process.env.API_ENDPOINT_PROD ?? '';
    case 'dev':
      return process.env.API_ENDPOINT_DEV ?? '';
    default:
      return 'http://localhost:4000/graphql';
  }
};
