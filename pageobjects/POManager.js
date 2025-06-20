const {HomePage} = require('./HomePage');
class POManager
{
constructor(page)
{
    this.page = page;
    this.homePage = new HomePage(this.page);

}

getHomePage()
{
    return this.homePage;
}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
}
module.exports = {POManager};