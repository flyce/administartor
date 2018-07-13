import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Form, Input, Table, Modal, message } from 'antd';
import LoginVerify from '../LoginVerify';
import {get, post} from '../../Utils/fetch';
const FormItem = Form.Item;
// const { Option } = Select;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
            handleModalVisible();
        });
    };
    return (
        <Modal
            title="新建规则"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="规则">
                {form.getFieldDecorator('rule', {
                    rules: [{ required: true, message: 'Please input some rule...' }],
                })(<Input placeholder="请输入规则" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('description', {
                    rules: [{ message: 'Please input some description...' }],
                })(<Input placeholder="请输入描述" />)}
            </FormItem>
        </Modal>
    );
});

class UserManage extends PureComponent {
    state = {
        modalVisible: false,
        isLoading: true,
        data: [{
            rule: "MULT",
            status: true,
            description: 'NG',
            id: "5b1e729a8d7b920b3306251b",
            updatedAt: '2018/6/21 15:41:09'
        }],
    };

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleAdd = data => {
        const arr = this.state.data;
        data.status = true;
        data.updatedAt = new Date().toLocaleString('zh-CN', {hour12:false});
        let existFlag = false;
        arr.map((value) => {
            if (data.rule === value.rule) {
                existFlag = true;
            }
            return 0;
        });
        if (!existFlag) {
            arr.push(data);
            this.setState ({
                data: arr
            });
            const rule = [...arr];
            post('user/rule', {rule}).then((response) => {
                if (response.success) {
                    message.success(response.info);
                } else {
                    message.error(response.info);
                }
            });
        } else {
            message.error(`rule: ${data.rule} 已存在！`);
        }
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
        })
    }

    handleRemove = value => {
        const data = this.state.data.filter(res => res.rule !== value.rule);
        this.setState({
            data
        });
        const rule = [...data];
        post('user/rule', {rule}).then((response) => {
            if (response.success) {
                message.success(response.info);
            } else {
                message.error(response.info);
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
                title: '订阅',
                dataIndex: 'subscribe',
                key: 'subscribe',
                render: val => {
                    return val ? <span>是</span> : <span>否</span>
                }
            },
            {
                title: 'AD订阅',
                dataIndex: 'receivedad',
                key: 'receivedad',
                render: val => {
                    return val ? <span>是</span> : <span>否</span>
                }
            },
            {
                title: 'CAD订阅',
                dataIndex: 'receivedcad',
                key: 'receivedcad',
                render: val => {
                    return val ? <span>是</span> : <span>否</span>
                }
            },
            {
                title: '操作',
                render: (value) => (
                    <Fragment>
                        <Button onClick={() => {message.warning("功能开发中" + value.username)}}>管理</Button>
                    </Fragment>
                ),
            },
        ];

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
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
                    <div className={"tableList"}>
                        <div className={"tableListOperator"}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建
                            </Button>
                        </div>
                        <Table columns={columns} dataSource={this.state.data} rowKey={record => record._id} />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey />
            </div>
        );
    }
};

export default UserManage;