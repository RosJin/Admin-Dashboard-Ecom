import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
    createProducts,
    getAProduct,
    resetState,
    updateAProduct,
} from "../features/product/productSlice";
let schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tên sản phẩm"),
    description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
    price: yup.number().required("Vui lòng nhập giá sản phẩm"),
    brand: yup.string().required("Vui lòng chọn thương hiệu"),
    category: yup.string().required("Vui lòng chọn loại sản phẩm"),
    tags: yup.string().required("Vui lòng chọn đặc điểm sản phẩm"),
    quantity: yup.number().required("Vui lòng nhập số lượng sản phẩm"),
});

const Addproduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [images, setImages] = useState([]);
    const location = useLocation();
    const getProductId = location.pathname.split("/")[3];

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const {
        isSuccess,
        isError,
        isLoading,
        createdProduct,
        updatedProduct,
        productTitle,
        productDes,
        productPrice,
        productCate,
        productBrand,
        productTags,
        productQuantity,
        productImg,
    } = newProduct;

    useEffect(() => {
        if (getProductId !== undefined) {
            dispatch(getAProduct(getProductId));
        } else {
            dispatch(resetState());
        }
    }, [getProductId]);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(resetState())
    }, []);

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Thêm sản phẩm thành công!");
        }
        if (isSuccess && updatedProduct) {
            toast.success("Cập nhật sản phẩm thành công!");
            navigate("/admin/list-product");
        }
        if (isError) {
            toast.error("Có lỗi xảy ra!");
        }
    }, [isSuccess, isError, isLoading]);


    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.images = [...img, ...(productImg || [])];
    }, [img,productImg]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productTitle || "",
            description: productDes || "",
            price: productPrice || "",
            brand: productBrand || "",
            category: productCate || "",
            tags: productTags || "",
            quantity: productQuantity || "",
            images: productImg,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getProductId !== undefined) {
                const data = { id: getProductId, productData: values };
                dispatch(updateAProduct(data));
                dispatch(resetState());
            } else {
                dispatch(createProducts(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });


    return (
        <div>
            <h3 className="mb-4 title">
                {getProductId !== undefined ? "Sửa" : "Thêm"} Sản Phẩm
            </h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column">
                    <CustomInput
                        type="text"
                        label="Nhập tên sản phẩm"
                        name="title"
                        onCh={formik.handleChange("title")}
                        obBl={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className="">
                        <ReactQuill
                            theme="snow"
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.description &&
                            formik.errors.description}
                    </div>
                    <CustomInput
                        type="number"
                        label="Nhập giá sản phẩm"
                        name="price"
                        onCh={formik.handleChange("price")}
                        obBl={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>
                    <select
                        name="brand"
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                        className="form-control py-3 mb-3"
                        id="">
                        <option value="">Chọn thương hiệu</option>
                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.brand && formik.errors.brand}
                    </div>
                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3 mb-3"
                        id="">
                        <option value="">Chọn loại sản phẩm</option>
                        {catState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <select
                        name="tags"
                        onChange={formik.handleChange("tags")}
                        onBlur={formik.handleBlur("tags")}
                        value={formik.values.tags}
                        className="form-control py-3 mb-3"
                        id="">
                        <option value="" disabled>
                            Chọn đặc điểm sản phẩm
                        </option>
                        <option value="featured">Featured</option>
                        <option value="popular">Phổ biến</option>
                        <option value="special">Đặc biệt</option>
                    </select>
                    <div className="error">
                        {formik.touched.tags && formik.errors.tags}
                    </div>
                    <CustomInput
                        type="number"
                        label="Nhập số lượng"
                        name="quantity"
                        onCh={formik.handleChange("quantity")}
                        obBl={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone
                            onDrop={(acceptedFiles) =>
                                dispatch(uploadImg(acceptedFiles))
                            }>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Kéo thả hoặc nhấp vào đây để chọn ảnh
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            dispatch(delImg(i.public_id))
                                        }
                                        className="btn-close position-absolute"
                                        style={{
                                            top: "10px",
                                            right: "10px",
                                        }}></button>
                                    <img
                                        src={i.url}
                                        alt=""
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit">
                        {getProductId !== undefined ? "Sửa" : "Thêm"} Sản Phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addproduct;
