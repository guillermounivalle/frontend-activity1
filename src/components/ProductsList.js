import React, { Component, useEffect } from "react";
import axios from "axios";

class ProductsList extends Component{
    constructor(props){
        super(props)

        this.state = {
            productslist: [],
            messageproducts: [],
            totalproducts: 0,
            sale:{
                idproduct:0,

            }

        }
        this.chargeProducts = this.chargeProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.dctToCart = this.dctToCart.bind(this);
        this.getObtainProductWithIdProduct = this.getObtainProductWithIdProduct.bind(this);
        this.changeStateTotalArticles = this.changeStateTotalArticles.bind(this);
    }
    componentDidMount(){
        this.chargeProducts();
    }

    async chargeProducts () {
        const products = await axios.get('http://localhost:3002/api/v1/productslist');
        this.setState({
            productslist: products.data.response
        });
        console.log('products ====> '+ JSON.stringify(this.state.productslist));
    };

    addToCart(idproduct, quantity, totalprice){    
        //const product = this.getObtainProductWithIdProduct(idproduct);
        /**
         * this.setState(prevState => ({
            productslist: prevState.productslist.map(
            obj => (obj.id === idproduct ? 
                Object.assign(obj, { quantity: quantity + 1, totalprice: obj.price * quantity }) : obj)
                )
            }
        ));
         */
        this.changeStateTotalArticles("plus");
        //console.log('productsquantity ====> '+ JSON.stringify(this.state.productslist));
        //console.log('product2222 ====> '+ JSON.stringify(product));
    };

    dctToCart(idproduct, quantity, totalprice){
        this.changeStateTotalArticles("minus");
        /**this.setState(prevState => ({
            productslist: prevState.productslist.map(
            obj => (obj.id === idproduct ? 
                Object.assign(obj, { quantity: quantity - 1, totalprice: obj.price * quantity }) : obj)
                )
            }
        ));*/
    };

    getObtainProductWithIdProduct(idproduct){
        const product = this.state.productslist.find(obj => {
            return obj.id === idproduct;
         });
         return product;
    };

    changeStateTotalArticles(action){
        var i = this.state.totalproducts;
        if(action == "plus"){
            console.log("plus  "+this.state.totalproducts);
            this.setState({totalproducts: this.state.totalproducts + 1});
        }
        if(action == "minus" && this.state.totalarticles != 0){
            console.log("menos  "+this.state.totalproducts);
            this.setState({totalproducts: this.state.totalproducts - 1});
        }
        console.log("total articles ", this.state.totalproducts);
    };

    render(){
       return(
        <div className="container" >
            <h1 className="text-center">Selecciona la cantidad de productos a comprar</h1>
            <div className="row">
                <div className="col-12">
                <h3>PRODUCTO</h3>
                    <table className="table "> 
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio UND</th>
                                <th>Adicionar al carrito</th>
                                <th>Descontar al carrito</th>
                                <th>Precio total por Articulo</th>
                                <th className="row">
                                    <h1 className="bi bi-cart"></h1><p>{this.state.totalarticles}</p>
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
                                            onClick={() => this.addToCart(row.id,1,1)} 
                                            style={{background:"green", color:"white"}}>
                                            <i class="bi bi-cart-fill"></i> Adicionar
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => this.dctToCart(row.id,1,1)} 
                                            style={{background:"blue", color:"white"}}>
                                            <i class="bi bi-cart-fill"></i> Descontar
                                        </button>
                                    </td>    
                                    <td> 
                                    </td>
                                </tr>
                                )
                              )
                            };

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       );
    };
};



export default ProductsList;