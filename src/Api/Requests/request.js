const requests = {
  fetchBanners: `/pim/pimresponse.php/?service=banner_slider&store=1`,
  fetchTrending: `/pim/pimresponse.php/?service=home_section&store=1&curr_type=inr`,
  fetchProductList: `/pim/pimresponse.php/`,
  fetchProducts: `/pim/pimresponse.php/`,
  cartApi:
    "https://sabhyata.cartkm.greenhonchos.com/api/v1/product/add-product",
  getCartApi: "https://sabhyata.cartkm.greenhonchos.com/api/v1/cart/get-cart",
};
export default requests;
