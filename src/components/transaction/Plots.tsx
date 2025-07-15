import { PlusIcon } from "lucide-react";
import React from "react";

const Plots = () => {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700">III. Thông tin lô rừng</h2>
            <div className="cursor-pointer flex flex-col items-center justify-center p-10 border border-dashed rounded-md bg-gray-50 text-gray-500 text-center">
                <PlusIcon className="stroke-blue-500" />
                <p className="mt-2 text-blue-500">Chọn lô rừng từ danh sách </p>
            </div>
        </section>
    );
};

export default Plots;
