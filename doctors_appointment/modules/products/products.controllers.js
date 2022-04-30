const ProductModel = require('./products.model')
const DataUtils  = require('../../helpers/data');

const Product = {
    async add(data) {
        return await this.register(data);
    },
    async list(start, limit, from) {
        const $match = {  };
        if (from) $match.from = { $regex: new RegExp(`${from}`), $options: 'gi' };
        const query = [{ $match }];

        return DataUtils.paging({
            start,
            limit,
            sort: { created_at: -1 },
            model: ProductModel,
            query,
        });
    },
    async getById(_id) {
        return ProductModel.findOne({ _id, is_archived: false });
    },

    async addProduct(data) {
        const item = await ProductModel.findOne({product_code: data.product_code})
        if(item){
            throw {message :"Product already registered", code: 400};
        }
        return await ProductModel.create(data);
    },
    async update(id, data) {
        const item = await ProductModel.findById(id);
        const item2 = await ProductModel.findOne({product_code : data.product_code});
        if(!item){
            throw{message: "Product not found", code: 4000}
        }
        else if(data.product_code == item.product_code){
            return await ProductModel.findByIdAndUpdate(id, data);
        }
        else if(item2){
            throw{message: "Dublicate product", code: 4000}
        }
        else{
            return await ProductModel.findByIdAndUpdate(id, data);
        }
    },

    async archive(id) {
        return ProductModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Product,
    add: (req) => Product.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Product.list(start, limit, from);
    },
    update:(req)=>{
        return Product.update(req.params.id, req.payload)
    },
    getById: (req) => Product.getById(req.params.id),
    addProduct: (req) => Product.addProduct(req.payload),
    archive: (req) => Product.archive(req.params.id),
  };
