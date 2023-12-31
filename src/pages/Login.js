import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getOrders, getYearlyData, login } from "../features/auth/authSlice";


let schema = Yup.object().shape({
    email: Yup.string()
        .email("Email phải hợp lệ")
        .required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });
    const authState = useSelector((state) => state);

    const { user, isError, isSuccess, isLoading, message } = authState.auth;
    useEffect(() => {
        if (isSuccess) {
            // dispatch(getMonthlyData())
            // dispatch(getYearlyData())
            // dispatch(getOrders())
            navigate("admin");
        } else {
            navigate("");
        }
    }, [user, isError, isSuccess, isLoading]);
    return (
        <div
            className="py-5"
            style={{ background: "#ffd333", minHeight: "100vh" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Đăng nhập</h3>
                <p className="text-center">
                    Vui lòng đăng nhập để tiếp tục.
                </p>
                <div className="error text-center">
                    {message.message === "Rejected"
                        ? "Bạn không phải quản trị viên"
                        : ""}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        name="email"
                        label="Nhập Email"
                        id="email"
                        val={formik.values.email}
                        onCh={formik.handleChange("email")}
                    />
                    <div className="error mt-2">
                        {formik.touched.email && formik.errors.email}
                    </div>
                    <CustomInput
                        type="password"
                        name="password"
                        label="Mật khẩu"
                        id="pass"
                        val={formik.values.password}
                        onCh={formik.handleChange("password")}
                    />
                    <div className="error mt-2">
                        {formik.touched.password && formik.errors.password}
                    </div>
                   
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#ffd333" }}
                        type="submit">
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
