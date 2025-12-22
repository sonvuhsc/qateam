// const env = {
//     baseURL: 'https://trading-api-uat.hsc.com.vn',
//     baseURL_SP: 'https://sp-api-uat.hsc.com.vn',
//     apiTimeout: 10000,
//     environment: 'uat'
//   };
const ENV = process.env.NODE_ENV || "staging";

const config = {
  staging: {
    baseURL: "https://one-krx-uat.hsc.com.vn/sp",
  },
  production: {
    baseURL: "https://one.hsc.com.vn/sp",
  },
};

if (!config[ENV]) {
  throw new Error(`Unknown NODE_ENV: ${ENV}`);
}

module.exports = {
  ENV,
  ...config[ENV],
};