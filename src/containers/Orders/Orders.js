import React, { Component } from 'react';
import orderAxiosInstance from '../../orderAxiosInstance';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/order_actions';
import Spinner from '../../UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let ordersEl = <Spinner />;
        if(!this.props.loading) {
            ordersEl = (
                <div>
                    {this.props.orders.map(order=> {
                        return (<Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />)
                    })}
                </div>
            )
        }
        return ordersEl;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, orderAxiosInstance));