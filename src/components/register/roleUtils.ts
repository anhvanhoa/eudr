import { Trees, Truck, Factory, Package, Ship, Plane } from "lucide-react";

export interface Role {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>; // React component for the icon
    description: string;
    type: string; //type of name
}

export const businessRoles: Role[] = [
    {
        name: "Forest Owner",
        icon: Trees,
        description: "Manage and own forest resources",
        type: "forest_owner",
    },
    {
        name: "Trader/Harvester",
        icon: Truck,
        description: "Harvest and trade timber",
        type: "trader_harvester",
    },
    {
        name: "Sawmill/Primary Processor",
        icon: Factory,
        description: "Process raw timber",
        type: "sawmill_primary_processor",
    },
    {
        name: "Processing Company",
        icon: Package,
        description: "Advanced wood processing",
        type: "processing_company",
    },
    {
        name: "Import Company",
        icon: Ship,
        description: "Import timber products",
        type: "import_company",
    },
    {
        name: "Export Company",
        icon: Plane,
        description: "Export timber products",
        type: "export_company",
    },
];

export const individualRoles: Role[] = [
    {
        name: "Forest Owner",
        icon: Trees,
        description: "Manage and own forest resources",
        type: "forest_owner",
    },
    {
        name: "Trader/Harvester",
        icon: Truck,
        description: "Harvest and trade timber",
        type: "trader_harvester",
    },
    {
        name: "Sawmill/Primary Processor",
        icon: Factory,
        description: "Process raw timber",
        type: "sawmill_primary_processor",
    },
];
