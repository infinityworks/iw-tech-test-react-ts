type Meta = {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
};

type Links = [
    {
        rel: string;
        href: string;
    }
];

export type EstablishmentsType = {
    establishments: {}[];
    meta: Meta;
    links: Links;
};

export type LocalAuthorityType = {
    authorities: {
        Name: string;
        LocalAuthorityId: number;
    }[];
    meta: Meta;
    links: Links;
}