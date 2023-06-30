import React, { useEffect } from 'react';
import { Tree } from 'antd'
import { FileOutlined, FileOutlinedRed, FolderOutlined } from '../../../components/Icon';
const { TreeNode } = Tree;
interface Props {
    stateRequirementFolderView: any
    idSelectedRow: any
    handleClickFile:(key:any,{node}:any)=>void
}
const RequirementRegisterFolderView: React.FC<Props> = ({ stateRequirementFolderView, idSelectedRow, handleClickFile }) => {
    const findKeyById = (data: any, id: number): string | null => {
        for (const node of data) {
            if (node.id === id) {
                return node.key;
            }
            if (node.children) {
                const key = findKeyById(node.children, id);
                if (key) {
                    return key;
                }
            }
        }
        return null;
    };
    const renderTreeNodes = (treeData: any) => {
        return treeData.map((node: any) => {
            const { key, title, children, ...all } = node;
            let icon;
            if (key?.startsWith('fd')) {
                icon = <FolderOutlined />;
            }
            else if (!key?.startsWith('fd') && children.length > 0) {
                icon = <FileOutlinedRed />;
            }
            else {
                icon = <FileOutlined />;
            }
            return (
                <TreeNode icon={icon} title={title} key={key} {...all}>
                    {renderTreeNodes(children)}
                </TreeNode>
            );
        });
    };
    const selectedKey = idSelectedRow ? findKeyById(stateRequirementFolderView, idSelectedRow) : null;
    const defaultSelectedKeys = selectedKey ? [selectedKey] : [];
    return (
        <Tree
            onSelect={handleClickFile}
            showIcon
            height={700}
            selectedKeys={defaultSelectedKeys}
        >
            {renderTreeNodes(stateRequirementFolderView)}
        </Tree>
    );
};

export default RequirementRegisterFolderView;