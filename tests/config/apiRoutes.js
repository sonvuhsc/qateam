const apiRoutes = {
    subscription: {
      list: '/api/account/subscription',
      detail: (id) => `/api/account/subscription/${id}`,
      create: '/api/account/subscription/create',
    },
    auth: {
      login: 'api/account/user/login',
      profile: '/api/user/profile',
    }
  };
  
  module.exports = { apiRoutes };
