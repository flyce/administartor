import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import SiderMenu from './SiderMenu';
import logo from '../../assets/logo.svg';

const { Content, Header, Footer } = Layout;

class BasicLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            collapsed: false
        });
    }

    // 折叠导航栏
    onCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        const { collapsed } = this.state;
        const { path } = this.props;
        return (
            <Layout>
                <SiderMenu
                    collapsed={collapsed}
                    onCollapse={this.onCollapse.bind(this)}
                    logo={logo}
                    path={path}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            logo={logo}
                            collapsed={collapsed}
                            onCollapse={this.onCollapse.bind(this)}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        {this.props.content}
                    </Content>
                    <Footer style={{ padding: 0 }}>
                        <GlobalFooter
                            // links={[
                            //     {
                            //         key: "Echo's Blog",
                            //         title: "Echo's Blog",
                            //         href: 'http://pro.ant.design',
                            //         blankTarget: true,
                            //     }
                            // ]}
                            copyright={
                                <Fragment>
                                    Copyright <Icon type="copyright" /> 2018 鸢尾工作室
                                </Fragment>
                            }
                        />
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;
