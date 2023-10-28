import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineLogout,
} from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { RiCouponLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { SiBrandfolder } from "react-icons/si";
import { Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className="text-white fs-5  text-center py-3 mb-0">
                        <span className="sm-logo">HK</span>
                        <span className="lg-logo">Computer HK</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => {
                        if (key === "signout") {
                            localStorage.clear()
                            window.location.reload()
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-4" />,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <AiOutlineUser className="fs-4" />,
                            label: "Danh sách khách hàng",
                        },
                        {
                            key: "Catalog",
                            icon: <AiOutlineShoppingCart className="fs-4" />,
                            label: "Danh mục",
                            children: [
                                {
                                    key: "product",
                                    icon: (
                                        <AiOutlineShoppingCart className="fs-4" />
                                    ),
                                    label: "Thêm sản phẩm",
                                },
                                {
                                    key: "list-product",
                                    icon: (
                                        <AiOutlineShoppingCart className="fs-4" />
                                    ),
                                    label: "DS sản phẩm",
                                },
                                {
                                    key: "brand",
                                    icon: <SiBrandfolder className="fs-4" />,
                                    label: "Thương hiệu",
                                },
                                {
                                    key: "list-brand",
                                    icon: <SiBrandfolder className="fs-4" />,
                                    label: "DS thương hiệu",
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: "Loại sản phẩm",
                                },
                                {
                                    key: "list-category",
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: "DS loại sản phẩm",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <FaClipboardList className="fs-4" />,
                            label: "Đơn đặt hàng",
                        },
                        {
                            key: "marketing",
                            icon: <RiCouponLine className="fs-4" />,
                            label: "Marketing",
                            children: [
                                {
                                    key: "coupon",
                                    icon: <ImBlog className="fs-4" />,
                                    label: "Add Coupon",
                                },
                                {
                                    key: "coupon-list",
                                    icon: <RiCouponLine className="fs-4" />,
                                    label: "Coupon List",
                                },
                            ],
                        },
                        {
                            key: "blogs",
                            icon: <FaBloggerB className="fs-4" />,
                            label: "Tin tức",
                            children: [
                                {
                                    key: "blog",
                                    icon: <ImBlog className="fs-4" />,
                                    label: "Thêm tin tức",
                                },
                                {
                                    key: "blog-list",
                                    icon: <FaBloggerB className="fs-4" />,
                                    label: "DS tin tức",
                                },
                                {
                                    key: "blog-category",
                                    icon: <ImBlog className="fs-4" />,
                                    label: "Thêm loại tin tức",
                                },
                                {
                                    key: "blog-category-list",
                                    icon: <FaBloggerB className="fs-4" />,
                                    label: "DS loại tin tức",
                                },
                            ],
                        },
                        {
                            key: "enquiries",
                            icon: <FaClipboardList className="fs-4" />,
                            label: "Hỏi đáp",
                        },
                        {
                            key: "signout",
                            icon: <AiOutlineLogout className="fs-4" />,
                            label: "Đăng xuất",
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="d-flex justify-content-between ps-1 pe-5"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setCollapsed(!collapsed),
                        },
                    )}
                    {/* <div className="d-flex gap-4 align-items-center">
                        <div className="position-relative">
                            <IoIosNotifications className="fs-4" />
                            <span className="badge bg-warning rounded-circle p-1 position-absolute">
                                3
                            </span>
                        </div>
                        <div className="d-flex gap-3 align-items-center dropdow">
                            <div>
                                <img
                                    width={32}
                                    height={32}
                                    src="https://img.nimo.tv/t/1629530949455/202303251679763752616_1629530949455_avatar.jpg/w120_l0/img.webp"
                                    alt=""
                                />
                            </div>
                            <div
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <h5 className="mb-0">Huy Nguyen</h5>
                                <p className="mb-0">huyhoang.hn462@gmail.com</p>
                            </div>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Link
                                        className="dropdown-item py-1 mb-1"
                                        style={{
                                            height: "auto",
                                            lineHeight: "20px",
                                        }}
                                        to="/">
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item py-1 mb-1"
                                        style={{
                                            height: "auto",
                                            lineHeight: "20px",
                                        }}
                                        to="/">
                                        Signout
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div> */}
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}>
                    <ToastContainer
                        position="top-right"
                        autoClose={250}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
