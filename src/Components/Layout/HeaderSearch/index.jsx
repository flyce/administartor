import React from 'react';
import { Input } from 'antd';

const Search = () => (
    <div
        style={{
            textAlign: 'right',
            height: '64px',
            lineHeight: '64px',
            boxShadow: '0 1px 4px rgba(0,21,41,.12)',
            padding: '0 32px',
            width: '400px',
        }}
    >
        <Input
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={(value) => {
                console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={(value) => {
                console.log('enter', value); // eslint-disable-line
            }}
        />
    </div>
);

export default Search;