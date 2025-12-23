// const env = {
//     baseURL: 'https://trading-api-uat.hsc.com.vn',
//     baseURL_SP: 'https://sp-api-uat.hsc.com.vn',
//     apiTimeout: 10000,
//     environment: 'uat'
//   };
const ENV = process.env.NODE_ENV || "production";

const config = {
  staging: {
    baseURL: "https://one-stg.hsc.com.vn/sp",
    loginRedirectURL: "https://one-stg.hsc.com.vn/info/stocks",
    oneproURL: "https://onepro-uat.hsc.com.vn/"
  },
  production: {
    baseURL: "https://one.hsc.com.vn/sp",
    loginRedirectURL: "https://one.hsc.com.vn/info/stocks",
    oneproURL: "https://onepro.hsc.com.vn/"
  },
};

if (!config[ENV]) {
  throw new Error(`Unknown NODE_ENV: ${ENV}`);
}

module.exports = {
  ENV,
  ...config[ENV],
};