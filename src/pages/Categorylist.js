import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    deleteAProductCategory,
    getCategories,
    resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên loại sản phẩm",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: "Chỉnh sửa hoặc xóa",
        dataIndex: "action",
    },
];

const Categorylist = () => {
    const [open, setOpen] = useState(false);
    const [pCatId, setpCatId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setpCatId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState())
        dispatch(getCategories());
    }, []);

    const pCatState = useSelector((state) => state.pCategory.pCategories);
    const data1 = [];
    for (let i = 0; i < pCatState.length; i++) {
        data1.push({
            key: i + 1,
            name: pCatState[i].title,
            action: (
                <>
                    <Link
                        to={`/admin/category/${pCatState[i]._id}`}
                        className="fs-3 text-danger">
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(pCatState[i]._id)}>
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }
    const deleteCategory = (e) => {
        dispatch(deleteAProductCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };
    return (
        <div>
            <h3 className="mb-4 title">Danh sách loại sản phẩm</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCategory(pCatId);
                }}
                title="Bạn có chắc chắn muốn xóa loại sản phẩm này không?"
            />
        </div>
    );
};

export default Categorylist;
