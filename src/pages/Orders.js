import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";

const columns = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên",
        dataIndex: "name",
    },
    {
        title: "Sản phẩm",
        dataIndex: "product",
    },
    {
        title: "Tổng số tiền",
        dataIndex: "amount",
    },
    {
        title: "Ngày đặt",
        dataIndex: "date",
    },
    {
        title: "Hành trình đơn hàng",
        dataIndex: "action",
    },
];

const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    const orderState = useSelector((state) => state.auth.orders.orders);
    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i]?.user?.firstname,
            product: (
                <Link to={`/admin/order/${orderState[i]?._id}`}>
                    Xem đơn hàng
                </Link>
            ),
            amount: orderState[i]?.totalPrice,
            date: new Date(orderState[i]?.createdAt).toLocaleString(),
            action: (
                <>
                    <select
                        name=""
                        defaultValue={orderState[i]?.orderStatus}
                        onChange={(e) =>
                            updateOrderStatus(
                                orderState[i]?._id,
                                e.target.value,
                            )
                        }
                        className="form-control form-select"
                        id="">
                        <option value="Đã đặt hàng" disabled selected>
                            Đã đặt hàng
                        </option>
                        <option value="Đơn hàng đang được chuẩn bị">Đơn hàng đang được chuẩn bị</option>
                        <option value="Người vận chuyển đã lấy hàng">Người vận chuyển đã lấy hàng</option>
                        <option value="Đơn hàng đang giao đến bạn">
                            Đơn hàng đang giao đến bạn
                        </option>
                        <option value="Đã giao hàng thành công">Đã giao hàng thành công</option>
                    </select>
                </>
            ),
        });
        const updateOrderStatus = (a,b) => {
            dispatch(updateAOrder({id:a,status:b}));
        };
    }
    return (
        <div>
            <h3 className="mb-4 title">Danh sách đơn đặt hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Orders;
