import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import {
    createBlogs,
    getABlog,
    resetState,
    updateABlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tên tin"),
    description: yup.string().required("Vui lòng nhập nội dung tin"),
    category: yup.string().required("Vui lòng chọn loại tin"),
});
const Addblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[3];
    const imgState = useSelector((state) => state.upload.images);
    const bCatState = useSelector((state) => state.bCategory.bCategories);
    const blogState = useSelector((state) => state.blogs);
    const {
        isSuccess,
        isError,
        isLoading,
        createdBlog,
        blogName,
        blogDesc,
        blogCategory,
        blogImages = [],
        updatedBlog,
    } = blogState;

    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getABlog(getBlogId));
        } else {
            dispatch(resetState());
        }
    }, [getBlogId]);

    useEffect(() => {
        dispatch(resetState());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Thêm tin thành công!");
        }
        if (isSuccess && updatedBlog) {
            toast.success("Cập nhật tin thành công!");
            navigate("/admin/blog-list");
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

    const [newImages, setNewImages] = useState(img)

    useEffect(() => {

    }, [blogImages, img, imgState]);


    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || "",
            description: blogDesc || "",
            category: blogCategory || "",
            images: blogImages,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBlogId !== undefined) {
                const data = { id: getBlogId, blogData: values };
                data.blogData.images = [...data.blogData.images, ...newImages]
                dispatch(updateABlog(data));
                dispatch(resetState());
            } else {
                values.images = [...values.images, ...newImages]
                dispatch(createBlogs(values));
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
                {getBlogId !== undefined ? "Sửa" : "Thêm"} Tin
            </h3>

            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mt-4">
                        <CustomInput
                            type="title"
                            label="Nhập tên tin"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3  mt-3"
                        id="">
                        <option value="">Chon loại tin</option>
                        {bCatState.map((i, j) => {
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
                    <ReactQuill
                        theme="snow"
                        className="mt-3"
                        name="description"
                        onChange={formik.handleChange("description")}
                        value={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description &&
                            formik.errors.description}
                    </div>
                    <div className="bg-white border-1 p-5 text-center mt-3">
                        <Dropzone
                            onDrop={(acceptedFiles) =>
                                dispatch(uploadImg(acceptedFiles))
                            }>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Kéo thả hoặc nhấp vào đây để chọn
                                            ảnh
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap mt-3 gap-3">
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
                        {getBlogId !== undefined ? "Sửa" : "Thêm"} Tin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addblog;
