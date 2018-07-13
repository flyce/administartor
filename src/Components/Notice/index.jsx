import React, { PureComponent } from 'react';
import { Form, Button, Card, Input, message } from 'antd';
import LoginVerify from '../LoginVerify';
import { post } from '../../Utils/fetch';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

const FormItem = Form.Item;

class NoticeForm extends PureComponent {
    state = {
        text: null,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const content = this.state.text;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            if(content !== null && content !== '<p></p>') {
                values.content = content;
                post('admin/notice', values).then(res => {
                    console.log(res);
                    if(res.success) {
                        message.success(res.info);
                    } else {
                        message.error(res.info);
                    }
                });
            } else {
                message.error("邮件内容不能为空");
            }
          }
        });
    }

    handleChange = (content) => {
        this.setState({ text: content });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 21 },
        };
        const editorProps = {
            height: 300,
            contentFormat: 'html',
            onChange: this.handleChange
        }

        return (
            <div>
                <LoginVerify/>
                <Card bordered={false}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="邮件主题">
                        {getFieldDecorator('subject', {
                            rules: [{
                            required: true,
                            message: '请输入邮件主题',
                            }],
                        })(
                            <Input placeholder="请输入邮件主题" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="收件人">
                        {getFieldDecorator('receiver', {
                            rules: [{
                            required: true,
                            message: '请输入收件人',
                            }],
                        })(
                            <Input placeholder="请输入收件人，多个收件人采用 ; 隔开，发给全员使用@all" />
                        )}
                    </FormItem>
                    <BraftEditor {...editorProps}/>
                    <FormItem>
                        <Button type="primary" htmlType="submit">发送</Button>
                    </FormItem>
                </Form>
                </Card>
            </div>
        );
    }
};

const Notice = Form.create()(NoticeForm);

export default Notice;