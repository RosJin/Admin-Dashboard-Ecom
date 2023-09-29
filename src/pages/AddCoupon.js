import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    createCoupon,
    getACoupon,
    resetState,
    updateACoupon,
} from "../features/coupon/couponSlice";

let schema = yup.object().shape({
    name: yup.string().required("Coupon Name is Required"),
    expiry: yup.date().required("Expiry Date is Required"),
    discount: yup.number().required("Discount Percentage is Required"),
});
const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCouponId = location.pathname.split("/")[3];
    const newCoupon = useSelector((state) => state.coupon);
    const {
        isSuccess,
        isError,
        isLoading,
        createdCoupon,
        couponName,
        couponDiscount,
        couponExpiry,
        updatedCoupon,
    } = newCoupon;

    const changeDateFormat = (date) => {
        // const newDate = new Date(date).toLocaleDateString();
        // const [ month, day, year] = newDate.split("/");
        // return [year, month, day].join("-");
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return "Invalid Date";
        }
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");// Thêm 0 đằng trước nếu tháng < 10
        const day = String(parsedDate.getDate()).padStart(2, "0");// Thêm 0 đằng trước nếu ngày < 10
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (getCouponId !== undefined) {
            dispatch(getACoupon(getCouponId));
        } else {
            dispatch(resetState());
        }
    }, [getCouponId]);
    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfullly!");
        }
        if (isSuccess && updatedCoupon) {
            toast.success("Coupon Updated Successfully!");
            navigate("/admin/coupon-list");
        }
        if (isError && couponName && couponDiscount && couponExpiry) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || "",
            expiry: changeDateFormat(couponExpiry) || "",
            discount: couponDiscount || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getCouponId !== undefined) {
                const data = { id: getCouponId, couponData: values };
                dispatch(updateACoupon(data));
                dispatch(resetState());
            } else {
                dispatch(createCoupon(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState);
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">
                {getCouponId !== undefined ? "Edit" : "Add"} Coupon
            </h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        name="name"
                        onCh={formik.handleChange("name")}
                        onBl={formik.handleBlur("name")}
                        val={formik.values.name}
                        label="Enter Coupon Name"
                        id="name"
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput
                        type="date"
                        name="expiry"
                        onCh={formik.handleChange("expiry")}
                        onBl={formik.handleBlur("expiry")}
                        val={formik.values.expiry}
                        label="Enter Expiry Data"
                        id="date"
                    />
                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>
                    <CustomInput
                        type="number"
                        name="discount"
                        onCh={formik.handleChange("discount")}
                        onBl={formik.handleBlur("discount")}
                        val={formik.values.discount}
                        label="Enter Discount"
                        id="discount"
                    />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit">
                        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
