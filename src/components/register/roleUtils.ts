import { Trees, Truck, Factory, Package, Ship, Plane } from "lucide-react";

export interface Role {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>; // React component for the icon
    description: string;
    type: string; //type of name
}

export const businessRoles: Role[] = [
    {
        name: "Chủ rừng",
        icon: Trees,
        description: "Quản lý và sở hữu tài nguyên rừng",
        type: "forest_owner",
    },
    {
        name: "Thương nhân/Khai thác",
        icon: Truck,
        description: "Khai thác và buôn bán gỗ",
        type: "trader_harvester",
    },
    {
        name: "Xưởng cưa/Sơ chế",
        icon: Factory,
        description: "Chế biến gỗ nguyên liệu",
        type: "sawmill_primary_processor",
    },
    {
        name: "Công ty chế biến",
        icon: Package,
        description: "Chế biến gỗ nâng cao",
        type: "processing_company",
    },
    {
        name: "Công ty nhập khẩu",
        icon: Ship,
        description: "Nhập khẩu sản phẩm gỗ",
        type: "import_company",
    },
    {
        name: "Công ty xuất khẩu",
        icon: Plane,
        description: "Xuất khẩu sản phẩm gỗ",
        type: "export_company",
    },
];

export const individualRoles: Role[] = [
    {
        name: "Chủ rừng",
        icon: Trees,
        description: "Quản lý và sở hữu tài nguyên rừng",
        type: "forest_owner",
    },
    {
        name: "Thương nhân/Khai thác",
        icon: Truck,
        description: "Khai thác và buôn bán gỗ",
        type: "trader_harvester",
    },
    {
        name: "Xưởng cưa/Sơ chế",
        icon: Factory,
        description: "Chế biến gỗ nguyên liệu",
        type: "sawmill_primary_processor",
    },
];
