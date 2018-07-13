import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Row, Col, Form, Input, Table, Modal, message } from 'antd';
import './style.css'
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

class UserRule extends PureComponent {
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
        get('user/rule').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.rule,
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
                title: '规则',
                dataIndex: 'rule',
                key: 'rule'
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: val => {
                    return val ? <span>运行中</span> : <span>关闭</span>
                }
            },
            {
                title: '创建时间',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                sorter: true,
            },
            {
                title: '操作',
                render: (value) => (
                    <Fragment>
                        {/*<Button onClick={() => {console.log(vaule)}}>停用</Button>*/}
                        {/*<Divider type="vertical" />*/}
                        <Button onClick={() => {this.handleRemove(value)}}>删除</Button>
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
                        <div className={"tableListForm"}>
                            <Form  layout="inline">
                                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                    <Col>
                                        {/*<FormItem label="规则">*/}
                                            {/*<Input placeholder="请输入" />*/}
                                        {/*</FormItem>*/}
                                        使用说明：<br />该规则CAAC CAD和EASA AD通用，CAD匹配指令编号(CAD2018-B737-10)，
                                        AD匹配Approval Holder / Type Designation（BOEING 737），
                                        如果在标题中匹配到关键词，则发送邮件到您预留的邮箱。
                                        为了达到更好的效果，建议只输入最小关键词。
                                        例如BOEING 737建议设置匹配关键词为737；AIRBUS A320建议设置关键词为320。<br />
                                    </Col>
                                    {/*<Col md={8} sm={24}>*/}
                                        {/*<FormItem label="使用状态">*/}

                                            {/*<Select placeholder="请选择" style={{ width: '100%' }}>*/}
                                                {/*<Option value="0">关闭</Option>*/}
                                                {/*<Option value="1">运行中</Option>*/}
                                            {/*</Select>*/}

                                        {/*</FormItem>*/}
                                    {/*</Col>*/}
                                    {/*<Col md={8} sm={24}>*/}
                                    {/*<span className={"submitButtons"}>*/}
                                        {/*<Button type="primary">*/}
                                            {/*查询*/}
                                        {/*</Button>*/}
                                        {/*<Button style={{ marginLeft: 8 }}>*/}
                                            {/*重置*/}
                                        {/*</Button>*/}
                                    {/*</span>*/}
                                    {/*</Col>*/}
                                </Row>
                            </Form>
                        </div>
                        <div className={"tableListOperator"}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建
                            </Button>
                        </div>
                        <Table columns={columns} dataSource={this.state.data} rowKey={record => record.updatedAt} />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey />
            </div>
        );
    }
};

export default UserRule;