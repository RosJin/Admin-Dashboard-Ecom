import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getBlogs } from "../features/blogs/blogSlice";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "name",
    },
    {
        title: "Category",
        dataIndex: "category",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Bloglist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs());
    }, []);
    const getBlogState = useSelector((state) => state.blog.blogs);
    const data1 = [];
    for (let i = 0; i < getBlogState.length; i++) {
        data1.push({
            key: i + 1,
            name: getBlogState[i].title,
            category: getBlogState[i].category,
            action: (
                <>
                    <Link to='/' className="fs-3 text-danger">
                        <BiEdit />
                    </Link>
                    <Link to='/' className="ms-3 fs-3 text-danger">
                        <AiFillDelete />
                    </Link>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Blogs list</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default Bloglist;
