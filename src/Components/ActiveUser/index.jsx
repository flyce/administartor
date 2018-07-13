import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Table, message, Divider } from 'antd';
import LoginVerify from '../LoginVerify';
import {get, post} from '../../Utils/fetch';
// const FormItem = Form.Item;
// const { Option } = Select;

// const CreateForm = Form.create()(props => {
//     const { modalVisible, form, handleAdd, handleModalVisible } = props;
//     const okHandle = () => {
//         form.validateFields((err, fieldsValue) => {
//             if (err) return;
//             form.resetFields();
//             handleAdd(fieldsValue);
//             handleModalVisible();
//         });
//     };
//     return (
//         <Modal
//             title="新建规则"
//             visible={modalVisible}
//             onOk={okHandle}
//             onCancel={() => handleModalVisible()}
//         >
//             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="规则">
//                 {form.getFieldDecorator('rule', {
//                     rules: [{ required: true, message: 'Please input some rule...' }],
//                 })(<Input placeholder="请输入规则" />)}
//             </FormItem>
//             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
//                 {form.getFieldDecorator('description', {
//                     rules: [{ message: 'Please input some description...' }],
//                 })(<Input placeholder="请输入描述" />)}
//             </FormItem>
//         </Modal>
//     );
// });

class ActiveUser extends PureComponent {
    state = {
        isLoading: true,
        data: null
    };
    
    componentDidMount() {
        get('admin/unactive').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.docs,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        })
    }

    handleDecline = value => {
        const data = this.state.data.filter(res => res._id !== value._id);
        this.setState({
            data
        });
        post('admin/pass', {_id: value._id, pass: false}).then((response) => {
            if (response.success) {
                message.success(response.info);
            } else {
                message.error(response.info);
            }
        });
    };

    handlePass = value => {
        const data = this.state.data.filter(res => res._id !== value._id);
        this.setState({
            data
        });
        post('admin/pass', {_id: value._id, pass: true}).then((response) => {
            if (response.success) {
                message.success(response.info);
            } else {
                message.error(response.info);
            }
        });
    }

    render () {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '公司',
                dataIndex: 'company',
                key: 'company'
            },
            {
                title: '邮箱',
                dataIndex: 'mail',
                key: 'mail'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'created',
                key: 'created',
                render: (value) => (
                    <div>
                    {new Date(value).toLocaleString('zh-CN', { hour12: false })}
                    </div>
                )
            },
            {
                title: '操作',
                render: (value) => (
                    <Fragment>
                        <Button onClick={() => {this.handlePass(value)}}>通过</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => {this.handleDecline(value)}}>拒绝</Button>
                    </Fragment>
                ),
            },
        ];

        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            );
        }

        return (
            <div>
                <LoginVerify/>
                <Card bordered={false}>
                    <div className={"tableList"}>
                        <Table columns={columns} dataSource={this.state.data} rowKey={record => record._id} />
                    </div>
                </Card>
            </div>
        );
    }
};

export default ActiveUser;