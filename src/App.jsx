import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Linkedin, Link as LinkIcon, 
  Plus, Trash2, ChevronDown, ChevronUp, Printer, 
  Download, Github, Globe, Briefcase, Award, 
  BookOpen, Heart, User, PenTool, Layout, FileJson,
  Upload, FileBadge, Loader2, Image as ImageIcon,
  ScanLine, FileInput, Settings, Maximize, Minimize,
  Building 
} from 'lucide-react';

// --- 初始數據 ---
const initialData = {
  basics: {
    name: "洪葦楷",
    headline: "通信工程與AI技術方向教師",
    email: "hwk@bupt.edu.cn",
    phone: "85363435733",
    location: "澳門",
    url: { label: "LinkedIn", href: "" },
    customFields: [
      { id: "1", icon: "briefcase", name: "", value: "在讀研究生" },
      { id: "2", icon: "gender", name: "", value: "男" },
      { id: "3", icon: "link", name: "", value: "https://www.rickeykai.space/" }
    ],
    picture: {
      url: "https://oss.upcv.tech/resume/avatar/cmk3dfhhx0bf4la2bw3ms7tmm/z1vmetvxl59ivc075aoyphzw.jpg?t=1768382515749",
      width: 100, // 默認寬度 px
      ratio: "square" // "square" | "original"
    }
  },
  sections: {
    summary: {
      name: "個人總結",
      content: "<p>聖若瑟教區中學第五校校友，北京郵電大學信息與通信工程碩士。具備紮實的資訊科技背景，專精於 Python、AI 人工智能及具身智能應用。 在學期間積累豐富的助教與科研指導經驗，擅長將艱深的理工知識轉化為生動的 STEAM 教學內容。熟悉澳門學制與校園文化，熱衷於引導學生參與科創比賽（如全國青少年人工智能創新挑戰賽），致力於培養學生的數碼素養與創新思維。</p>",
      visible: true,
      breakBefore: false
    },
    education: {
      name: "教育經歷",
      visible: true,
      breakBefore: false,
      items: [
        {
          id: "edu1",
          institution: "北京郵電大學",
          studyType: "碩士",
          area: "信息與通信工程",
          date: "2023-09 - 2026-06",
          summary: "<ul><li><p>主修課程：高速寬帶互聯網技術、信息搜索與人工智能。</p></li><li><p>教學實踐：擔任研究生課程助教，負責實驗課程設計與作業批改，積累了將複雜技術概念簡化教學的經驗。</p></li><li><p>科研指導： 帶領 5 名研究生進行硬件系統開發，具備良好的團隊指導與技術培訓能力。</p></li></ul>"
        },
        {
          id: "edu2",
          institution: "北京郵電大學",
          studyType: "本科",
          area: "信息與通信工程",
          date: "2019-09 - 2023-07",
          summary: "<ul><li><p>主修課程：通信原理、信號與系統、無線物聯網基礎與應用、數據結構與算法導論</p></li></ul>"
        },
        {
          id: "edu3",
          institution: "澳門聖若瑟教區中學第五校",
          studyType: "中學",
          area: "",
          date: "2006-2019",
          summary: "<p>於本校度過完整的中小學階段。熟悉學校辦學理念、校園環境及學生特質，立志回饋母校，傳承育人精神。</p>"
        }
      ]
    },
    internship: {
      name: "實習經歷",
      visible: true,
      breakBefore: false,
      items: [
        {
          id: "int1",
          company: "某某科技有限公司",
          position: "AI 算法實習生",
          date: "2023-06 - 2023-09",
          summary: "<ul><li><p>負責協助開發自然語言處理模型，優化了數據預處理流程。</p></li><li><p>參與團隊代碼審查，提升了代碼質量與規範性。</p></li></ul>"
        }
      ]
    },
    projects: {
      name: "項目經歷",
      visible: true,
      breakBefore: false,
      items: [
        {
          id: "proj1",
          name: "科研項目",
          date: "2023-2026",
          summary: "<ul><li><p>國家自然科學基金面上項目：62371058 - 視覺機器學習的水下無線光通信系統信道智能感知與自適應協同方法研究</p></li><li><p>北京自然科學聯合基金前沿項目 ：基於學習增強型視覺方法的大氣無線光信道智能感知與預測機制研究</p></li></ul><p><strong>學術成果</strong></p><ul><li><p>SCI論文1篇：Selective Reconstruction and Gated Fusion for Robust UWOC Receiver Detection，建立了水下無線光通信高精度預測模型，三作</p></li><li><p>將研究成果轉化為教學實踐，輔助設計2個相關實驗課程，覆蓋《光通信系統》及《現代通信技術》等課程，參與了中國大學MOOC上的線上課程</p></li></ul>"
        }
      ]
    },
    volunteer: {
      name: "社團與組織經歷",
      visible: true,
      breakBefore: false,
      items: [
        {
          id: "vol1",
          organization: "北京（高校）澳門學生聯合會",
          position: "宣傳部、資訊部及北京澳生雜誌工作",
          date: "2019-10 - 2023-12",
          summary: "<ul><li><p>活動統籌與執行： 參與策劃多場大型學生活動，負責視覺設計與宣傳推廣，具備跨部門溝通協調能力。</p></li><li><p>新媒體運營： 主導宣傳視頻的腳本編寫與後期製作，能帶領學生進行校園多媒體創作。</p></li><li><p>校園媒體製作： 統籌《北京澳生雜誌》排版與設計，熟練運用 Photoshop, InDesign 製作宣傳海報及刊物。此技能可應用於學校校刊製作、活動海報設計及校園文化建設。</p></li></ul>"
        },
        {
          id: "vol2",
          organization: "學校學生會、團委、陽光志協",
          position: "部員",
          date: "2019-2022",
          summary: "<ul><li><p>擔任宣傳部部員期間，負責設計製作宣傳物料</p></li><li><p>積極組織公益活動，累計服務時長超過 80 小時，具備耐心與服務精神。</p></li></ul>"
        }
      ]
    },
    awards: {
      name: "榮譽獎項",
      visible: true,
      breakBefore: false,
      items: [
        {
          id: "aw1",
          title: "北京郵電大學港澳台獎學金",
          awarder: "北京郵電大學",
          date: "2019-2025",
          summary: "<p>連續本科四年獲得校級一、二等獎學金，體現卓越學業表現與學習能力。</p>"
        },
        {
          id: "aw2",
          title: "研究生學業獎學金",
          awarder: "北京郵電大學",
          date: "2023-2026",
          summary: "<p>連續取得一、二等學業獎學金，體現卓越學業表現與學習能力。</p>"
        }
      ]
    },
    certifications: {
      name: "證書",
      visible: true,
      breakBefore: false,
      items: [
        {
          id: "cert1",
          name: "Java培訓證書",
          issuer: "澳門澳門生產力暨科技轉移中心",
          date: "2019",
          summary: "<ul><li><p>精通Java语言核心语法及面向对象编程思想，熟练运用多线程、集合框架、IO/NIO等特性進行高效開發</p></li><li><p>熟悉Spring Boot、Spring Cloud等主流框架</p></li></ul>"
        },
        {
          id: "cert2",
          name: "大學英語四級證書",
          issuer: "教育部考試中心",
          date: "2020",
          summary: "<p>具備良好的英語閱讀、寫作和聽力能力。</p>"
        }
      ]
    },
    skills: {
      name: "技能",
      visible: true,
      breakBefore: false,
      items: [
        { id: "sk1", name: "Office", keywords: ["PPT演示", "word文檔", "Excel數據"] },
        { id: "sk2", name: "Matlab", keywords: ["工程仿真", "數學建模"] },
        { id: "sk3", name: "Python", keywords: ["數據分析", "腳本"] },
        { id: "sk4", name: "Java", keywords: ["後端技術開發"] },
        { id: "sk5", name: "AI", keywords: ["AI編程", "大模型應用"] }
      ]
    },
    languages: {
      name: "語言",
      visible: true,
      breakBefore: false,
      items: [
        { id: "lang1", name: "廣東話", description: "流利" },
        { id: "lang2", name: "普通話", description: "流利" },
        { id: "lang3", name: "英文", description: "良好" }
      ]
    }
  }
};

// --- 工具函數 ---
const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// 簡單的 HTML 渲染組件
const HtmlContent = ({ content, className }) => {
  return (
    <div 
      className={`prose prose-sm max-w-none text-gray-600 ${className} [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-1 [&>ul]:mb-2`}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};

// --- 編輯器組件 ---

const TextField = ({ label, value, onChange, placeholder, multiline = false }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    {multiline ? (
      <textarea
        className="w-full p-2 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[100px]"
        value={value || ''} // 防止 value 為 undefined
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input
        type="text"
        className="w-full p-2 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        value={value || ''} // 防止 value 為 undefined
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

// Accordion 組件
const Accordion = ({ title, isOpen, onToggle, children, icon: Icon, showBreakOption, breakBefore, onToggleBreak }) => (
  <div className="border-b border-gray-100">
    <div className="flex items-center justify-between bg-white hover:bg-gray-50 transition-colors pr-4">
      <button
        onClick={onToggle}
        className="flex-1 flex items-center gap-3 p-4 text-left"
      >
        {Icon && <Icon size={18} className="text-blue-600" />}
        <span className="font-semibold text-gray-700">{title}</span>
      </button>
      
      <div className="flex items-center gap-2">
        {showBreakOption && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBreak();
            }}
            title={breakBefore ? "取消強制換頁" : "此章節強制換頁 (從新頁面開始)"}
            className={`p-1.5 rounded transition-colors ${breakBefore ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-200'}`}
          >
            <ScanLine size={16} />
          </button>
        )}
        <button onClick={onToggle} className="text-gray-400">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
    {isOpen && <div className="p-4 bg-gray-50 border-t border-gray-100">{children}</div>}
  </div>
);

// 新增：視覺化分頁分隔符
const PageBreakIndicator = () => (
  <div className="w-full flex items-center gap-3 my-3 print:hidden">
    <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
    <span className="text-[10px] text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-200 bg-blue-50 whitespace-nowrap">
      ✂ 強制換頁
    </span>
    <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
  </div>
);

// --- 主應用 ---
export default function App() {
  const [resume, setResume] = useState(initialData);
  const [openSection, setOpenSection] = useState('basics');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPageGuides, setShowPageGuides] = useState(false);
  const fileInputRef = useRef(null);
  const resumeRef = useRef(null);

  // 更新基本信息
  const updateBasics = (field, value) => {
    setResume(prev => ({
      ...prev,
      basics: { ...prev.basics, [field]: value }
    }));
  };

  // 更新圖片設定
  const updatePictureSettings = (key, value) => {
    setResume(prev => ({
      ...prev,
      basics: { 
        ...prev.basics, 
        picture: { ...prev.basics.picture, [key]: value } 
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResume(prev => ({
          ...prev,
          basics: {
            ...prev.basics,
            picture: { ...prev.basics.picture, url: reader.result }
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCustomField = (index, value) => {
    const newFields = [...resume.basics.customFields];
    newFields[index].value = value;
    setResume(prev => ({
      ...prev,
      basics: { ...prev.basics, customFields: newFields }
    }));
  };

  const updateSectionContent = (sectionKey, value) => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: { ...prev.sections[sectionKey], content: value }
      }
    }));
  };

  const updateItem = (sectionKey, itemId, field, value) => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          items: prev.sections[sectionKey].items.map(item => 
            item.id === itemId ? { ...item, [field]: value } : item
          )
        }
      }
    }));
  };

  const toggleSectionBreak = (sectionKey) => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: { 
          ...prev.sections[sectionKey], 
          breakBefore: !prev.sections[sectionKey].breakBefore 
        }
      }
    }));
  };

  const addItem = (sectionKey) => {
    const newItem = { id: Date.now().toString(), name: "新項目", title: "新職位", summary: "" };
    
    if (sectionKey === 'certifications') {
        newItem.name = "新證書";
        newItem.issuer = "頒發機構";
    } else if (sectionKey === 'internship') {
        newItem.company = "新公司";
        newItem.position = "實習職位";
    }

    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          items: [newItem, ...prev.sections[sectionKey].items]
        }
      }
    }));
  };

  const removeItem = (sectionKey, itemId) => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          items: prev.sections[sectionKey].items.filter(item => item.id !== itemId)
        }
      }
    }));
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = resumeRef.current;
    
    // 導出時暫時關閉分頁線
    const guidesVisible = showPageGuides;
    if (guidesVisible) setShowPageGuides(false);

    // 等待渲染更新
    await new Promise(r => setTimeout(r, 200));

    const opt = {
      margin: 0,
      filename: `${resume.basics.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    try {
      if (!window.html2pdf) {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
      }
      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("PDF 下載失敗，請嘗試移除外部圖片或使用本地上傳的圖片。\n(備用方案：正在打開打印窗口...)");
      window.print();
    } finally {
      setIsDownloading(false);
      if (guidesVisible) setShowPageGuides(true);
    }
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resume.basics.name || "resume"}_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.basics) {
          // --- 智慧合併邏輯 (Smart Merge) ---
          // 確保導入的數據包含新版程式所需的結構，如 internship, breakBefore 等
          const mergedResume = {
            ...initialData,
            ...json,
            basics: { ...initialData.basics, ...json.basics },
            sections: { ...initialData.sections, ...json.sections } 
          };

          // 為每個區塊補全可能缺失的屬性
          Object.keys(initialData.sections).forEach(key => {
             if (!mergedResume.sections[key]) {
                 // 如果該區塊在導入的檔案中完全不存在（例如舊檔案沒有 internship），直接使用預設值
                 mergedResume.sections[key] = initialData.sections[key];
             } else {
                 // 如果存在，確保 items 和 breakBefore 等關鍵屬性存在
                 if(!mergedResume.sections[key].items) mergedResume.sections[key].items = [];
                 if(mergedResume.sections[key].visible === undefined) mergedResume.sections[key].visible = true;
                 if(mergedResume.sections[key].breakBefore === undefined) mergedResume.sections[key].breakBefore = false;
             }
          });

          // 圖片設定相容性檢查
          if (mergedResume.basics.picture && !mergedResume.basics.picture.width) {
             mergedResume.basics.picture.width = 100;
             mergedResume.basics.picture.ratio = 'square';
          }

          setResume(mergedResume);
          event.target.value = '';
        } else {
          alert("無效的簡歷 JSON 格式");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("無法讀取檔案，請確認格式是否正確");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".json"
      />

      {/* --- 左側編輯器 --- */}
      <div className="w-1/3 min-w-[350px] bg-white border-r border-gray-200 flex flex-col h-full z-10 print:hidden shadow-lg">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <PenTool size={20} className="text-blue-600" />
            簡歷編輯
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handleImportClick}
              className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 text-sm font-medium transition-colors border border-gray-200"
              title="導入 JSON 數據"
            >
              <Upload size={16} />
            </button>
             <button 
              onClick={handleExportJson}
              className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 text-sm font-medium transition-colors border border-gray-200"
              title="導出 JSON 數據"
            >
              <FileJson size={16} />
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className={`flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm font-medium transition-colors ${isDownloading ? 'opacity-70 cursor-wait' : ''}`}
              title="下載 PDF 文件"
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />}
              {isDownloading ? '生成中...' : '導出'}
            </button>
          </div>
        </div>
        
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">預覽設置</span>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={showPageGuides}
                onChange={(e) => setShowPageGuides(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              顯示 A4 分頁線
            </label>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* 基本信息 */}
          <Accordion 
            title="基本資料" 
            icon={User}
            isOpen={openSection === 'basics'} 
            onToggle={() => setOpenSection(openSection === 'basics' ? null : 'basics')}
          >
            <TextField label="姓名" value={resume.basics.name} onChange={(v) => updateBasics('name', v)} />
            <TextField label="頭銜" value={resume.basics.headline} onChange={(v) => updateBasics('headline', v)} />
            
            {/* 頭像上傳與設定 */}
            <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-200">
              <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                <ImageIcon size={14} /> 頭像設置
              </label>
              
              <div className="flex gap-3 mb-3">
                <div className="shrink-0">
                  {resume.basics.picture.url ? (
                    <img 
                      src={resume.basics.picture.url} 
                      alt="Preview" 
                      className="w-16 h-16 rounded object-cover border border-gray-200 bg-white" 
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Avatar'; }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400">
                      <User size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="cursor-pointer text-center bg-white hover:bg-gray-50 text-gray-700 text-xs py-1.5 px-3 rounded border border-gray-300 transition-colors flex items-center justify-center gap-1">
                    <Upload size={12} /> 上傳/更換圖片
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-1.5 text-xs border border-gray-300 rounded bg-white"
                    placeholder="或輸入圖片 URL"
                    value={resume.basics.picture.url || ''}
                    onChange={(e) => setResume(prev => ({ ...prev, basics: { ...prev.basics, picture: { ...prev.basics.picture, url: e.target.value } } }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <label className="block text-[10px] text-gray-500 mb-1 flex justify-between">
                    大小: {resume.basics.picture.width || 100}px
                  </label>
                  <input 
                    type="range" 
                    min="60" 
                    max="180" 
                    step="5"
                    value={resume.basics.picture.width || 100}
                    onChange={(e) => updatePictureSettings('width', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div>
                   <label className="block text-[10px] text-gray-500 mb-1">顯示比例</label>
                   <div className="flex rounded bg-white border border-gray-300 overflow-hidden">
                     <button 
                        onClick={() => updatePictureSettings('ratio', 'square')}
                        className={`flex-1 py-1 text-[10px] flex justify-center items-center ${resume.basics.picture.ratio !== 'original' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                     >
                       <Minimize size={10} className="mr-1"/> 正方形
                     </button>
                     <div className="w-[1px] bg-gray-300"></div>
                     <button 
                        onClick={() => updatePictureSettings('ratio', 'original')}
                        className={`flex-1 py-1 text-[10px] flex justify-center items-center ${resume.basics.picture.ratio === 'original' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                     >
                       <Maximize size={10} className="mr-1"/> 原圖
                     </button>
                   </div>
                </div>
              </div>
            </div>

            <TextField label="郵箱" value={resume.basics.email} onChange={(v) => updateBasics('email', v)} />
            <TextField label="電話" value={resume.basics.phone} onChange={(v) => updateBasics('phone', v)} />
            <TextField label="地點" value={resume.basics.location} onChange={(v) => updateBasics('location', v)} />
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">自定義欄位</p>
              {resume.basics.customFields.map((field, idx) => (
                <TextField 
                  key={field.id}
                  label={field.id === "1" ? "目前狀態" : field.id === "2" ? "性別" : "個人網站"}
                  value={field.value} 
                  onChange={(v) => updateCustomField(idx, v)} 
                />
              ))}
            </div>
          </Accordion>

          {/* 個人總結 (支持換頁) */}
          <Accordion 
            title="個人總結" 
            icon={Layout}
            isOpen={openSection === 'summary'} 
            onToggle={() => setOpenSection(openSection === 'summary' ? null : 'summary')}
            showBreakOption={true}
            breakBefore={resume.sections.summary?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('summary')}
          >
            <TextField 
              multiline 
              label="內容 (支持 HTML 標籤)" 
              value={resume.sections.summary?.content} 
              onChange={(v) => updateSectionContent('summary', v)} 
            />
          </Accordion>

          {/* 教育經歷 (支持換頁) */}
          <Accordion 
            title="教育經歷" 
            icon={BookOpen}
            isOpen={openSection === 'education'} 
            onToggle={() => setOpenSection(openSection === 'education' ? null : 'education')}
            showBreakOption={true}
            breakBefore={resume.sections.education?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('education')}
          >
             <button onClick={() => addItem('education')} className="w-full py-2 mb-3 border-2 border-dashed border-blue-200 text-blue-600 rounded hover:bg-blue-50 flex justify-center items-center gap-2 text-sm font-medium">
               <Plus size={16} /> 添加學歷
            </button>
            {resume.sections.education?.items?.map(item => (
              <div key={item.id} className="mb-6 p-3 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button onClick={() => removeItem('education', item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                <TextField label="學校" value={item.institution} onChange={(v) => updateItem('education', item.id, 'institution', v)} />
                <div className="grid grid-cols-2 gap-2">
                  <TextField label="學位" value={item.studyType} onChange={(v) => updateItem('education', item.id, 'studyType', v)} />
                  <TextField label="專業" value={item.area} onChange={(v) => updateItem('education', item.id, 'area', v)} />
                </div>
                <TextField label="時間" value={item.date} onChange={(v) => updateItem('education', item.id, 'date', v)} />
                <TextField multiline label="描述" value={item.summary} onChange={(v) => updateItem('education', item.id, 'summary', v)} />
              </div>
            ))}
          </Accordion>

          {/* 新增：實習經歷 (支持換頁) */}
          <Accordion 
            title="實習經歷" 
            icon={Building}
            isOpen={openSection === 'internship'} 
            onToggle={() => setOpenSection(openSection === 'internship' ? null : 'internship')}
            showBreakOption={true}
            breakBefore={resume.sections.internship?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('internship')}
          >
            <button onClick={() => addItem('internship')} className="w-full py-2 mb-3 border-2 border-dashed border-blue-200 text-blue-600 rounded hover:bg-blue-50 flex justify-center items-center gap-2 text-sm font-medium">
               <Plus size={16} /> 添加實習
            </button>
            {resume.sections.internship?.items?.map(item => (
              <div key={item.id} className="mb-6 p-3 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button onClick={() => removeItem('internship', item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                <TextField label="公司/組織" value={item.company} onChange={(v) => updateItem('internship', item.id, 'company', v)} />
                <TextField label="職位" value={item.position} onChange={(v) => updateItem('internship', item.id, 'position', v)} />
                <TextField label="時間" value={item.date} onChange={(v) => updateItem('internship', item.id, 'date', v)} />
                <TextField multiline label="描述" value={item.summary} onChange={(v) => updateItem('internship', item.id, 'summary', v)} />
              </div>
            ))}
          </Accordion>

          {/* 項目經歷 (支持換頁) */}
          <Accordion 
            title="項目經歷" 
            icon={Briefcase}
            isOpen={openSection === 'projects'} 
            onToggle={() => setOpenSection(openSection === 'projects' ? null : 'projects')}
            showBreakOption={true}
            breakBefore={resume.sections.projects?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('projects')}
          >
            <button onClick={() => addItem('projects')} className="w-full py-2 mb-3 border-2 border-dashed border-blue-200 text-blue-600 rounded hover:bg-blue-50 flex justify-center items-center gap-2 text-sm font-medium">
               <Plus size={16} /> 添加項目
            </button>
            {resume.sections.projects?.items?.map(item => (
              <div key={item.id} className="mb-6 p-3 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button onClick={() => removeItem('projects', item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                <TextField label="項目名稱" value={item.name} onChange={(v) => updateItem('projects', item.id, 'name', v)} />
                <TextField label="時間" value={item.date} onChange={(v) => updateItem('projects', item.id, 'date', v)} />
                <TextField multiline label="描述" value={item.summary} onChange={(v) => updateItem('projects', item.id, 'summary', v)} />
              </div>
            ))}
          </Accordion>

          {/* 志願者/社團 (支持換頁) */}
          <Accordion 
            title="社團與志願經歷" 
            icon={Heart}
            isOpen={openSection === 'volunteer'} 
            onToggle={() => setOpenSection(openSection === 'volunteer' ? null : 'volunteer')}
            showBreakOption={true}
            breakBefore={resume.sections.volunteer?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('volunteer')}
          >
            <button onClick={() => addItem('volunteer')} className="w-full py-2 mb-3 border-2 border-dashed border-blue-200 text-blue-600 rounded hover:bg-blue-50 flex justify-center items-center gap-2 text-sm font-medium">
               <Plus size={16} /> 添加經歷
            </button>
            {resume.sections.volunteer?.items?.map(item => (
              <div key={item.id} className="mb-6 p-3 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button onClick={() => removeItem('volunteer', item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                <TextField label="組織" value={item.organization} onChange={(v) => updateItem('volunteer', item.id, 'organization', v)} />
                <TextField label="職位" value={item.position} onChange={(v) => updateItem('volunteer', item.id, 'position', v)} />
                <TextField label="時間" value={item.date} onChange={(v) => updateItem('volunteer', item.id, 'date', v)} />
                <TextField multiline label="描述" value={item.summary} onChange={(v) => updateItem('volunteer', item.id, 'summary', v)} />
              </div>
            ))}
          </Accordion>

           {/* 技能 */}
           <Accordion 
            title="技能" 
            icon={PenTool}
            isOpen={openSection === 'skills'} 
            onToggle={() => setOpenSection(openSection === 'skills' ? null : 'skills')}
            showBreakOption={true}
            breakBefore={resume.sections.skills?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('skills')}
          >
            <div className="text-xs text-gray-400 mb-2">關鍵詞請用逗號分隔</div>
            {resume.sections.skills?.items?.map(item => (
              <div key={item.id} className="mb-3 p-3 bg-white border border-gray-200 rounded shadow-sm">
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <input 
                      className="w-full p-1 border-b border-gray-200 text-sm font-bold focus:border-blue-500 outline-none"
                      value={item.name}
                      onChange={(e) => updateItem('skills', item.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-2/3">
                    <input 
                      className="w-full p-1 border-b border-gray-200 text-sm focus:border-blue-500 outline-none"
                      value={item.keywords.join(", ")}
                      onChange={(e) => updateItem('skills', item.id, 'keywords', e.target.value.split(",").map(s => s.trim()))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Accordion>

          {/* 榮譽獎項 */}
          <Accordion 
            title="榮譽獎項" 
            icon={Award}
            isOpen={openSection === 'awards'} 
            onToggle={() => setOpenSection(openSection === 'awards' ? null : 'awards')}
            showBreakOption={true}
            breakBefore={resume.sections.awards?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('awards')}
          >
            {resume.sections.awards?.items?.map(item => (
               <div key={item.id} className="mb-4 p-3 bg-white border border-gray-200 rounded shadow-sm">
                 <TextField label="獎項名稱" value={item.title} onChange={(v) => updateItem('awards', item.id, 'title', v)} />
                 <TextField label="頒發機構" value={item.awarder} onChange={(v) => updateItem('awards', item.id, 'awarder', v)} />
                 <TextField label="時間" value={item.date} onChange={(v) => updateItem('awards', item.id, 'date', v)} />
               </div>
            ))}
          </Accordion>

           {/* 證書 (新增) */}
           <Accordion 
            title="證書" 
            icon={FileBadge}
            isOpen={openSection === 'certifications'} 
            onToggle={() => setOpenSection(openSection === 'certifications' ? null : 'certifications')}
            showBreakOption={true}
            breakBefore={resume.sections.certifications?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('certifications')}
          >
            <button onClick={() => addItem('certifications')} className="w-full py-2 mb-3 border-2 border-dashed border-blue-200 text-blue-600 rounded hover:bg-blue-50 flex justify-center items-center gap-2 text-sm font-medium">
               <Plus size={16} /> 添加證書
            </button>
            {resume.sections.certifications?.items?.map(item => (
               <div key={item.id} className="mb-4 p-3 bg-white border border-gray-200 rounded shadow-sm relative group">
                 <button onClick={() => removeItem('certifications', item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
                 <TextField label="證書名稱" value={item.name} onChange={(v) => updateItem('certifications', item.id, 'name', v)} />
                 <TextField label="頒發機構" value={item.issuer} onChange={(v) => updateItem('certifications', item.id, 'issuer', v)} />
                 <TextField label="時間" value={item.date} onChange={(v) => updateItem('certifications', item.id, 'date', v)} />
                 <TextField multiline label="描述" value={item.summary} onChange={(v) => updateItem('certifications', item.id, 'summary', v)} />
               </div>
            ))}
          </Accordion>

          {/* 語言 */}
           <Accordion 
            title="語言能力" 
            icon={Globe}
            isOpen={openSection === 'languages'} 
            onToggle={() => setOpenSection(openSection === 'languages' ? null : 'languages')}
            showBreakOption={true}
            breakBefore={resume.sections.languages?.breakBefore}
            onToggleBreak={() => toggleSectionBreak('languages')}
          >
            {resume.sections.languages?.items?.map(item => (
               <div key={item.id} className="mb-2 p-2 bg-white border border-gray-200 rounded flex gap-2">
                 <input className="w-1/2 p-1 border-b text-sm" value={item.name} onChange={(e) => updateItem('languages', item.id, 'name', e.target.value)} />
                 <input className="w-1/2 p-1 border-b text-sm" value={item.description} onChange={(e) => updateItem('languages', item.id, 'description', e.target.value)} />
               </div>
            ))}
          </Accordion>
        </div>
      </div>

      {/* --- 右側預覽 (Bronzor 風格) --- */}
      <div className="flex-1 overflow-y-auto bg-white p-8 flex justify-center print:p-0 print:bg-white print:overflow-visible relative">
        <div 
          ref={resumeRef} // 綁定 ref 用於 PDF 生成
          className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none print:w-full flex flex-col relative"
          style={{ fontFamily: '"Noto Sans SC", sans-serif' }}
        >
          
          {/* A4 分頁線輔助顯示 */}
          {showPageGuides && (
            <>
              <div className="absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-400 z-50 flex justify-end pointer-events-none print:hidden opacity-50">
                  <span className="bg-red-400 text-white text-xs px-2 py-0.5 rounded-bl">Page 1 End</span>
              </div>
               <div className="absolute top-[594mm] left-0 w-full border-b-2 border-dashed border-red-400 z-50 flex justify-end pointer-events-none print:hidden opacity-50">
                  <span className="bg-red-400 text-white text-xs px-2 py-0.5 rounded-bl">Page 2 End</span>
              </div>
            </>
          )}

          {/* Header */}
          <div className="p-8 pb-6 border-b border-gray-100 flex gap-6 items-start">
            {resume.basics.picture.url && (
               <img 
                src={resume.basics.picture.url} 
                alt="Profile" 
                style={{
                  width: `${resume.basics.picture.width || 100}px`,
                  height: resume.basics.picture.ratio === 'original' ? 'auto' : `${resume.basics.picture.width || 100}px`,
                  objectFit: resume.basics.picture.ratio === 'original' ? 'contain' : 'cover'
                }}
                className="rounded-lg shadow-sm border border-gray-100 block"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{resume.basics.name}</h1>
              <p className="text-lg text-blue-600 font-medium mb-4">{resume.basics.headline}</p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
                {resume.basics.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-gray-400" />
                    <span>{resume.basics.email}</span>
                  </div>
                )}
                {resume.basics.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={14} className="text-gray-400" />
                    <span>{resume.basics.phone}</span>
                  </div>
                )}
                 {resume.basics.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{resume.basics.location}</span>
                  </div>
                )}
                {resume.basics.customFields.map(field => field.value && (
                  <div key={field.id} className="flex items-center gap-1.5">
                    {field.icon === 'link' ? <LinkIcon size={14} className="text-gray-400" /> : <User size={14} className="text-gray-400" />}
                    {field.icon === 'link' ? <a href={field.value} className="hover:underline text-blue-600" target="_blank" rel="noreferrer">{field.value.replace('https://','')}</a> : <span>{field.value}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-1">
            {/* Left Column (Main) - 70% */}
            <div className="w-[68%] p-8 pr-6 border-r border-gray-100 flex flex-col gap-8">
              
              {/* Summary */}
              {resume.sections.summary?.visible && resume.sections.summary?.content && (
                <section style={{ pageBreakBefore: resume.sections.summary?.breakBefore ? 'always' : 'auto' }}>
                  {resume.sections.summary?.breakBefore && !isDownloading && <PageBreakIndicator />}
                  <h3 className="text-md font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3 uppercase tracking-wide">
                    {resume.sections.summary.name}
                  </h3>
                  <HtmlContent content={resume.sections.summary.content} />
                </section>
              )}

              {/* Education */}
              {resume.sections.education?.visible && (
                <section style={{ pageBreakBefore: resume.sections.education?.breakBefore ? 'always' : 'auto' }}>
                  {resume.sections.education?.breakBefore && !isDownloading && <PageBreakIndicator />}
                  <h3 className="text-md font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-4 uppercase tracking-wide">
                    {resume.sections.education.name}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {resume.sections.education?.items?.map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-gray-800">{item.institution}</h4>
                          <span className="text-sm text-gray-500 font-medium">{item.date}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700 mb-2">
                           <span>{item.studyType} · {item.area}</span>
                        </div>
                        <HtmlContent content={item.summary} className="text-sm" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 新增：Internship Preview */}
              {resume.sections.internship?.visible && (
                <section style={{ pageBreakBefore: resume.sections.internship?.breakBefore ? 'always' : 'auto' }}>
                  {resume.sections.internship?.breakBefore && !isDownloading && <PageBreakIndicator />}
                  <h3 className="text-md font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-4 uppercase tracking-wide">
                    {resume.sections.internship.name}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {resume.sections.internship?.items?.map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-gray-800">{item.company}</h4>
                          <span className="text-sm text-gray-500 font-medium">{item.date}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">{item.position}</div>
                        <HtmlContent content={item.summary} className="text-sm" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {resume.sections.projects?.visible && (
                <section style={{ pageBreakBefore: resume.sections.projects?.breakBefore ? 'always' : 'auto' }}>
                  {resume.sections.projects?.breakBefore && !isDownloading && <PageBreakIndicator />}
                  <h3 className="text-md font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-4 uppercase tracking-wide">
                    {resume.sections.projects.name}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {resume.sections.projects?.items?.map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <span className="text-sm text-gray-500 font-medium">{item.date}</span>
                        </div>
                        <HtmlContent content={item.summary} className="text-sm" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

               {/* Volunteer */}
               {resume.sections.volunteer?.visible && (
                <section style={{ pageBreakBefore: resume.sections.volunteer?.breakBefore ? 'always' : 'auto' }}>
                  {resume.sections.volunteer?.breakBefore && !isDownloading && <PageBreakIndicator />}
                  <h3 className="text-md font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-4 uppercase tracking-wide">
                    {resume.sections.volunteer.name}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {resume.sections.volunteer?.items?.map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-gray-800">{item.organization}</h4>
                          <span className="text-sm text-gray-500 font-medium">{item.date}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">{item.position}</div>
                        <HtmlContent content={item.summary} className="text-sm" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right Column (Sidebar) - 30% */}
            <div className="w-[32%] p-8 pl-6 bg-gray-50 flex flex-col gap-8">
              
              {/* Skills */}
              {resume.sections.skills?.visible && (
                <section style={{ pageBreakBefore: resume.sections.skills?.breakBefore ? 'always' : 'auto' }}>
                   {resume.sections.skills?.breakBefore && !isDownloading && <PageBreakIndicator />}
                   <h3 className="text-sm font-bold text-gray-900 border-b border-blue-300 pb-1 mb-3 uppercase tracking-wide text-blue-800">
                    {resume.sections.skills.name}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {resume.sections.skills?.items?.map(item => (
                      <div key={item.id}>
                        <div className="font-bold text-sm text-gray-800 mb-0.5">{item.name}</div>
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((kw, i) => (
                            <span key={i} className="text-xs text-gray-600 bg-gray-200 px-1.5 py-0.5 rounded">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Awards */}
              {resume.sections.awards?.visible && (
                 <section style={{ pageBreakBefore: resume.sections.awards?.breakBefore ? 'always' : 'auto' }}>
                   {resume.sections.awards?.breakBefore && !isDownloading && <PageBreakIndicator />}
                   <h3 className="text-sm font-bold text-gray-900 border-b border-blue-300 pb-1 mb-3 uppercase tracking-wide text-blue-800">
                    {resume.sections.awards.name}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {resume.sections.awards?.items?.map(item => (
                      <div key={item.id}>
                        <div className="font-bold text-sm text-gray-800 leading-snug">{item.title}</div>
                        <div className="text-xs text-blue-600 mb-1">{item.awarder} | {item.date}</div>
                        <HtmlContent content={item.summary} className="text-xs text-gray-500 leading-relaxed" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

               {/* Certifications */}
               {resume.sections.certifications?.visible && (
                 <section style={{ pageBreakBefore: resume.sections.certifications?.breakBefore ? 'always' : 'auto' }}>
                   {resume.sections.certifications?.breakBefore && !isDownloading && <PageBreakIndicator />}
                   <h3 className="text-sm font-bold text-gray-900 border-b border-blue-300 pb-1 mb-3 uppercase tracking-wide text-blue-800">
                    {resume.sections.certifications.name}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {resume.sections.certifications?.items?.map(item => (
                      <div key={item.id}>
                        <div className="font-bold text-sm text-gray-800 leading-snug">{item.name}</div>
                        <div className="text-xs text-blue-600 mb-1">{item.issuer} | {item.date}</div>
                        {/* 簡化顯示證書描述，避免側邊欄過長 */}
                        <div className="text-xs text-gray-500 line-clamp-3" dangerouslySetInnerHTML={{__html: item.summary}}></div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {resume.sections.languages?.visible && (
                 <section style={{ pageBreakBefore: resume.sections.languages?.breakBefore ? 'always' : 'auto' }}>
                   {resume.sections.languages?.breakBefore && !isDownloading && <PageBreakIndicator />}
                   <h3 className="text-sm font-bold text-gray-900 border-b border-blue-300 pb-1 mb-3 uppercase tracking-wide text-blue-800">
                    {resume.sections.languages.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {resume.sections.languages?.items?.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-700">{item.name}</span>
                        <span className="text-gray-500 text-xs">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>
      </div>
      
      {/* 打印樣式修正 */}
      <style>{`
        @media print {
          /* 核心打印設置 */
          @page { margin: 0; size: auto; }
          
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
            background-color: white !important;
          }
          
          /* 隱藏不必要的元素 */
          .print\\:hidden { display: none !important; }
          
          /* 調整佈局佔滿頁面 */
          .flex { display: block !important; } /* 解除 flex 佈局對打印的影響 */
          
          /* 確保預覽區域充滿 */
          .print\\:w-full { width: 100% !important; max-width: none !important; margin: 0 !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:bg-white { background-color: white !important; }
          .print\\:overflow-visible { overflow: visible !important; height: auto !important; }
          .print\\:p-0 { padding: 0 !important; }
        }
        
        /* 自定義滾動條 */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #aaa;
        }
        .cursor-wait {
          cursor: wait;
        }
      `}</style>
    </div>
  );
}