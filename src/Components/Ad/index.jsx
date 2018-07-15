import React, { PureComponent } from 'react';
import { Card, Table,  message } from 'antd';
import LoginVerify from '../LoginVerify';
import { get } from '../../Utils/fetch';

class Ad extends PureComponent {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1
    };

    onChange = (page) => {
        get('admin/ad?skip=' + (page - 1)).then((res) => {
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

    componentDidMount() {
        get('admin/ad').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.docs,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
        get('admin/count?path=ad').then(res => {
           if(res.success) {
               this.setState({
                   count: res.count
               });
           } else {
               message.error(res.info);
           }
        });
    }

    render () {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        const columns = [
            {
                title: 'AD号',
                dataIndex: 'number',
                key: 'number',
                width: "12%"
            },
            {
                title: '发布人',
                dataIndex: 'issuedBy',
                key: 'issuedBy',
                width: "7%"
            },
            {
                title: 'issuedDate',
                dataIndex: 'issuedDate',
                key: 'issuedDate',
                width: "10%"
            },
            {
                title: '主题',
                dataIndex: 'subject',
                key: 'subject',
                width: "25%"
            },
            {
                title: '航空器',
                dataIndex: 'approvalHolderTypeDesignation',
                key: 'approvalHolderTypeDesignation',
                width: "18%"
            },
            {
                title: '生效日期',
                dataIndex: 'effectiveDate',
                key: 'effectiveDate',
                width: "10%"
            },
            {
                title: '抓取时间',
                dataIndex: 'timestamp',
                key: 'timestamp',
                render: (value) => (
                    <div>
                    {new Date(value).toLocaleString('zh-CN', { hour12: false })}
                    </div>
                ),
                width: "15%"
            }
        ];

        return (
            <div>
                <LoginVerify/>
                <Card bordered={false}>
                    <div className={"tableList"}>
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            rowKey={record => record._id}
                            pagination={{
                                defaultCurrent: this.state.defaultCurrent,
                                total: this.state.count,
                                onChange:this.onChange
                            }}
                        />
                    </div>
                </Card>
            </div>
        );
    }
};

export default Ad;
