import React, { Component } from "react";
import axios from "axios";

class ProductsList extends Component{
    constructor(props){
        super(props)

        this.state = {
            productslist: [],
            infosalesproducts: [],
            messageSaleInfo:[],
            totalproducts: 0,
            showConfirmMessage: false
        }
        this.chargeProducts = this.chargeProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.dctToCart = this.dctToCart.bind(this);
        this.getDatatWithIdProduct = this.getDatatWithIdProduct.bind(this);
        this.changeStateTotalArticles = this.changeStateTotalArticles.bind(this);
        this.initInfosalesproducts = this.initInfosalesproducts.bind(this);
        this.updateDataInfoSaleProduct = this.updateDataInfoSaleProduct.bind(this);
        this.showTotalPriceProduct = this.showTotalPriceProduct.bind(this);
        this.showTotalQuantityProduct = this.showTotalQuantityProduct.bind(this);
        this.totalPriceSale = this.totalPriceSale.bind(this);
        this.addProductListProductsSale = this.addProductListProductsSale.bind(this);
        this.infoSaleProductstoUser = this.infoSaleProductstoUser.bind(this);
        this.setVisibleResume = this.setVisibleResume.bind(this);
    };


    componentDidMount(){
        this.chargeProducts();
    };


    async chargeProducts () {
        const products = await axios.get('http://localhost:3002/api/v1/productslist');
        this.setState({
            productslist: products.data.response
        });
        this.initInfosalesproducts();
    };

    initInfosalesproducts () {
        this.state.productslist.map( products =>(
                this.state.infosalesproducts.push(
                {
                    id:products.id,
                    quantity: 0,
                    totalpriceproduct:0
                })
            )  
        );
        
    }
    
    
    addToCart(idproduct, quantity){    
        const product = this.getDatatWithIdProduct(idproduct,'product'); 
        const currentquantity = this.getDatatWithIdProduct(idproduct,'quantity'); 
        const price = product.price;
        this.updateDataInfoSaleProduct(idproduct, currentquantity, quantity,'plus', price );
        this.changeStateTotalArticles("plus");
    };

    dctToCart(idproduct, quantity){
        const product = this.getDatatWithIdProduct(idproduct,'product'); 
        const currentquantity = this.getDatatWithIdProduct(idproduct,'quantity'); 
        const price = product.price;
        this.updateDataInfoSaleProduct(idproduct, currentquantity, quantity, 'minus', price );
        this.changeStateTotalArticles("minus");
        
    };

    updateDataInfoSaleProduct(idproduct, currentquantity, quantity, action, price){
        var newQuantity = 0;
        if(action === 'plus'){
            newQuantity = currentquantity + quantity;
        }
        if(action === 'minus' && currentquantity !== 0){
            newQuantity = currentquantity - quantity;
        }
        const newTotalPriceproduct = newQuantity * price;
        this.setState(prevState => ({
            infosalesproducts: prevState.infosalesproducts.map(
            obj => (obj.id === idproduct ? 
                Object.assign(obj, { 
                    quantity: newQuantity, 
                    totalpriceproduct: newTotalPriceproduct }) 
                    : obj)
                )
            }
        ));
        console.log('products ====> '+ JSON.stringify(this.state.infosalesproducts));
    };

    getDatatWithIdProduct(idproduct, action){
        switch(action) {
            case 'product':
                const product = this.state.productslist.find(obj => {
                    return obj.id === idproduct;
                });
                return product;
                case 'nameproduct':
                const nameproduct = this.state.productslist.find(obj => {
                    return obj.id === idproduct;
                });
                return nameproduct.product_name;
            case 'quantity':
                const quantity = this.state.infosalesproducts.find(obj => {
                    return obj.id === idproduct;
                });
                if(quantity != null){
                    return quantity.quantity;    
                } 
                break;
            case 'totalprice':
                const infosale = this.state.infosalesproducts.find(obj => {
                    return obj.id === idproduct;
                });  
                if(infosale != null){
                    return infosale.totalpriceproduct;   
                }
                break;
            default:
              return null;
        }
    };

    changeStateTotalArticles(action){
        if(action === "plus"){
            console.log("plus  "+this.state.totalproducts);
            this.setState({totalproducts: this.state.totalproducts + 1});
        }
        if(action === "minus" && this.state.totalproducts !== 0){
            console.log("menos  "+this.state.totalproducts);
            this.setState({totalproducts: this.state.totalproducts - 1});
        }
        console.log("total articles ", this.state.totalproducts);
    };

    showTotalPriceProduct(idproduct){
        const totalpriceproduct =  this.getDatatWithIdProduct(idproduct, 'totalprice'); 
        return<td>$ {totalpriceproduct}</td>
        
    };

    showTotalQuantityProduct(idproduct){
        const totalquantity =  this.getDatatWithIdProduct(idproduct, 'quantity'); 
        return<td>{totalquantity}</td>
    };

    addProductListProductsSale(idproduct){
        const productname = this.getDatatWithIdProduct(idproduct, 'nameproduct');
        const quantity = this.getDatatWithIdProduct(idproduct, 'quantity');
        const totalpriceproduct = this.getDatatWithIdProduct(idproduct, 'totalprice');
            this.state.messageSaleInfo.push({
            productname: productname,
            quantity: quantity,
            totalpriceproduct: totalpriceproduct
        });
        
    };

    infoSaleProductstoUser(){
        this.setState({
            messageSaleInfo:[]
        });
        this.state.infosalesproducts.map(value => (
            this.addProductListProductsSale(value.id)
        ));
        this.setVisibleResume('active');
    };

    setVisibleResume(action){
        /**
         * 1. active
         * 2. accept
         * 3. cancel
         */
        if(action === 1){
            this.infoSaleProductstoUser();
            this.setState({
                showConfirmMessage: true
            });
        }
        if(action === 2){
            this.setState({
                messageSaleInfo:[],
                showConfirmMessage: false,
                //infosalesproducts:[]
            });
            this.initInfosalesproducts();
        }
        if(action === 3){
            this.setState({
                showConfirmMessage: false
            })
        }
        
    }


    totalPriceSale(){
        var totalPriceSale = 0;
        this.state.infosalesproducts.map(value => (
            totalPriceSale = totalPriceSale + value.quantity
        ))
        return totalPriceSale;
    };


    render(){
        console.log("ahow mesaage "+ this.state.showConfirmMessage);
        const showMessage = this.state.showConfirmMessage;
        let comp;
        let resume;
        if(showMessage){
            resume = <h3>PRODUCTO</h3>
            comp = 
            <table className="table "> 
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Total por Unidad</th>
                </tr>
            </thead>
            <tbody>
            {this.state.messageSaleInfo.map(row =>(
                <tr key={row.id}>
                    <td>{row.product_name}</td>
                    <td>{row.quantity}</td>
                    <td>$ {row.totalpriceproduct}</td> 
                </tr>
                ))
            }
            <td>
                <button 
                    onClick={() => this.setVisibleResume(2)} 
                    style={{background:"green", color:"white"}}>
                     <i class="bi bi-cart-fill"></i> Aceptar
                </button>
            </td>
            <td>
                <button 
                    onClick={() => this.setVisibleResume(3)} 
                    style={{background:"red", color:"white"}}>
                    <i class="bi bi-cart-fill"></i> Cancelar
                </button>
            </td>  
            </tbody>
        </table>
        }else{ 
            resume = <div></div>
            comp = <div></div>
        }
        return(
        <div className="container" >
            <h1 className="text-center">Selecciona la cantidad de productos a comprar</h1>
            <div className="row">
                <div className="col-8">
                <h3>RESUME</h3>
                    <table className="table "> 
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio UND</th>
                                <th>Adicionar al carrito</th>
                                <th>Descontar al carrito</th>
                                <th>Precio total por Articulo</th>
                                <th>  
                                    <p className="text-center">{this.state.totalproducts}</p>
                                    <h1 className="bi bi-cart"></h1>
 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productslist.map(row =>(
                                <tr key={row.id}>
                                    <td>{row.product_name}</td>
                                    <td>{row.description}</td>
                                    <td>$ {row.price}</td> 
                                    <td>
                                    <button 
                                            onClick={() => this.addToCart(row.id,1)} 
                                            style={{background:"green", color:"white"}}>
                                            <i class="bi bi-cart-fill"></i> Adicionar
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => this.dctToCart(row.id,1)} 
                                            style={{background:"blue", color:"white"}}>
                                            <i class="bi bi-cart-fill"></i> Descontar
                                        </button>
                                    </td>    
                                    {this.showTotalPriceProduct(row.id)}
                                    {this.showTotalQuantityProduct(row.id)}
                                </tr>
                                )
                              )
                            };

                        </tbody>
                    </table>
                </div>
                <div className="col-4">
                <div className="mb-5"></div>
                <h4>Selecciona los productos que deseas y luego haz click en "Ir a pago"</h4> 
                <div className="mb-3"></div>   
                <button  className="col-4"
                    onClick={() => this.setVisibleResume(1)} 
                    style={{background:"green", color:"white"}}>
                        Ir a Pago
                </button>    
                <div className="mb-3"></div>
                {resume}
                {comp}
                </div>
            </div>
        </div>
       );
    };
};



export default ProductsList;