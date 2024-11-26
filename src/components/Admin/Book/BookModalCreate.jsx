import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification } from 'antd';
import { createUser } from '../../service/apiService';

const BookModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { fullName, password, email, phone } = values;
        setIsSubmit(true)
        const res = await createUser(fullName, password, email, phone);
        if (res && res.data) {
            message.success('Tạo mới sách thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchUser()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };


    return (
        <>

            <Modal
                title="Thêm mới sách"
                open={openModalCreate}
                onOk={() => { form.submit() }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
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
                >
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
                        rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}
                    >
                        <Input />
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

export default BookModalCreate;
