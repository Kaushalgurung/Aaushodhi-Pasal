const CartModel = require('./carts.model')
const DataUtils  = require('../../helpers/data');

const Cart = {
    async add(data) {
        return await this.register(data);
    },
    async list(start, limit, from) {
        const $match = { is_archived: false };
        if (from) $match.from = { $regex: new RegExp(`${from}`), $options: 'gi' };
        const query = [{ $match }];

        return DataUtils.paging({
            start,
            limit,
            sort: { created_at: -1 },
            model: CartModel,
            query,
        });
    },
    async getById(_id) {
        return CartModel.findOne({ _id, is_archived: false });
    },

    async addtoCart(data) {
        const item = await CartModel.findOne({product_code: data.product_code})
        if(item){
            throw {message :"Product already added", code: 400};
        }
        return await CartModel.create(data);
    },
    // async update(id, data) {
    //     const item = await CartModel.findById(id);
    //     const item2 = await CartModel.findOne({cart_code : data.cart_code});
    //     if(!item){
    //         throw{message: "Cart not found", code: 4000}
    //     }
    //     else if(data.cart_code == user.cart_code){
    //         return await CartModel.findByIdAndUpdate(id, data);
    //     }
    //     else if(item2){
    //         throw{message: "Dublicate cart", code: 4000}
    //     }
    //     else{
    //         return await CartModel.findByIdAndUpdate(id, data);
    //     }
    // },

    async archive(id) {
        return CartModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Cart,
    add: (req) => Cart.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Cart.list(start, limit, from);
    },
    // update:(req)=>{
    //     return Cart.update(req.params.id, req.payload)
    // },
    getById: (req) => Cart.getById(req.params.id),
    addCart: (req) => Cart.addtoCart(req.payload),
    archive: (req) => Cart.archive(req.params.id),
  };
