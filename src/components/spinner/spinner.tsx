import React from "react";
import { Alert, Spin } from 'antd';

const Spinner: React.FC = () => (
    <Spin tip="Loading..." size="large">
        <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
        />
    </Spin>
);

export default Spinner