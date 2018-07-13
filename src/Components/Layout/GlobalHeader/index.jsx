import React, { PureComponent } from 'react';
import { Menu, Icon, Dropdown, Avatar, Tooltip, Form, Modal, Input, message } from 'antd';
import { Link } from "react-router-dom";
import './style.css';
import { post } from "../../../Utils/fetch";
import { getItem } from "../../../Utils/storage";

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (fieldsValue.password.length > 0) {
                if (err) return;
                form.resetFields();
                if (fieldsValue.password === fieldsValue.verifypassword) {
                    handleAdd(fieldsValue);
                    handleModalVisible();
                } else {
                   message.error("两次密码不一致!");
                }
            }
        });
    };
    return (
        <Modal
            title="修改密码"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="规则">
                {form.getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input some rule...' }],
                })(<Input placeholder="请输入密码" type="password"/>)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('verifypassword', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(<Input placeholder="请再输一遍" type="password"/>)}
            </FormItem>
        </Modal>
    );
});


export default class GlobalHeader extends PureComponent {
    state ={
        modalVisible: false,
        username:  this.props.username || 'Username' ,
    };

    componentDidMount() {
        const username = getItem("username");
        this.setState({
            username
        });
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    // @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }


    handleAdd = data => {
        this.setState({
            modalVisible: true
        });
        post('user/update', {
            password: data.password
        }).then(response => {
            if(response.success) {
                message.success(response.info);
            }
        })
    };

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    render() {
        const {
            collapsed,
            onMenuClick,
        } = this.props;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        const menu = (
            <Menu className={"menu"} selectedKeys={[]} onClick={onMenuClick}>
                {/*<Menu.Item disabled>*/}
                    {/*<Link to={'/user/center'}>*/}
                        {/*<Icon type="user" />个人中心*/}
                    {/*</Link>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item disabled>*/}
                    {/*<Icon type="setting" />设置*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="password"
                    onClick={this.handleAdd}
                >
                    <Icon type="edit" />修改密码
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Link to={"/logout"} ><Icon type="logout" />退出登录</Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={"header"}>
                <Icon
                    className={"trigger"}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={"right"}>
                    {/*<HeaderSearch*/}
                        {/*className={`${styles.action} ${styles.search}`}*/}
                        {/*placeholder="站内搜索"*/}
                        {/*dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}*/}
                        {/*onSearch={value => {*/}
                            {/*console.log('input', value); // eslint-disable-line*/}
                        {/*}}*/}
                        {/*onPressEnter={value => {*/}
                            {/*console.log('enter', value); // eslint-disable-line*/}
                        {/*}}*/}
                    {/*/>*/}
                    <Tooltip title="使用文档">
                        <a
                            target="_blank"
                            href="https://www.flyce.cn/"
                            rel="noopener noreferrer"
                            className={"action"}
                        >
                            <Icon type="question-circle-o" />
                        </a>
                    </Tooltip>
                    {/*<NoticeIcon*/}
                        {/*className={"action"}*/}
                        {/*count={8}*/}
                        {/*onItemClick={(item, tabProps) => {*/}
                            {/*console.log(item, tabProps); // eslint-disable-line*/}
                        {/*}}*/}
                        {/*onClear={onNoticeClear}*/}
                        {/*onPopupVisibleChange={onNoticeVisibleChange}*/}
                        {/*loading={fetchingNotices}*/}
                        {/*popupAlign={{ offset: [20, -16] }}*/}
                    {/*>*/}
                        {/*<NoticeIcon.Tab*/}
                            {/*// list={[{id: "000000001", avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png", title: "你收到了 14 份新周报", datetime: "10 个月前", type: "通知"}]}*/}
                            {/*title="通知"*/}
                            {/*emptyText="你已查看所有通知"*/}
                            {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"*/}
                        {/*/>*/}
                        {/*<NoticeIcon.Tab*/}
                            {/*list={[*/}

                                {/*{id: "000000006", avatar: "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg", title: "曲丽丽 评论了你", description: "描述信息描述信息描述信息", datetime: "10 个月前"},*/}
                            {/*{id: "000000007", avatar: "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg", title: "朱偏右 回复了你", description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像", datetime: "10 个月前"},*/}
                            {/*{id: "000000008", avatar: "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg", title: "标题", description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像", datetime: "10 个月前"}*/}
                            {/*]}*/}
                            {/*title="消息"*/}
                            {/*emptyText="您已读完所有消息"*/}
                            {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"*/}
                        {/*/>*/}
                        {/*<NoticeIcon.Tab*/}
                            {/*list={[*/}
                                {/*{id: "000000009", title: "任务名称", description: "任务需要在 2017-01-12 20:00 前启动",  status: "todo"},*/}
                                {/*{id: "000000010", title: "第三方紧急代码变更", description: "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务", status: "urgent", },*/}
                                {/*{id: "000000011", title: "信息安全考试", description: "指派竹尔于 2017-01-09 前完成更新并发布", status: "doing" },*/}
                                {/*{id: "000000012", title: "ABCD 版本发布", description: "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务", status: "processing"}*/}

                                {/*]}*/}
                            {/*title="待办"*/}
                            {/*emptyText="你已完成所有待办"*/}
                            {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"*/}
                        {/*/>*/}
                    {/*</NoticeIcon>*/}
                    <Dropdown overlay={menu}>
                      <span className={"action account"}>
                        <Avatar size="small" className={"avatar"} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                        <span className={"name"}>{this.state.username}</span>
                      </span>
                    </Dropdown>
                    {/*<Spin size="small" style={{ marginLeft: 8 }} />*/}
                </div>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey />
            </div>
        );
    }
}
