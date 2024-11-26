// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Modal } from 'antd';

const UserModalCreate = (props) => {
    // eslint-disable-next-line react/prop-types
    const { openModalCreate, setOpenModalCreate } = props;

    return (
        <>

            <Modal
                title="Basic Modal"
                open={openModalCreate}
                onOk={() => setOpenModalCreate(false)}
                onCancel={() => setOpenModalCreate(false)}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default UserModalCreate;
