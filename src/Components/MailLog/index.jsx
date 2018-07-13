import React, { PureComponent } from 'react';
import { Card, Table, message } from 'antd';
import LoginVerify from '../LoginVerify';
import { get } from '../../Utils/fetch';

class Ad extends PureComponent {
    state = {
        isLoading: true,
        data: null
    };

    componentDidMount() {
        get('admin/maillog').then((res) => {
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

    render () {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        const columns = [
            {
                title: '接收者',
                dataIndex: 'receiver',
                key: 'receiver'
            },
            {
                title: '主题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '规则',
                dataIndex: 'rule',
                key: 'rule'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '发送者',
                dataIndex: 'sender',
                key: 'sender'
            },
            {
                title: '发送时间',
                dataIndex: 'timestamp',
                key: 'timestamp',
                render: (value) => (
                    <div>
                    {new Date(value).toLocaleString('zh-CN', { hour12: false })}
                    </div>
                )
            }
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

export default Ad;