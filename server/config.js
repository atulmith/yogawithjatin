const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/yogawithjatinDB',
  port: process.env.PORT || 8090,
};

export default config;
