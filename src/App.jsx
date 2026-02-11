import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LabelList
} from 'recharts';
import {
    LayoutDashboard,
    Filter,
    TrendingUp,
    FileText,
    RotateCcw,
    PieChart as PieIcon,
    UserCheck,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Activity
} from 'lucide-react';

// ข้อมูลเริ่มต้น
const initialData = [
    { id: 1, item: "ค่าเช่าสายสื่อสารอินเตอร์เน็ตสาย 1", budget: 243960, vendor: "3BB", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "อนุรัตน์" },
    { id: 2, item: "AI เพื่อสนับสนุนการปฏิบัติงานของบุคลากร", budget: 445800, vendor: "APP", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "ศิวพล" },
    { id: 3, item: "แอปพลิเคชัน EMS laws", budget: 2834900, vendor: "APP", method: "เปิด Bid", status: "อยู่ในกระบวนการจัดซื้อจัดจ้าง", manager: "อนุรัตน์" },
    { id: 4, item: "รถบัญชาการเหตุการณ์ทางด้านการแพทย์ฉุกเฉิน", budget: 25000000, vendor: "APP", method: "เปิด Bid", status: "ตั้งคณะกรรมการ", manager: "ศิวพล" },
    { id: 5, item: "ระบบสารสนเทศประเมินความปลอดภัยสถานประกอบการ", budget: 786000, vendor: "APP", method: "เปิด Bid", status: "สำรวจ Requirement", manager: "อนุรัตน์" },
    { id: 6, item: "พัฒนาระบบศูนย์ช่วยเหลือนักท่องเที่ยวเจ็บป่วยฉุกเฉิน", budget: 3640000, vendor: "APP", method: "เปิด Bid", status: "สำรวจ Requirement", manager: "ศิวพล" },
    { id: 7, item: "พัฒนาระบบข้อมูลการแพทย์ฉุกเฉินสนับสนุนกีฬา", budget: 2734000, vendor: "APP", method: "เปิด Bid", status: "อยู่ระหว่างร่าง TOR", manager: "อนุรัตน์" },
    { id: 8, item: "ระบบห้องประชุม", budget: 3000000, vendor: "APP", method: "เปิด Bid", status: "ตั้งคณะกรรมการ", manager: "ศิวพล" },
    { id: 9, item: "บำรุงรักษาเว็บไซต์ สพฉ.+วิจัย", budget: 500000, vendor: "ARIP", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "อนุรัตน์" },
    { id: 10, item: "ระบบโครงสร้างพื้นฐานคลาวด์", budget: 7933000, vendor: "INET", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "ศิวพล" },
    { id: 11, item: "แพลตฟอร์ม Education Platform", budget: 8991400, vendor: "INET", method: "เปิด Bid", status: "อยู่ระหว่างร่าง TOR", manager: "อนุรัตน์" },
    { id: 12, item: "บำรุงรักษาระบบโทรศัพท์ UCEP Call center", budget: 261707, vendor: "INET", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "ศิวพล" },
    { id: 13, item: "ค่าลิขสิทธิ์ SSL", budget: 40000, vendor: "INET", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "อนุรัตน์" },
    { id: 14, item: "บำรุงรักษาเครื่องแม่ข่ายและเครือข่าย", budget: 459000, vendor: "-TREE", method: "เจาะจง", status: "พิจารณาผล", manager: "ศิวพล" },
    { id: 15, item: "ค่าบริการบริหารจัดการระบบเบอร์ 1669", budget: 1600000, vendor: "NT", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "อนุรัตน์" },
    { id: 16, item: "ระบบบริหารจัดการ ERP", budget: 14720500, vendor: "Phoenix ERP", method: "เปิด Bid", status: "อยู่ระหว่างร่าง TOR", manager: "ศิวพล" },
    { id: 17, item: "บำรุงรักษาระบบศูนย์คอมพิวเตอร์ Data center", budget: 860000, vendor: "SITEM", method: "เปิด Bid", status: "อยู่ในกระบวนการประกาศ", manager: "อนุรัตน์" },
    { id: 18, item: "ค่าเช่าสายสื่อสารอินเตอร์เน็ตสาย 2", budget: 243960, vendor: "STA", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "ศิวพล" },
    { id: 19, item: "ค่าเช่าโปรแกรม MS Team/Zoom", budget: 82863, vendor: "STA", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "อนุรัตน์" },
    { id: 20, item: "ค่าเช่าโปรแกรมสนับสนุนการดำเนินงาน", budget: 200000, vendor: "STA", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "ศิวพล" },
    { id: 21, item: "บำรุงรักษาตู้สาขาโทรศัพท์ภายใน", budget: 99510, vendor: "The Various Innovation", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "อนุรัตน์" },
    { id: 22, item: "แผนครุภัณฑ์คอมพิวเตอร์และอุปกรณ์ ICT", budget: 643000, vendor: "World infinity", method: "เปิด Bid", status: "พิจารณาผล", manager: "ศิวพล" },
    { id: 23, item: "ค่าเช่า Adobe Creative Cloud / Acrobat", budget: 200000, vendor: "World infinity", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "อนุรัตน์" },
    { id: 24, item: "เช่าใช้ระบบป้องกันไวรัสและ Server", budget: 500000, vendor: "Zenith Comp", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "ศิวพล" },
    { id: 25, item: "ความปลอดภัยระบบเครือข่าย (Firewall)", budget: 700000, vendor: "Zenith Comp", method: "เปิด Bid", status: "อยู่ในกระบวนการประกาศ", manager: "อนุรัตน์" },
    { id: 26, item: "ต่อลิขสิทธิ์ IOS Enterprise", budget: 20000, vendor: "ยกเลิก", method: "เจาะจง", status: "ยกเลิก", manager: "ศิวพล" },
    { id: 27, item: "ความปลอดภัยตามมาตรฐาน ISO 27001", budget: 1500000, vendor: "ยังไม่ทราบผู้รับจ้าง", method: "เปิด Bid", status: "พิจารณาผล", manager: "อนุรัตน์" },
    { id: 28, item: "บำรุงรักษาระบบสารสนเทศ สพฉ.", budget: 500000, vendor: "ยังไม่ทราบผู้รับจ้าง", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "ศิวพล" },
    { id: 29, item: "ค่าธรรมเนียมวิทยุและบำรุงรักษารถสื่อสาร", budget: 315000, vendor: "ยังไม่ทราบผู้รับจ้าง", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "อนุรัตน์" },
    { id: 30, item: "จ้างเหมาเจ้าหน้าที่เทคนิคระบบสื่อสาร", budget: 240000, vendor: "รออนุมัติ", method: "เจาะจง", status: "อยู่ระหว่างร่าง TOR", manager: "ศิวพล" },
    { id: 31, item: "จ้างเหมาบริการ National EMS Digital Platform", budget: 432000, vendor: "สตท.", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "อนุรัตน์" },
    { id: 32, item: "จ้างผู้ดูแลระบบ IT Help desk", budget: 288000, vendor: "สตท.", method: "เจาะจง", status: "เปิดใช้งานระบบ", manager: "ศิวพล" },
    { id: 33, item: "พัฒนา AI สนับสนุนผู้ป่วยฉุกเฉิน", budget: 7601900, vendor: "สวทช.", method: "เจาะจง", status: "อยู่ในกระบวนการจัดซื้อจัดจ้าง", manager: "อนุรัตน์" },
    { id: 34, item: "ระบบ EMS Portal และ Dashboard", budget: 2468000, vendor: "สวทช.", method: "เจาะจง", status: "อยู่ในกระบวนการจัดซื้อจัดจ้าง", manager: "ศิวพล" },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#71717a', '#f97316', '#14b8a6'];

const allPossibleStatuses = [
    "อยู่ระหว่างร่าง TOR",
    "ตั้งคณะกรรมการ",
    "อยู่ในกระบวนการประกาศ",
    "อยู่ในกระบวนการจัดซื้อจัดจ้าง",
    "พิจารณาผล",
    "สำรวจ Requirement",
    "อยู่ระหว่างการพัฒนา",
    "อยู่ระหว่างการทดสอบระบบ UAT",
    "เปิดใช้งานระบบ",
    "ยกเลิก"
];

const managerOptions = ["ไม่ระบุ", "อนุรัตน์", "ศิวพล"];

const calculateProgress = (status) => {
    switch (status) {
        case "อยู่ระหว่างร่าง TOR": return 20;
        case "ตั้งคณะกรรมการ": return 30;
        case "อยู่ในกระบวนการประกาศ": return 40;
        case "อยู่ในกระบวนการจัดซื้อจัดจ้าง": return 50;
        case "พิจารณาผล": return 60;
        case "สำรวจ Requirement": return 70;
        case "อยู่ระหว่างการพัฒนา": return 80;
        case "อยู่ระหว่างการทดสอบระบบ UAT": return 90;
        case "เปิดใช้งานระบบ": return 100;
        default: return 0;
    }
};

const App = () => {
    const [projectsData, setProjectsData] = useState(initialData);
    const [filterProject, setFilterProject] = useState('All');
    const [filterVendor, setFilterVendor] = useState('All');
    const [filterMethod, setFilterMethod] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'budget', direction: null });

    const options = useMemo(() => ({
        projects: ['All', ...new Set(initialData.map(p => p.item))].sort(),
        vendors: ['All', ...new Set(initialData.map(p => p.vendor))].sort(),
        methods: ['All', ...new Set(initialData.map(p => p.method))],
        statuses: ['All', ...allPossibleStatuses]
    }), []);

    const updateProjectField = (id, field, value) => {
        setProjectsData(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        } else if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = null;
        }
        setSortConfig({ key, direction });
    };

    const filteredProjects = useMemo(() => {
        let result = projectsData.filter(p => {
            const matchProject = filterProject === 'All' || p.item === filterProject;
            const matchVendor = filterVendor === 'All' || p.vendor === filterVendor;
            const matchMethod = filterMethod === 'All' || p.method === filterMethod;
            const matchStatus = filterStatus === 'All' || p.status === filterStatus;
            return matchProject && matchVendor && matchMethod && matchStatus;
        });

        if (sortConfig.direction) {
            result = [...result].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [projectsData, filterProject, filterVendor, filterMethod, filterStatus, sortConfig]);

    const filteredBudget = useMemo(() =>
        filteredProjects.reduce((acc, curr) => acc + curr.budget, 0)
        , [filteredProjects]);

    const budgetByVendor = useMemo(() => {
        const map = {};
        projectsData.forEach(item => {
            if (item.vendor === 'ยกเลิก') return;
            map[item.vendor] = (map[item.vendor] || 0) + item.budget;
        });
        return Object.entries(map)
            .map(([name, budget]) => ({ name, budget }))
            .sort((a, b) => b.budget - a.budget)
            .slice(0, 8);
    }, [projectsData]);

    const statusDistribution = useMemo(() => {
        const map = {};
        filteredProjects.forEach(item => {
            map[item.status] = (map[item.status] || 0) + 1;
        });
        const total = filteredProjects.length;
        return Object.entries(map).map(([name, value]) => ({
            name, value,
            percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0
        }));
    }, [filteredProjects]);

    const resetFilters = () => {
        setFilterProject('All');
        setFilterVendor('All');
        setFilterMethod('All');
        setFilterStatus('All');
        setSortConfig({ key: 'budget', direction: null });
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 25;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="10" fontWeight="bold">
                {`${name} (${(percent * 100).toFixed(1)}%)`}
            </text>
        );
    };

    const getSortIcon = () => {
        if (sortConfig.direction === 'asc') return <ArrowUp size={14} className="text-blue-600" />;
        if (sortConfig.direction === 'desc') return <ArrowDown size={14} className="text-blue-600" />;
        return <ArrowUpDown size={14} className="text-slate-300 opacity-50" />;
    };

    const getStatusClasses = (status) => {
        if (status === 'เปิดใช้งานระบบ') return 'bg-emerald-500 text-white';
        if (status === 'ยกเลิก') return 'bg-rose-500 text-white';
        if (status === 'อยู่ระหว่างร่าง TOR') return 'bg-amber-400 text-white';
        return 'bg-blue-500 text-white';
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">

            {/* ── ครึ่งหน้าบน ── */}
            <div className="p-6 md:p-8 space-y-6 border-b border-slate-200 bg-white">
                <div className="max-w-full flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <LayoutDashboard className="text-blue-600" /> ระบบติดตามการจัดจ้าง ปี 2569
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)</p>
                    </div>

                    <div className="bg-blue-600 p-4 rounded-2xl shadow-lg text-white min-w-[300px]">
                        <p className="text-sm font-medium opacity-80">งบประมาณปี 2569 งบประมาณตามตัวกรองปัจจุบัน</p>
                        <h2 className="text-3xl font-bold mt-1">฿{filteredBudget.toLocaleString()}</h2>
                    </div>
                </div>

                {/* ── Filters ── */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 font-bold text-slate-700">
                            <Filter size={18} className="text-blue-500" /> ตัวกรองข้อมูลโครงการ
                        </div>
                        <button onClick={resetFilters} className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer">
                            <RotateCcw size={14} /> ล้างการกรองทั้งหมด
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 px-1">เลือกโครงการ</label>
                            <select value={filterProject} onChange={(e) => setFilterProject(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm shadow-sm outline-none">
                                {options.projects.map(p => <option key={p} value={p}>{p === 'All' ? 'โครงการทั้งหมด' : p}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 px-1">ผู้รับจ้าง</label>
                            <select value={filterVendor} onChange={(e) => setFilterVendor(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm shadow-sm outline-none">
                                {options.vendors.map(v => <option key={v} value={v}>{v === 'All' ? 'ผู้รับจ้างทั้งหมด' : v}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 px-1">วิธีการจ้าง</label>
                            <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm shadow-sm outline-none">
                                {options.methods.map(m => <option key={m} value={m}>{m === 'All' ? 'วิธีการทั้งหมด' : m}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-400 px-1">สถานะโครงการ</label>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm shadow-sm outline-none">
                                {options.statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'สถานะทั้งหมด' : s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Charts ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-500" /> งบประมาณแยกตามผู้รับจ้าง
                        </h4>
                        <div className="h-[250px] bg-slate-50/50 p-2 rounded-xl border border-dashed border-slate-200">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={budgetByVendor} layout="vertical" margin={{ right: 60, left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                    <Tooltip formatter={(val) => `฿${val.toLocaleString()}`} />
                                    <Bar dataKey="budget" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={18}>
                                        <LabelList dataKey="budget" position="right" formatter={(val) => `฿${(val / 1000000).toFixed(1)}M`} style={{ fontSize: '10px', fill: '#475569', fontWeight: 'bold' }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <PieIcon size={18} className="text-emerald-500" /> สัดส่วนสถานะโครงการ
                        </h4>
                        <div className="h-[250px] bg-slate-50/50 p-2 rounded-xl border border-dashed border-slate-200">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={statusDistribution} cx="50%" cy="50%" labelLine={true} label={renderCustomizedLabel} outerRadius={70} innerRadius={35} fill="#8884d8" dataKey="value" paddingAngle={5}>
                                        {statusDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── ครึ่งหน้าล่าง: ตาราง ── */}
            <div className="p-6 md:p-8 flex-grow">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            <FileText size={20} className="text-slate-400" /> รายการโครงการตามเงื่อนไข
                        </h4>
                        <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500 shadow-sm">
                            โครงการตามตัวกรอง: {filteredProjects.length} รายการ
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">ชื่อโครงการ</th>
                                    <th className="px-6 py-4">ผู้รับจ้าง / วิธีจ้าง</th>
                                    <th className="px-6 py-4 text-right cursor-pointer hover:bg-slate-100 transition-colors select-none" onClick={() => handleSort('budget')}>
                                        <div className="flex items-center justify-end gap-1">
                                            งบประมาณ {getSortIcon()}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-center">สถานะ</th>
                                    <th className="px-6 py-4 text-center">ความคืบหน้า</th>
                                    <th className="px-6 py-4 text-center">ผู้ดูแลโครงการ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filteredProjects.map((project) => {
                                    const progress = calculateProgress(project.status);
                                    return (
                                        <tr key={project.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{project.item}</div>
                                                <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">ID: #{project.id.toString().padStart(4, '0')}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-700 font-medium">{project.vendor}</div>
                                                <div className="text-[10px] text-slate-400 uppercase">{project.method}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono font-bold text-slate-600">
                                                ฿{project.budget.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-center min-w-[160px]">
                                                <select
                                                    value={project.status}
                                                    onChange={(e) => updateProjectField(project.id, 'status', e.target.value)}
                                                    className={`w-full text-[10px] font-bold py-1.5 px-3 rounded-lg border-none focus:ring-2 focus:ring-blue-300 outline-none cursor-pointer appearance-none text-center shadow-sm transition-all ${getStatusClasses(project.status)}`}
                                                >
                                                    {options.statuses.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-center min-w-[140px]">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                                                        <Activity size={10} className="text-blue-500" /> {progress}%
                                                    </div>
                                                    <div className="w-full max-w-[100px] h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                                        <div className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center min-w-[150px]">
                                                <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5">
                                                    <UserCheck size={14} className="text-slate-400" />
                                                    <select
                                                        value={project.manager || "ไม่ระบุ"}
                                                        onChange={(e) => updateProjectField(project.id, 'manager', e.target.value)}
                                                        className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer"
                                                    >
                                                        {managerOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {filteredProjects.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                                <FileText size={64} className="opacity-20 mb-4" />
                                <p className="text-lg font-medium">ไม่พบข้อมูลโครงการตามตัวกรองที่ระบุ</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
