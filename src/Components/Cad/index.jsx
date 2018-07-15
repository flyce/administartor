import React, { PureComponent } from 'react';
import { Card, Table, message } from 'antd';
import LoginVerify from '../LoginVerify';
import { get } from '../../Utils/fetch';
// const { Option } = Select;

class Cad extends PureComponent {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1
    };


    componentDidMount() {
        get('admin/cad').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.docs,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
        get('admin/count?path=cad').then(res => {
            if(res.success) {
                this.setState({
                    count: res.count
                });
            } else {
                message.error(res.info);
            }
        });
    }

    onChange = (page) => {
        get('admin/cad?skip=' + (page - 1)).then((res) => {
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
                title: 'cadNo',
                dataIndex: 'cadNo',
                key: 'cadNo'
            },
            {
                title: 'cadAmendmentNo',
                dataIndex: 'cadAmendmentNo',
                key: 'cadAmendmentNo'
            },
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'issuedBy',
                dataIndex: 'issuedBy',
                key: 'issuedBy'
            },
            {
                title: 'referenceDocuments',
                dataIndex: 'referenceDocuments',
                key: 'referenceDocuments'
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
                        <Table columns={columns}
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

export default Cad;
