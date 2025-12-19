const apiRoutes = {
    equity: {
      get_account: '/order-svc/equity/v1/account',
    },

    subscription: {
      list: '/api/account/subscription',
      detail: (id) => `/api/account/subscription/${id}`,
      create: '/api/account/subscription/create',
      user_info: 'api/account/subscription/user/info',
    },
    auth: {
      login: '/iam/trading-api/v0.1/auth/token',
      profile: '/api/user/profile',
    }
  };
  
  module.exports = { apiRoutes };
