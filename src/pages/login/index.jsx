import { Button, Divider, Form, Input, message, notification } from 'antd';
import './login.scss'
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from '../../components/service/apiService';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {

    const { username, password } = values;
    setIsSubmit(true);
    const res = await postLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      message.success('Đăng nhập tài khoản thành công!');
      navigate('/')
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message) ? res.message[0] : res.message,
        duration: 5
      })
    }
  };

  return (
    <div>
      <div className="register-page">
        <main className="main">
          <div className="container">
            <section className="wrapper">
              <div className="heading">
                <h2 className="text text-large">Đăng Nhập</h2>
                <Divider />
              </div>
              <Form
                name="basic"
                // style={{ maxWidth: 600, margin: '0 auto' }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  labelCol={{ span: 24 }} //whole column
                  label="Email"
                  name="username"
                  rules={[{ required: true, message: 'Email không được để trống!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }} //whole column
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                // wrapperCol={{ offset: 6, span: 16 }}
                >
                  <Button type="primary" htmlType="submit" loading={isSubmit} >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Divider>Or</Divider>
                <p className="text text-normal">Chưa có tài khoản ?
                  <span>
                    <Link to='/register' > Đăng Kí </Link>
                  </span>
                </p>
              </Form>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Login