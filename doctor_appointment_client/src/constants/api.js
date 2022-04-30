const server_url = 'http://localhost:4000';
const base_url = server_url + '/api/v1';

module.exports = {
  orderimages : server_url + '/modules/order/productorder',
  prescriptionimages: server_url + '/modules/appointment/problems',
  DOCTORS: base_url + '/doctors',
  ADMIN: base_url + '/admin',
  CUSTOMER: base_url + '/customer',
  APPOINTMENT: base_url + '/appointment',
  PRODUCTS: base_url + '/products',
  ORDERS: base_url + '/order',
  MEDICINES: base_url + "/medicines",
};
