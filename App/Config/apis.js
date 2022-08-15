export const AppInfo = {
    baseUrlAPI: 'https://dev-api.joolkart.com',
   // baseUrlAPI: 'https://uat-api.joolkart.com',
   // baseUrlAPI: 'https://uatnew-api.joolkart.com',
   // baseUrlAPI: 'https://api.joolkart.com',
   apiVersion: 'seller',
   apiVersionBuyer: 'api',
   serviceTimeOut: 20000,
 };
 function createUrl(actionName, isSeller = true) {
   return `${AppInfo.baseUrlAPI}/${  isSeller ? AppInfo.apiVersion : AppInfo.apiVersionBuyer }/${actionName}`;
 }
 export const apis = {
   getRequest: 'GET',
   postRequest: 'POST',
   deleteRequest: 'DELETE',
   putRequest: 'PUT',
   baseURL: AppInfo.baseUrlAPI,
 
   // Register
   checkMember: createUrl('check-member'),
   sendotp: createUrl('send-otp'),
   verifyotp: createUrl('verifyotp'),
   register: createUrl('register'),
   updateShopDetail: createUrl('complete-profile'),
   state: createUrl('state', false),
   updateShop: createUrl('submit/shop_detail'),
   updateBank: createUrl('submit/bank_detail'),
   pinCodeVerify: createUrl('check-pincode', false),
 
   //Login
   login: createUrl('login'),
   loginOtp: createUrl('send-otp', false),
   loginVerifyOtp: createUrl('verify-otp', false),
   loginWithOtp: createUrl('otp'),
   loginWithVerifyOtp: createUrl('verify-otp'),
   changePassword: createUrl('change-password'),
 
   //Profile
   getProfile: createUrl('user'),
   updateProfile: createUrl('profile-update'),
   feedback: createUrl('suggestion/store'),
   shopDetails: createUrl('shop-details'),
   checkStatus: createUrl('check/complete_profile'),
 
   //Static API
   terms: createUrl('page/terms-condition'),
   privacyPolicy: createUrl('page/privacy-policy'),
   contact: createUrl('contact'),
   aboutUs: createUrl('page/about'),
   static: createUrl('page/url'),
 
   //Product API
   getProductStaticData: createUrl('product-data'),
   product: createUrl('product'),
   brand: createUrl('brand'),
   deleteProductImage: createUrl('product-image/delete'),
   getProduct: createUrl('getproduct'),
   inventory: createUrl('inventory'),
   productStatus: createUrl('product/status/change'),
   checkSKU: createUrl('check-sku'),
 
   //Order API
   orderList: createUrl('order-list'),
   orderFilterList: createUrl('filter/order-list'),
   changeOrderStatus: createUrl('change/order/status'),
   reasons: createUrl('reasons'),
   changeSingleOrderStatus: createUrl('change/single-order/status'),
   forwardShipping: createUrl('forward-shipment'),
   cancelOrder: createUrl('cancel-order'),
   shippingOrderDetail: createUrl('forward-shipping-list'),
 
   //Dashboard
   dashboard: createUrl('dashboard'),
 
   //Push Notification
   setFcm: createUrl('seller-notification-map'),
   removeFcm: createUrl('seller-notification-unmap'),
   registerNotification: createUrl('seller-notification-register'),
   getAllNotification: createUrl('sellerAllNotification'),
   markAsRead: createUrl('markAsReadNotification'),
   sellerUnreadNotification: createUrl('sellerUnreadNotification'),
   notificationStatus: createUrl('notification-status'),
 
   //Report
   report: createUrl('report'),
   reportDownload: createUrl('report/download'),
   downloadOrderInvoice: createUrl('order-invoice'),
   inventoryDetails: createUrl('inventory-details'),
   inventoryDetailsExport: createUrl('inventory-details/export'),
 
   //Shipping
   company: createUrl('shipment'),
   deliveries: createUrl('deliveries'),
   getWeight: createUrl('get-weigth'),
   checkShipping: createUrl('check-shipping'),
 
   //Payment seller
   sellerPayment: createUrl('seller-payment'),
   sellerPaymentDetail: createUrl('seller-payment-detail'),
   sellerPaymentExport: createUrl('seller-payment/export'),
 };
 