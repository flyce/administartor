import React, { PureComponent } from 'react';
import { Card, Table,  message } from 'antd';
import LoginVerify from '../LoginVerify';
import { get } from '../../Utils/fetch';

class Ad extends PureComponent {
    state = {
        isLoading: true,
        data: null
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
        })
    }

    render () {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        const columns = [
            {
                title: 'number',
                dataIndex: 'number',
                key: 'number'
            },
            {
                title: 'issuedBy',
                dataIndex: 'issuedBy',
                key: 'issuedBy'
            },
            {
                title: 'issuedDate',
                dataIndex: 'issuedDate',
                key: 'issuedDate',
            },
            {
                title: 'subject',
                dataIndex: 'subject',
                key: 'subject'
            },
            {
                title: 'Designation',
                dataIndex: 'approvalHolderTypeDesignation',
                key: 'approvalHolderTypeDesignation'
            },
            {
                title: 'effectiveDate',
                dataIndex: 'effectiveDate',
                key: 'effectiveDate'
            },
            {
                title: '抓取时间',
                dataIndex: 'timestamp',
                key: 'timestamp',
                render: (value) => (
                    <div>
                    {new Date(value).toLocaleString('zh-CN', { hour12: false })}
                    </div>
                )
            }
        ];

        // if (this.state.isLoading) {
        //     return (
        //         <div>Loading</div>
        //     );
        // }

        return (
            <div>
                <LoginVerify/>
                <Card bordered={false}>
                    <div className={"tableList"}>
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            rowKey={record => record._id}
                            loading={this.state.isLoading}
                            pagination={
                                {
                                    showSizeChanger: true,
                                    defaultCurrent: 1,
                                    total: 53
                                }
                            }
                        />
                    </div>
                </Card>
            </div>
        );
    }
};

export default Ad;