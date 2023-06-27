export interface FolderGrid {
    folderId: number
    folderName?: string | null
    folderNameShow: string
    parentFolderId?: string | number | null
}
export interface ItemFolderGrid {
    assigneeName: string
    businessImportance: string
    entityId: string
    folderId?: string
    parentId?: string | number | null
    title: string
    type?: number | string | null
}
export interface IUserStories {
    folderGrid: FolderGrid;
    items: ItemFolderGrid[];
}

