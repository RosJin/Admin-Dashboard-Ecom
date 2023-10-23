import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    deleteAEnquiry,
    getEnquiries,
    resetState,
    updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModal";

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
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Số điện thoại",
        dataIndex: "mobile",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
    },

    {
        title: "Xem hoặc xóa",
        dataIndex: "action",
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [enqId, setenqId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setenqId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(resetState());
        dispatch(getEnquiries());
    }, []);
    const enqState = useSelector((state) => state.enquiry.enquiries);
    const data1 = [];
    for (let i = 0; i < enqState.length; i++) {
        data1.push({
            key: i + 1,
            name: enqState[i].name,
            email: enqState[i].email,
            mobile: enqState[i].mobile,
            status: (
                <>
                    <select
                        name=""
                        defaultValue={
                            enqState[i].status
                                ? enqState[i].status
                                : "Submitted"
                        }
                        className="form-control form-select"
                        id=""
                        onChange={(e) =>
                            setEnquiryStatus(e.target.value, enqState[i]._id)
                        }>
                        <option value="Submitted">Đã gửi</option>
                        <option value="Contacted">Đã liên hệ</option>
                        <option value="In Progress">Trong tiến trình</option>
                        <option value="Resolved">Đã giải quyết</option>
                    </select>
                </>
            ),
            action: (
                <>
                    <Link
                        to={`/admin/enquiries/${enqState[i]._id}`}
                        className="ms-3 fs-3 text-danger">
                        <AiOutlineEye />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(enqState[i]._id)}>
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }
    const setEnquiryStatus = (e, i) => {
        const data = { id: i, enqData: e };
        dispatch(updateAEnquiry(data));
    };
    const deleteEnq = (e) => {
        dispatch(deleteAEnquiry(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getEnquiries());
        }, 100);
    };
    return (
        <div>
            <h3 className="mb-4 title">Hỏi đáp</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteEnq(enqId);
                }}
                title="Bạn có chắc chắn muốn xóa câu hỏi này không?"
            />
        </div>
    );
};

export default Enquiries;
