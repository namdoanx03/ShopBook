// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Divider, Form, Input, message, Modal, notification } from 'antd';
import { updateUser } from '../../service/apiService';

const BookModalUpdate = (props) => {
    // eslint-disable-next-line react/prop-types
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        const { fullName, _id, phone } = values;
        setIsSubmit(true)
        const res = await updateUser(_id, fullName, phone);
        if (res && res.data) {
            message.success('Cập nhật user thành công');
            setOpenModalUpdate(false);
            // eslint-disable-next-line react/prop-types
            await props.fetchUser()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật thông tin sách"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                // initialValues={dataUpdate}
                >
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="Id"
                        name="_id"
                        rules={[{ required: true, message: 'Vui lòng nhập Id!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên sách"
                        name="mainText"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Thể loại"
                        name="category"
                        rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Giá tiền"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BookModalUpdate;