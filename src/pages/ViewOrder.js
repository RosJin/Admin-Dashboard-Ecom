import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder, getOrderByUser, getOrders, login } from "../features/auth/authSlice";

const columns = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên sản phẩm",
        dataIndex: "name",
    },
    {
        title: "Thương hiệu",
        dataIndex: "brand",
    },
    {
        title: "Số lượng",
        dataIndex: "count",
    },
    {
        title: "Giá tiền",
        dataIndex: "amount",
    },
    {
        title: "Tên",
        dataIndex:"firstname",
    },
    {
        title: "Họ",
        dataIndex:"lastname",
    },
    {
        title: "Địa chỉ",
        dataIndex:"address",
    },
    {
        title: "Thành phố",
        dataIndex:"city",
    },
    {
        title: "Ghi chú",
        dataIndex:"other",
    },
    
];

const ViewOrder = () => {
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrder(orderId));
    }, []);
    const orderState = useSelector((state) =>  state?.auth?.singleOrder?.orders);
    const data1 = [];
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState?.orderItems[i]?.product.title,
            brand: orderState?.orderItems[i]?.product.brand,
            count: orderState?.orderItems[i]?.quantity,
            amount: orderState?.orderItems[i]?.price,
            firstname: orderState?.shippingInfo?.firstName,
            lastname: orderState?.shippingInfo?.lastName,
            address: orderState?.shippingInfo?.address,
            city: orderState?.shippingInfo?.city,
            other: orderState?.shippingInfo?.other,
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Chi tiết đơn hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ViewOrder;
