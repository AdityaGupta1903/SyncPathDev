export interface SpreadSheet {
    spread_sheet_data: SpreadSheetDetails[]
}

export interface SpreadSheetDetails {
    kind: string
    userPermission: UserPermission
    selfLink: string
    ownerNames: string[]
    lastModifyingUserName?: string
    editable: boolean
    writersCanShare: boolean
    mimeType: string
    exportLinks: ExportLinks
    parents: Parent[]
    thumbnailLink: string
    appDataContents: boolean
    iconLink: string
    shared: boolean
    lastModifyingUser?: LastModifyingUser
    owners: Owner[]
    copyable: boolean
    etag: string
    alternateLink: string
    embedLink: string
    fileSize?: string
    copyRequiresWriterPermission: boolean
    spaces: string[]
    id: string
    title: string
    labels: Labels
    explicitlyTrashed: boolean
    createdDate: string
    modifiedDate: string
    modifiedByMeDate?: string
    lastViewedByMeDate: string
    markedViewedByMeDate: string
    quotaBytesUsed: string
    version: string
    capabilities: Capabilities
    sharedWithMeDate?: string
}

export interface UserPermission {
    id: string
    type: string
    role: string
    kind: string
    selfLink: string
    etag: string
    pendingOwner: boolean
}

export interface ExportLinks {
    "application/x-vnd.oasis.opendocument.spreadsheet": string
    "text/tab-separated-values": string
    "application/pdf": string
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": string
    "text/csv": string
    "application/zip": string
    "application/vnd.oasis.opendocument.spreadsheet": string
}

export interface Parent {
    selfLink: string
    id: string
    isRoot: boolean
    kind: string
    parentLink: string
}

export interface LastModifyingUser {
    displayName: string
    kind: string
    isAuthenticatedUser: boolean
    permissionId?: string
    emailAddress?: string
    picture?: Picture
}

export interface Picture {
    url: string
}

export interface Owner {
    displayName: string
    kind: string
    isAuthenticatedUser: boolean
    permissionId: string
    emailAddress: string
    picture: Picture2
}

export interface Picture2 {
    url: string
}

export interface Labels {
    viewed: boolean
    restricted: boolean
    starred: boolean
    hidden: boolean
    trashed: boolean
}

export interface Capabilities {
    canEdit: boolean
    canCopy: boolean
}
