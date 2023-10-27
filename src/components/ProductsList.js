import React, { Component, useEffect } from "react";
import axios from "axios";

class ProductsList extends Component{
    constructor(props){
        super(props)

        this.state = {
            productslist: []
        }
        this.chargeProducts = this.chargeProducts.bind(this);
    }
    componentDidMount(){
        console.log("1");
        this.chargeProducts();
    }

    async chargeProducts () {
        console.log("2");
        const products = await axios.get('http://localhost:3002/api/v1/productslist');
        this.setState({
            productslist: products.data.response
        });
        console.log('products ====> '+ JSON.stringify(this.state.productslist));
    };

    render(){
        console.log("3");
       return(
        <div className="container" >
            <h1 className="text-center">Selecciona la cantidad de productos a comprar</h1>
            <div className="row">
                <div className="col-8">
                <h3>PRODUCTO</h3>
                    <table className="table table-dark"> 
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productslist.map(row =>(
                                <tr>
                                    <td>{row.product_name}</td>
                                    <td>{row.description}</td>
                                    <td>$ {row.price}</td>     
                                </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       );
    };
};



export default ProductsList;