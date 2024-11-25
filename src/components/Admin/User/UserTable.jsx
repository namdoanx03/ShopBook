// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import InputSearch from './InputSearch';
import { fetchListUser } from '../../service/apiService';

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
    const [listUser, setListUser] = useState([])
    const [current, setCurrent] = useState(1) // trang ban dau la 1
    const [pageSize, setPageSize] = useState(5) // hien thi so nguoi dung moi trang
    const [total, setTotal] = useState(0) //tong so trang

    useEffect(() => {
        fetchUser()
    },[current, pageSize])

    const fetchUser = async() => {
        const query = `current=${current}&pageSize=${pageSize}`;
        let res = await fetchListUser(query)
        console.log(res)
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total)
        }

    }
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            sorter: true
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            // eslint-disable-next-line no-unused-vars
            render: (text, record, index) => {
                return (
                    <><button>Delete</button></>
                )
            }
        }
    ];


    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        className='def'
                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total
                            }
                        }
                    />
                </Col>
            </Row>
        </>
    )
}


export default UserTable;
