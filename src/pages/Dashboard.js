import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getMonthlyData,
    getOrders,
    getYearlyData,
} from "../features/auth/authSlice";

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
        title: "Số lượng sản phẩm",
        dataIndex: "product",
    },
    {
        title: "Tổng giá tiền",
        dataIndex: "price",
    },
    {
        title: "Tổng giá tiền sau giảm giá",
        dataIndex: "dprice",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
    },
];

const Dashboard = () => {
    const dispatch = useDispatch();
    const monthlyDataState = useSelector((state) => state.auth.monthlyData);
    const yearlyDataState = useSelector((state) => state.auth.yearlyData);
    const orderState = useSelector((state) => state.auth?.orders?.orders);
    const [dataMonthly, setDataMonthly] = useState([]);
    const [dataMonthlySales, setDataMonthlySales] = useState([]);
    const [orderData, setOrderData] = useState([]);

    const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

 const config3 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

    useEffect(() => {
        dispatch(getMonthlyData(config3));
        dispatch(getYearlyData(config3));
        dispatch(getOrders(config3));
    }, []);

    useEffect(() => {
        let monthNames = [
            "Tháng Một",
            "Tháng Hai",
            "Tháng Ba",
            "Tháng Tư",
            "Tháng Năm",
            "Tháng Sáu",
            "Tháng Bảy",
            "Tháng Tám",
            "Tháng Chín",
            "Tháng Mười",
            "Tháng Mười Một",
            "Tháng Mười Hai",
        ];
        let data = [];
        let monthlyOrderCount = [];
        for (let index = 0; index < monthlyDataState?.length; index++) {
            const element = monthlyDataState[index];
            data.push({
                type: monthNames[element?._id?.month],
                income: element?.amount,
            });
            monthlyOrderCount.push({
                type: monthNames[element?._id?.month],
                sales: element?.count,
            });
        }
        setDataMonthly(data);
        setDataMonthlySales(monthlyOrderCount);

        const data1 = [];
        for (let i = 0; i < orderState?.length; i++) {
            data1.push({
                key: i,
                name: orderState[i].user.firstname + " " + orderState[i].user.lastname,
                product: orderState[i]?.orderItems[i]?.quantity,
                price: orderState[i].totalPrice,
                dprice: orderState[i].totalPriceAfterDiscount,
                status: orderState[i].orderStatus,
            });
        }
        setOrderData(data1);
    }, [orderState]);

    const config = {
        data: dataMonthly,
        xField: "type",
        yField: "income",
        color: ({ type }) => {
            return "#ffd333";
        },
        label: {
            // 可手动配置 label 数据标签位置
            position: "middle",
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };

    const config2 = {
        data: dataMonthlySales,
        xField: "type",
        yField: "sales",
        color: ({ type }) => {
            return "#ffd333";
        },
        label: {
            // 可手动配置 label 数据标签位置
            position: "middle",
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Sales",
            },
        },
    };

    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p className="desc">Tổng thu nhập</p>
                        <h4 className="mb-0 sub-title">
                            ${yearlyDataState && yearlyDataState[0]?.amount}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <p className="mb-0 desc">
                            Income in Last Year from Today
                        </p>
                    </div>
                </div>
                <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p className="desc">Tổng số lượng hàng đã bán</p>
                        <h4 className="mb-0 sub-title">
                            {yearlyDataState && yearlyDataState[0]?.count}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <p className="mb-0 desc">
                            Sales in Last Year from Today
                        </p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between gap-3">
                <div className="mt-4 flex-grow-1 w-50">
                    <h3 className="mb-5 title">Thống kê thu nhập</h3>
                    <div>
                        <Column {...config} />
                    </div>
                </div>
                <div className="mt-4 flex-grow-1 w-50">
                    <h3 className="mb-5 title">Thống kê bán hàng</h3>
                    <div>
                        <Column {...config2} />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5 title">Các đơn đặt hàng gần đây</h3>
                <div>
                    <Table columns={columns} dataSource={orderData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
