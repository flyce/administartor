import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Form, Input, Table, Modal, message } from 'antd';
import LoginVerify from '../LoginVerify';
import { get, post } from '../../Utils/fetch';
const FormItem = Form.Item;
// const { Option } = Select;

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleModalVisible, value, handleUpdate } = props;

    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            post('admin/user', {_id: value._id, ...fieldsValue}).then(res => {
                if (res.success) {
                    message.success(res.info);
                } else {
                    message.error(res.info);
                }
            });
            form.resetFields();
            handleUpdate({_id: value._id, ...fieldsValue});
            handleModalVisible();
        });
    };

    const resetPassword = () => {
        post('admin/reset', {_id: value._id}).then(res => {
            if (res.success) {
                message.success(res.info);
            } else {
                message.error(res.info);
            }
        });
        handleModalVisible();
    };

    return (
        <Modal
            title="用户管理"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            footer={[
                <Button key="reset" type="danger" onClick={resetPassword}>
                    重置密码
                </Button>,
                <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
                <Button key="ok" type="primary" onClick={okHandle}>
                    确定
                </Button>,
            ]}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
                {form.getFieldDecorator('username', {
                    rules: [{ message: 'Please input some username...' }],
                    initialValue: value.username
                })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
                {form.getFieldDecorator('name', {
                    rules: [{ message: 'Please input name...' }],
                    initialValue: value.name
                })(<Input placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司">
                {form.getFieldDecorator('company', {
                    rules: [{ message: 'Please input company...' }],
                    initialValue: value.company
                })(<Input placeholder="请输入公司名称" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="职位">
                {form.getFieldDecorator('position', {
                    rules: [{ message: 'Please input position...' }],
                    initialValue: value.position
                })(<Input placeholder="请输入职位" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
                {form.getFieldDecorator('phone', {
                    rules: [{ message: 'Please input phone number...' }],
                    initialValue: value.phone
                })(<Input placeholder="请输入手机号" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
                {form.getFieldDecorator('mail', {
                    rules: [{ message: 'Please input mail address...' }],
                    initialValue: value.mail
                })(<Input placeholder="请输入邮箱" />)}
            </FormItem>
        </Modal>
    );
});

class UserManage extends PureComponent {
    state = {
        modalVisible: false,
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
        value: {
          username: "Echo",
          name: "Echo",
          company: "Iris Studio",
          position: "programer",
          phone: "17192222622",
          mail: "mail@flyce.cn"
        }
    };

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleUpdate = (value) => {
        let data = this.state.data;
        data.map((doc, key) => {
            if (doc._id === value._id) {
                doc.username = value.username;
                doc.name = value.name;
                doc.company = value.company;
                doc.position = value.position;
                doc.phone = value.phone;
                doc.mail = value.mail;
            }
            return 0;
        });
        this.setState({
            data
        });
    };

    componentDidMount() {
        get('admin/user').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.docs,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
        get('admin/count?path=user').then(res => {
            if(res.success) {
                this.setState({
                    count: res.count
                });
            } else {
                message.error(res.info);
            }
        });
    }

    handleManage = (value) => {
        this.setState({
            value
        });
    };


    onChange = (page) => {
        get('admin/user?skip=' + (page - 1)).then((res) => {
            if(res.success) {
                this.setState({
                    data: res.docs,
                    defaultCurrent: page,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    render () {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: "10%"
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: "10%"
            },
            {
                title: '公司',
                dataIndex: 'company',
                key: 'company',
                width: "20%"
            },
            {
                title: '邮箱',
                dataIndex: 'mail',
                key: 'mail',
                width: "20%"
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
                width: "13%"
            },
            {
                title: '订阅',
                dataIndex: 'subscribe',
                key: 'subscribe',
                render: val => {
                    return val ? <span>是</span> : <span>否</span>
                },
                width: "6%"
            },
            {
                title: 'CAD',
                dataIndex: 'receivedcad',
                key: 'receivedcad',
                render: val => {
                    return val ? <span>是</span> : <span>否</span>
                },
                width: "6%"
            },
            {
                title: 'AD',
                dataIndex: 'receivedad',
                key: 'receivedad',
                render: val => {
                    return val ? <span>是</span> : <span>否</span>
                },
                width: "6%"
            },
            {
                title: '操作',
                render: (value) => (
                    <Fragment>
                    <Button size="small" onClick={
                        () => {
                            console.log(value);
                            this.handleManage(value);
                            this.handleModalVisible(true);
                        }
                    }>管理</Button>
                    </Fragment>
                ),
                width: "10%"
            },
        ];

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            handleUpdate: this.handleUpdate
        };

        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            );
        }

        return (
            <div>
                <LoginVerify/>
                <Card bordered={false}>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        rowKey={record => record._id}
                        bordered
                        pagination={{
                            defaultCurrent: this.state.defaultCurrent,
                            total: this.state.count,
                            onChange:this.onChange
                        }}
                    />
                </Card>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey value={this.state.value}/>

            </div>
        );
    }
};

export default UserManage;
