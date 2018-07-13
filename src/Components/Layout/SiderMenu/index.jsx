import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const { Sider } = Layout;

class SiderMenu extends PureComponent {
    state = {
        modalVisible: false,
    };

    render() {
        const { logo, collapsed, onCollapse } = this.props;
        return (
            <div>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint="lg"
                    width={256}
                    className="sider"
                    onCollapse={onCollapse}
                >
                    <div className="logo" key="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                            <h1>IRIS STUDIO</h1>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.path]} defaultOpenKeys={['sub']}>
                        <Menu.Item key="user">
                            <Icon type="user" />
                            <span className="nav-text">用户管理</span>
                            <Link to={"user"}/>
                        </Menu.Item>
                        <Menu.Item key="unActive">
                            <Icon type="lock" />
                            <span className="nav-text">未激活用户</span>
                            <Link to={"unActive"}/>
                        </Menu.Item>
                        <Menu.Item key="cad">
                            <Icon type="folder" />
                            <span className="nav-text">CAD 查看</span>
                            <Link to={"cad"}/>
                        </Menu.Item>
                        <Menu.Item key="ad">
                            <Icon type="folder-open" />
                            <span className="nav-text">AD 查看</span>
                            <Link to={"ad"}/>
                        </Menu.Item>
                        <Menu.Item key="mail">
                            <Icon type="mail" />
                            <span className="nav-text">邮件日志</span>
                            <Link to={"mail"}/>
                        </Menu.Item>
                        <Menu.Item key="notice">
                            <Icon type="notification" />
                            <span className="nav-text">发送通知</span>
                            <Link to={"notice"}/>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default SiderMenu;