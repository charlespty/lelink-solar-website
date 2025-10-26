import { Zap, Sun, Battery, Shield, Car, Home, Tent, Wrench, Settings, Star, Package, Plug, Power, Usb, Award, ClipboardCheck, BarChart } from 'lucide-react'
import { getImagePath } from './imageUtils'

export const productsData = [
  {
    id: 'lk-solar-generator-lk-2000',
    name: 'LK Solar Generator',
    nameZh: 'LK 太阳能发电机',
    description: 'High-capacity portable power station with 2000W pure sine wave output, supporting multiple charging methods including solar, AC, and vehicle charging. Perfect for home backup, outdoor adventures, and emergency situations.',
    descriptionZh: '大容量便携式电源站，2000W纯正弦波输出，支持太阳能、交流电和车载充电等多种充电方式。完美适用于家庭备用、户外探险和紧急情况。',
    images: [
      getImagePath('/images/Product image/optimized/Front Side.jpg'),
      getImagePath('/images/Product image/optimized/Side.jpg'),
      getImagePath('/images/Product image/optimized/Back.jpg'),
      getImagePath('/images/Product image/optimized/Side2.jpg'),
      getImagePath('/images/Product image/optimized/Plug Side.jpg'),
      getImagePath('/images/Product image/optimized/Led.jpg')
    ],
    keyFeatures: [
      { icon: Zap, text: '2000W Pure Sine Wave Output', textZh: '2000W纯正弦波输出', description: 'Clean, stable power for sensitive electronics with 2×220V AC outlets', descriptionZh: '为敏感电子设备提供清洁、稳定的电力，配备2个220V交流输出口' },
      { icon: Sun, text: 'Multi-Method Solar Charging', textZh: '多种太阳能充电方式', description: 'DC5521 and XT60 ports with MPPT tracking, max 400W solar input', descriptionZh: 'DC5521和XT60端口，支持MPPT跟踪，最大400W太阳能输入' },
      { icon: Battery, text: 'LFP Battery Technology', textZh: '磷酸铁锂电池技术', description: '2300WH/3070WH options with advanced BMS protection', descriptionZh: '2300WH/3070WH可选，配备先进BMS保护' },
      { icon: Shield, text: 'Universal Compatibility', textZh: '通用兼容性', description: 'Multiple plug types and charging methods for worldwide use', descriptionZh: '多种插头类型和充电方式，适用于全球使用' }
    ],
    specifications: [
      { name: 'Model', value: 'LK-2000', unit: '', nameZh: '型号' },
      { name: 'AC Output', value: '2000W', unit: 'Pure Sine Wave', nameZh: '交流输出' },
      { name: 'AC Input Power', value: '1000W', unit: 'Rated', nameZh: '交流输入功率' },
      { name: 'Battery Type', value: 'LFP', unit: 'Lithium Iron Phosphate', nameZh: '电池类型' },
      { name: 'Battery Energy', value: '2300WH/3070WH', unit: 'Options', nameZh: '电池容量' },
      { name: 'Solar Charging', value: '400W', unit: 'Max with MPPT', nameZh: '太阳能充电' },
      { name: 'AC Output Ports', value: '2×220V', unit: '±5%, 50Hz', nameZh: '交流输出端口' },
      { name: 'DC Output', value: '2×DC5521', unit: '12V-10A/120W', nameZh: '直流输出' },
      { name: 'USB Outputs', value: 'Multiple', unit: 'QC3.0, PD, Type-C', nameZh: 'USB输出' },
      { name: 'Weight', value: '22.6KG/24.65KG', unit: 'Options', nameZh: '重量' },
      { name: 'Dimensions', value: '460×250×340', unit: 'mm', nameZh: '尺寸' },
      { name: 'Charging Methods', value: 'AC/Solar/Vehicle', unit: '3 Methods', nameZh: '充电方式' }
    ],
    chargingMethods: [
      { name: 'DC5521 Solar Charging', value: '10V~45V/10A', description: 'PV MPPT Tracking', nameZh: 'DC5521太阳能充电', descriptionZh: '支持PV MPPT跟踪' },
      { name: 'XT60 Solar Charging', value: '10V~45V MAX400W', description: 'PV MPPT Tracking', nameZh: 'XT60太阳能充电', descriptionZh: '支持PV MPPT跟踪' },
      { name: 'AC Mains Charging', value: 'Rated Power 1000W', description: '', nameZh: '交流充电', descriptionZh: '额定功率1000W' }
    ],
    outputPorts: [
      { name: 'AC Output (2 units)', value: '220V (±5%), 2000W, 50Hz', description: 'Pure sine wave', nameZh: 'AC输出(2个)', descriptionZh: '纯正弦波' },
      { name: 'DC5521 (2 units)', value: '12V-10A/120W max', description: '', nameZh: 'DC5521(2个)', descriptionZh: '' },
      { name: 'USB Ports', value: 'QC3.0, PD, Type-C', description: 'Various power ratings', nameZh: 'USB端口', descriptionZh: '多种功率规格' }
    ],
    applicationScenarios: [
      {
        name: 'Home Energy Solutions',
        nameZh: '家庭能源解决方案',
        description: 'Reliable backup power for your home, ensuring continuous electricity during outages.',
        descriptionZh: '为您的家庭提供可靠的备用电源，确保停电期间的持续供电。',
        useCases: [
          { text: 'Power essential appliances', textZh: '为重要电器供电' },
          { text: 'Emergency lighting', textZh: '应急照明' },
          { text: 'Refrigerator backup', textZh: '冰箱备用电源' },
          { text: 'Medical equipment support', textZh: '医疗设备支持' }
        ],
        powerExamples: [
          { appliance: 'Refrigerator', power: '150W', duration: '15h', applianceZh: '冰箱' },
          { appliance: 'LED Lights', power: '50W', duration: '46h', applianceZh: 'LED灯' },
          { appliance: 'TV', power: '100W', duration: '23h', applianceZh: '电视' },
          { appliance: 'Laptop', power: '60W', duration: '38h', applianceZh: '笔记本电脑' }
        ]
      },
      {
        name: 'Outdoor Adventures',
        nameZh: '户外探险',
        description: 'Perfect companion for camping, RV trips, and outdoor activities.',
        descriptionZh: '露营、房车旅行和户外活动的完美伴侣。',
        useCases: [
          { text: 'Camping power needs', textZh: '露营用电需求' },
          { text: 'RV and van life', textZh: '房车和面包车生活' },
          { text: 'Outdoor events', textZh: '户外活动' },
          { text: 'Remote work setup', textZh: '远程工作设置' }
        ],
        powerExamples: [
          { appliance: 'Camping Lights', power: '20W', duration: '115h', applianceZh: '露营灯' },
          { appliance: 'Phone Charger', power: '10W', duration: '230h', applianceZh: '手机充电器' },
          { appliance: 'Portable Fan', power: '40W', duration: '58h', applianceZh: '便携风扇' },
          { appliance: 'Coffee Maker', power: '800W', duration: '2.9h', applianceZh: '咖啡机' }
        ]
      },
      {
        name: 'Emergency Backup',
        nameZh: '应急备用',
        description: 'Critical power support for emergency situations and disaster preparedness.',
        descriptionZh: '为紧急情况和灾害准备提供关键电力支持。',
        useCases: [
          { text: 'Natural disaster backup', textZh: '自然灾害备用' },
          { text: 'Communication devices', textZh: '通信设备' },
          { text: 'Emergency lighting', textZh: '应急照明' },
          { text: 'Medical equipment', textZh: '医疗设备' }
        ],
        powerExamples: [
          { appliance: 'Emergency Radio', power: '5W', duration: '460h', applianceZh: '应急收音机' },
          { appliance: 'CPAP Machine', power: '60W', duration: '38h', applianceZh: '呼吸机' },
          { appliance: 'Emergency Lights', power: '30W', duration: '77h', applianceZh: '应急灯' },
          { appliance: 'Phone/Tablet', power: '15W', duration: '153h', applianceZh: '手机/平板' }
        ]
      },
      {
        name: 'Commercial Use',
        nameZh: '商业用途',
        description: 'Professional-grade solutions for businesses and commercial applications.',
        descriptionZh: '为商业和商业应用提供专业级解决方案。',
        useCases: [
          { text: 'Construction sites', textZh: '建筑工地' },
          { text: 'Remote offices', textZh: '远程办公室' },
          { text: 'Event venues', textZh: '活动场地' },
          { text: 'Mobile businesses', textZh: '移动商业' }
        ],
        powerExamples: [
          { appliance: 'Power Tools', power: '1000W', duration: '2.3h', applianceZh: '电动工具' },
          { appliance: 'Laptop/Computer', power: '100W', duration: '23h', applianceZh: '笔记本电脑/电脑' },
          { appliance: 'LED Work Lights', power: '100W', duration: '23h', applianceZh: 'LED工作灯' },
          { appliance: 'Air Compressor', power: '1500W', duration: '1.5h', applianceZh: '空气压缩机' }
        ]
      }
    ]
  },
  {
    id: 'lp-400w-solar-panel',
    name: 'LP Foldable Solar Panel',
    nameZh: 'LP 折叠太阳能面板',
    description: 'High-efficiency, portable, and versatile foldable solar panel for clean energy on the go. Lightweight, high conversion rate, multiple outputs, and customizable.',
    descriptionZh: '便携式折叠太阳能板，高效清洁能源。轻便携带 · 高转换率 · 多种输出 · 定制可选。',
    images: [
      getImagePath('/images/Product image/LP-400W/LP-400W-foldable.jpg'),
      getImagePath('/images/Product image/LP-400W/LP-400W-outdoor-new.png'),
      getImagePath('/images/Product image/LP-400W/LP-400W-camping.jpg'),
      getImagePath('/images/Product image/LP-400W/LP-400W-seaside.jpg'),
      getImagePath('/images/Product image/LP-400W/LP-400W-grassland.jpg'),
      getImagePath('/images/Product image/LP-400W/LP-400W-extend.jpg'),
    ],
    keyFeatures: [
      { icon: Sun, text: 'High-Efficiency PV Conversion', textZh: '高效光电转换', description: 'Premium monocrystalline / PERC cells for stable performance', descriptionZh: '优质单晶 / PERC 电池片，性能稳定' },
      { icon: Package, text: 'Foldable & Portable Design', textZh: '折叠设计 / 便于携带', description: 'Thin structure, foldable for easy storage and transport', descriptionZh: '薄型结构、折叠收纳，便于携带' },
      { icon: Zap, text: 'Multiple Outputs & Compatibility', textZh: '多重输出 & 模块兼容', description: 'USB / DC / MC4 multi-interface support for various devices', descriptionZh: 'USB / DC / MC4 多接口支持，兼容多种设备' },
      { icon: Shield, text: 'Durable Protective Design', textZh: '耐用防护设计', description: 'Thickened canvas, waterproof, UV resistant, reinforced frame', descriptionZh: '帆布加厚 / 防水 / 抗紫外线 / 加强边框' },
      { icon: Wrench, text: 'Customization Capability', textZh: '定制能力', description: 'Flexible customization for interfaces, power, and appearance', descriptionZh: '接口、功率、外观灵活定制' }
    ],
    specifications: [
      { name: 'Model', value: 'LP-400W', unit: '', nameZh: '型号' },
      { name: 'Cell Type', value: 'Monocrystalline / PERC', unit: '', nameZh: '电池类型' },
      { name: 'Max Power', value: '400W', unit: '', nameZh: '最大功率' },
      { name: 'Open Circuit Voltage', value: '24V', unit: '', nameZh: '开路电压' },
      { name: 'Short Circuit Current', value: '20A', unit: '', nameZh: '短路电流' },
      { name: 'Working Voltage', value: '18V', unit: '', nameZh: '工作电压' },
      { name: 'Working Current', value: '16.67A', unit: '', nameZh: '工作电流' },
      { name: 'Conversion Efficiency', value: '>22%', unit: '', nameZh: '转换效率' },
      { name: 'Output Interfaces', value: 'USB / DC / MC4', unit: '', nameZh: '输出接口' },
      { name: 'Folded Dimensions', value: '600x400x50', unit: 'mm', nameZh: '折叠尺寸' },
      { name: 'Unfolded Dimensions', value: '1600x600x5', unit: 'mm', nameZh: '展开尺寸' },
      { name: 'Weight', value: '10', unit: 'kg', nameZh: '重量' },
      { name: 'Waterproof Rating', value: 'IP65', unit: '', nameZh: '防水等级' },
      { name: 'Operating Temp', value: '-20°C to 60°C', unit: '', nameZh: '工作温度' }
    ],
    applicationScenarios: [
      {
        name: 'Camping / Outdoor Travel',
        nameZh: '露营 / 户外旅行',
        description: 'Power your outdoor adventures, charging devices and small appliances on the go.',
        descriptionZh: '为您的户外探险供电，随时随地为设备和小电器充电。',
        useCases: [
          { text: 'Portable device charging', textZh: '便携设备充电' },
          { text: 'Camping equipment power', textZh: '露营设备供电' },
          { text: 'Outdoor lighting', textZh: '户外照明' },
          { text: 'Emergency backup', textZh: '应急备用' }
        ],
        powerExamples: [
          { appliance: 'Smartphone', power: '10W', duration: 'Charge 40 times', applianceZh: '智能手机' },
          { appliance: 'Tablet', power: '20W', duration: 'Charge 20 times', applianceZh: '平板电脑' },
          { appliance: 'Portable Fan', power: '40W', duration: '10h', applianceZh: '便携风扇' },
          { appliance: 'Camping Light', power: '5W', duration: '80h', applianceZh: '露营灯' }
        ]
      },
      {
        name: 'Home Emergency Backup',
        nameZh: '家庭应急备用',
        description: 'Provide essential power for critical devices during power outages.',
        descriptionZh: '在停电期间为关键设备提供必要的电力。',
        useCases: [
          { text: 'Emergency lighting', textZh: '应急照明' },
          { text: 'Communication devices', textZh: '通信设备' },
          { text: 'Medical equipment', textZh: '医疗设备' },
          { text: 'Small appliances', textZh: '小电器' }
        ],
        powerExamples: [
          { appliance: 'LED Light', power: '10W', duration: '40h', applianceZh: 'LED灯' },
          { appliance: 'Radio', power: '5W', duration: '80h', applianceZh: '收音机' },
          { appliance: 'Laptop', power: '60W', duration: '6.6h', applianceZh: '笔记本电脑' },
          { appliance: 'Small Fan', power: '30W', duration: '13.3h', applianceZh: '小风扇' }
        ]
      },
      {
        name: 'Vehicle / RV Power',
        nameZh: '车载 / 房车',
        description: 'Keep your RV or vehicle batteries charged for extended trips and off-grid living.',
        descriptionZh: '为您的房车或车辆电池充电，以应对长途旅行和离网生活。',
        useCases: [
          { text: 'RV battery charging', textZh: '房车电池充电' },
          { text: 'Vehicle accessories', textZh: '车载配件' },
          { text: 'Mobile office setup', textZh: '移动办公设置' },
          { text: 'Recreation equipment', textZh: '娱乐设备' }
        ],
        powerExamples: [
          { appliance: 'RV Lights', power: '50W', duration: '8h', applianceZh: '房车灯' },
          { appliance: 'Water Pump', power: '100W', duration: '4h', applianceZh: '水泵' },
          { appliance: 'Small Fridge', power: '80W', duration: '5h', applianceZh: '小型冰箱' },
          { appliance: 'Fan', power: '40W', duration: '10h', applianceZh: '风扇' }
        ]
      },
      {
        name: 'Construction Site / Mobile Devices',
        nameZh: '工地 / 移动设备供电',
        description: 'Reliable power for tools and mobile devices in remote or temporary work sites.',
        descriptionZh: '在偏远或临时工作场所为工具和移动设备提供可靠电力。',
        useCases: [
          { text: 'Power tool charging', textZh: '电动工具充电' },
          { text: 'Communication devices', textZh: '通信设备' },
          { text: 'Work lighting', textZh: '工作照明' },
          { text: 'Mobile office', textZh: '移动办公室' }
        ],
        powerExamples: [
          { appliance: 'Power Drill', power: '500W', duration: '0.8h', applianceZh: '电钻' },
          { appliance: 'Laptop', power: '60W', duration: '6.6h', applianceZh: '笔记本电脑' },
          { appliance: 'Work Light', power: '100W', duration: '4h', applianceZh: '工作灯' },
          { appliance: 'Radio', power: '20W', duration: '20h', applianceZh: '收音机' }
        ]
      }
    ],
    customizationService: {
      title: 'Customization Service',
      titleZh: '定制服务',
      description: 'We offer OEM / ODM solutions, supporting comprehensive customization from appearance, interfaces, power, to packaging.',
      descriptionZh: '我们提供 OEM / ODM 方案，支持从外观、接口、功率、包装全方位定制。',
      workflow: [
        { step: 'Requirement Communication', stepZh: '需求沟通' },
        { step: 'Solution Design', stepZh: '方案设计' },
        { step: 'Sample Confirmation', stepZh: '样品确认' },
        { step: 'Batch Production', stepZh: '批量生产' },
        { step: 'Shipment', stepZh: '出货' }
      ]
    },
    afterSalesAndCertifications: {
      title: 'After-sales Support & Certifications',
      titleZh: '售后保障与认证',
      warranty: '1 Year warranty for the whole machine / Long-term for key components',
      warrantyZh: '整机 1 年保修 / 关键组件长期保修',
      certifications: 'Complies with CE / RoHS / IEC / ISO9001',
      certificationsZh: '符合 CE / RoHS / IEC / ISO9001（如有）',
      testing: 'Laboratory testing capabilities + strict quality inspection process',
      testingZh: '实验室测试能力 + 严格质检流程'
    }
  },
  {
    id: 'lt-fixed-solar-panel',
    name: 'LT Fixed Solar Panel',
    nameZh: 'LT 固定式太阳能面板',
    description: 'High-efficiency fixed solar panel designed for permanent installation. Features robust aluminum frame, half-cut cell technology, and excellent performance in various weather conditions.',
    descriptionZh: '高效固定式太阳能面板，专为永久安装设计。采用坚固的铝合金框架、半片电池技术，在各种天气条件下表现优异。',
    images: [
      getImagePath('/images/Product image/LT-Fixed/LT-fixed-panel-1.jpg'),
      getImagePath('/images/Product image/LT-Fixed/LT-fixed-panel-2.jpg'),
      getImagePath('/images/Product image/LT-Fixed/LT-fixed-panel-3.jpg'),
      getImagePath('/images/Product image/LT-Fixed/LT-fixed-panel-4.jpg'),
    ],
    keyFeatures: [
      { icon: Sun, text: 'Half-Cut Cell Technology', textZh: '半片电池技术', description: 'Improved efficiency and better performance in partial shading conditions', descriptionZh: '提高效率，在部分遮挡条件下表现更佳' },
      { icon: Shield, text: 'Robust Aluminum Frame', textZh: '坚固铝合金框架', description: 'Weather-resistant frame with excellent structural integrity', descriptionZh: '耐候性框架，结构完整性优异' },
      { icon: Zap, text: 'High Conversion Efficiency', textZh: '高转换效率', description: 'Advanced cell technology for maximum power output', descriptionZh: '先进电池技术，实现最大功率输出' },
      { icon: Settings, text: 'Easy Installation', textZh: '易于安装', description: 'Standard mounting holes and clear installation guidelines', descriptionZh: '标准安装孔和清晰的安装指南' }
    ],
    specifications: [
      { name: 'Model', value: 'LT-550W', unit: '', nameZh: '型号' },
      { name: 'Cell Type', value: 'Monocrystalline', unit: 'Half-Cut', nameZh: '电池类型' },
      { name: 'Max Power', value: '550W', unit: '', nameZh: '最大功率' },
      { name: 'Open Circuit Voltage', value: '49.8V', unit: '', nameZh: '开路电压' },
      { name: 'Short Circuit Current', value: '13.8A', unit: '', nameZh: '短路电流' },
      { name: 'Working Voltage', value: '41.2V', unit: '', nameZh: '工作电压' },
      { name: 'Working Current', value: '13.35A', unit: '', nameZh: '工作电流' },
      { name: 'Conversion Efficiency', value: '>21%', unit: '', nameZh: '转换效率' },
      { name: 'Frame Material', value: 'Anodized Aluminum', unit: '', nameZh: '框架材料' },
      { name: 'Dimensions', value: '2279×1134×35', unit: 'mm', nameZh: '尺寸' },
      { name: 'Weight', value: '28.5', unit: 'kg', nameZh: '重量' },
      { name: 'Operating Temp', value: '-40°C to +85°C', unit: '', nameZh: '工作温度' },
      { name: 'Max Wind Load', value: '2400Pa', unit: '', nameZh: '最大风载' },
      { name: 'Max Snow Load', value: '5400Pa', unit: '', nameZh: '最大雪载' }
    ],
    applicationScenarios: [
      {
        name: 'Residential Rooftop',
        nameZh: '住宅屋顶',
        description: 'Perfect for home rooftop installations, providing clean energy for household consumption.',
        descriptionZh: '完美适用于家庭屋顶安装，为家庭用电提供清洁能源。',
        useCases: [
          { text: 'Home energy independence', textZh: '家庭能源独立' },
          { text: 'Reduce electricity bills', textZh: '降低电费支出' },
          { text: 'Grid-tie systems', textZh: '并网系统' },
          { text: 'Net metering', textZh: '净计量' }
        ],
        powerExamples: [
          { appliance: 'Household Appliances', power: '3000W', duration: '6h/day', applianceZh: '家用电器' },
          { appliance: 'Air Conditioning', power: '2000W', duration: '8h/day', applianceZh: '空调' },
          { appliance: 'Water Heater', power: '1500W', duration: '4h/day', applianceZh: '热水器' },
          { appliance: 'Lighting', power: '500W', duration: '12h/day', applianceZh: '照明' }
        ]
      },
      {
        name: 'Commercial Buildings',
        nameZh: '商业建筑',
        description: 'Ideal for office buildings, warehouses, and commercial facilities.',
        descriptionZh: '适用于办公楼、仓库和商业设施的完美选择。',
        useCases: [
          { text: 'Office building power', textZh: '办公楼供电' },
          { text: 'Warehouse operations', textZh: '仓库运营' },
          { text: 'Shopping centers', textZh: '购物中心' },
          { text: 'Industrial facilities', textZh: '工业设施' }
        ],
        powerExamples: [
          { appliance: 'Office Equipment', power: '5000W', duration: '8h/day', applianceZh: '办公设备' },
          { appliance: 'HVAC Systems', power: '8000W', duration: '10h/day', applianceZh: '暖通空调系统' },
          { appliance: 'Lighting Systems', power: '2000W', duration: '12h/day', applianceZh: '照明系统' },
          { appliance: 'Security Systems', power: '500W', duration: '24h/day', applianceZh: '安防系统' }
        ]
      },
      {
        name: 'Agricultural Applications',
        nameZh: '农业应用',
        description: 'Support farming operations with reliable solar power for irrigation and equipment.',
        descriptionZh: '为农业运营提供可靠的太阳能，支持灌溉和设备运行。',
        useCases: [
          { text: 'Irrigation systems', textZh: '灌溉系统' },
          { text: 'Greenhouse operations', textZh: '温室运营' },
          { text: 'Farm equipment', textZh: '农业设备' },
          { text: 'Livestock facilities', textZh: '畜牧设施' }
        ],
        powerExamples: [
          { appliance: 'Water Pumps', power: '2000W', duration: '6h/day', applianceZh: '水泵' },
          { appliance: 'Greenhouse Fans', power: '1000W', duration: '8h/day', applianceZh: '温室风扇' },
          { appliance: 'Feed Processing', power: '3000W', duration: '4h/day', applianceZh: '饲料加工' },
          { appliance: 'Monitoring Systems', power: '200W', duration: '24h/day', applianceZh: '监控系统' }
        ]
      },
      {
        name: 'Industrial Installations',
        nameZh: '工业安装',
        description: 'Heavy-duty applications for manufacturing and industrial facilities.',
        descriptionZh: '适用于制造和工业设施的重型应用。',
        useCases: [
          { text: 'Manufacturing plants', textZh: '制造工厂' },
          { text: 'Mining operations', textZh: '采矿作业' },
          { text: 'Oil & gas facilities', textZh: '石油天然气设施' },
          { text: 'Data centers', textZh: '数据中心' }
        ],
        powerExamples: [
          { appliance: 'Production Equipment', power: '10000W', duration: '12h/day', applianceZh: '生产设备' },
          { appliance: 'Compressed Air', power: '5000W', duration: '8h/day', applianceZh: '压缩空气' },
          { appliance: 'Cooling Systems', power: '8000W', duration: '16h/day', applianceZh: '冷却系统' },
          { appliance: 'Control Systems', power: '1000W', duration: '24h/day', applianceZh: '控制系统' }
        ]
      }
    ],
    customizationService: {
      title: 'Customization Service',
      titleZh: '定制服务',
      description: 'We offer OEM/ODM solutions with flexible customization options for power ratings, dimensions, and mounting systems.',
      descriptionZh: '我们提供OEM/ODM解决方案，在功率等级、尺寸和安装系统方面具有灵活的定制选项。',
      workflow: [
        { step: 'Requirement Analysis', stepZh: '需求分析' },
        { step: 'Technical Design', stepZh: '技术设计' },
        { step: 'Prototype Development', stepZh: '原型开发' },
        { step: 'Testing & Validation', stepZh: '测试验证' },
        { step: 'Mass Production', stepZh: '批量生产' }
      ]
    },
    afterSalesAndCertifications: {
      title: 'After-sales Support & Certifications',
      titleZh: '售后保障与认证',
      warranty: '25 Years Linear Power Warranty / 12 Years Product Warranty',
      warrantyZh: '25年线性功率保修 / 12年产品保修',
      certifications: 'IEC 61215, IEC 61730, CE, TUV, UL, FCC',
      certificationsZh: '符合 IEC 61215, IEC 61730, CE, TUV, UL, FCC 标准',
      testing: 'Comprehensive quality testing including PID, LID, and mechanical stress tests',
      testingZh: '全面质量测试，包括PID、LID和机械应力测试'
    }
  }
]

export function getProductById(id: string) {
  return productsData.find(product => product.id === id)
}

export function getAllProducts() {
  return productsData
}

      getImagePath('/images/Product image/LT-Fixed/LT-fixed-panel-4.jpg'),
    ],
    keyFeatures: [
      { icon: Sun, text: 'Half-Cut Cell Technology', textZh: '半片电池技术', description: 'Improved efficiency and better performance in partial shading conditions', descriptionZh: '提高效率，在部分遮挡条件下表现更佳' },
      { icon: Shield, text: 'Robust Aluminum Frame', textZh: '坚固铝合金框架', description: 'Weather-resistant frame with excellent structural integrity', descriptionZh: '耐候性框架，结构完整性优异' },
      { icon: Zap, text: 'High Conversion Efficiency', textZh: '高转换效率', description: 'Advanced cell technology for maximum power output', descriptionZh: '先进电池技术，实现最大功率输出' },
      { icon: Settings, text: 'Easy Installation', textZh: '易于安装', description: 'Standard mounting holes and clear installation guidelines', descriptionZh: '标准安装孔和清晰的安装指南' }
    ],
    specifications: [
      { name: 'Model', value: 'LT-550W', unit: '', nameZh: '型号' },
      { name: 'Cell Type', value: 'Monocrystalline', unit: 'Half-Cut', nameZh: '电池类型' },
      { name: 'Max Power', value: '550W', unit: '', nameZh: '最大功率' },
      { name: 'Open Circuit Voltage', value: '49.8V', unit: '', nameZh: '开路电压' },
      { name: 'Short Circuit Current', value: '13.8A', unit: '', nameZh: '短路电流' },
      { name: 'Working Voltage', value: '41.2V', unit: '', nameZh: '工作电压' },
      { name: 'Working Current', value: '13.35A', unit: '', nameZh: '工作电流' },
      { name: 'Conversion Efficiency', value: '>21%', unit: '', nameZh: '转换效率' },
      { name: 'Frame Material', value: 'Anodized Aluminum', unit: '', nameZh: '框架材料' },
      { name: 'Dimensions', value: '2279×1134×35', unit: 'mm', nameZh: '尺寸' },
      { name: 'Weight', value: '28.5', unit: 'kg', nameZh: '重量' },
      { name: 'Operating Temp', value: '-40°C to +85°C', unit: '', nameZh: '工作温度' },
      { name: 'Max Wind Load', value: '2400Pa', unit: '', nameZh: '最大风载' },
      { name: 'Max Snow Load', value: '5400Pa', unit: '', nameZh: '最大雪载' }
    ],
    applicationScenarios: [
      {
        name: 'Residential Rooftop',
        nameZh: '住宅屋顶',
        description: 'Perfect for home rooftop installations, providing clean energy for household consumption.',
        descriptionZh: '完美适用于家庭屋顶安装，为家庭用电提供清洁能源。',
        useCases: [
          { text: 'Home energy independence', textZh: '家庭能源独立' },
          { text: 'Reduce electricity bills', textZh: '降低电费支出' },
          { text: 'Grid-tie systems', textZh: '并网系统' },
          { text: 'Net metering', textZh: '净计量' }
        ],
        powerExamples: [
          { appliance: 'Household Appliances', power: '3000W', duration: '6h/day', applianceZh: '家用电器' },
          { appliance: 'Air Conditioning', power: '2000W', duration: '8h/day', applianceZh: '空调' },
          { appliance: 'Water Heater', power: '1500W', duration: '4h/day', applianceZh: '热水器' },
          { appliance: 'Lighting', power: '500W', duration: '12h/day', applianceZh: '照明' }
        ]
      },
      {
        name: 'Commercial Buildings',
        nameZh: '商业建筑',
        description: 'Ideal for office buildings, warehouses, and commercial facilities.',
        descriptionZh: '适用于办公楼、仓库和商业设施的完美选择。',
        useCases: [
          { text: 'Office building power', textZh: '办公楼供电' },
          { text: 'Warehouse operations', textZh: '仓库运营' },
          { text: 'Shopping centers', textZh: '购物中心' },
          { text: 'Industrial facilities', textZh: '工业设施' }
        ],
        powerExamples: [
          { appliance: 'Office Equipment', power: '5000W', duration: '8h/day', applianceZh: '办公设备' },
          { appliance: 'HVAC Systems', power: '8000W', duration: '10h/day', applianceZh: '暖通空调系统' },
          { appliance: 'Lighting Systems', power: '2000W', duration: '12h/day', applianceZh: '照明系统' },
          { appliance: 'Security Systems', power: '500W', duration: '24h/day', applianceZh: '安防系统' }
        ]
      },
      {
        name: 'Agricultural Applications',
        nameZh: '农业应用',
        description: 'Support farming operations with reliable solar power for irrigation and equipment.',
        descriptionZh: '为农业运营提供可靠的太阳能，支持灌溉和设备运行。',
        useCases: [
          { text: 'Irrigation systems', textZh: '灌溉系统' },
          { text: 'Greenhouse operations', textZh: '温室运营' },
          { text: 'Farm equipment', textZh: '农业设备' },
          { text: 'Livestock facilities', textZh: '畜牧设施' }
        ],
        powerExamples: [
          { appliance: 'Water Pumps', power: '2000W', duration: '6h/day', applianceZh: '水泵' },
          { appliance: 'Greenhouse Fans', power: '1000W', duration: '8h/day', applianceZh: '温室风扇' },
          { appliance: 'Feed Processing', power: '3000W', duration: '4h/day', applianceZh: '饲料加工' },
          { appliance: 'Monitoring Systems', power: '200W', duration: '24h/day', applianceZh: '监控系统' }
        ]
      },
      {
        name: 'Industrial Installations',
        nameZh: '工业安装',
        description: 'Heavy-duty applications for manufacturing and industrial facilities.',
        descriptionZh: '适用于制造和工业设施的重型应用。',
        useCases: [
          { text: 'Manufacturing plants', textZh: '制造工厂' },
          { text: 'Mining operations', textZh: '采矿作业' },
          { text: 'Oil & gas facilities', textZh: '石油天然气设施' },
          { text: 'Data centers', textZh: '数据中心' }
        ],
        powerExamples: [
          { appliance: 'Production Equipment', power: '10000W', duration: '12h/day', applianceZh: '生产设备' },
          { appliance: 'Compressed Air', power: '5000W', duration: '8h/day', applianceZh: '压缩空气' },
          { appliance: 'Cooling Systems', power: '8000W', duration: '16h/day', applianceZh: '冷却系统' },
          { appliance: 'Control Systems', power: '1000W', duration: '24h/day', applianceZh: '控制系统' }
        ]
      }
    ],
    customizationService: {
      title: 'Customization Service',
      titleZh: '定制服务',
      description: 'We offer OEM/ODM solutions with flexible customization options for power ratings, dimensions, and mounting systems.',
      descriptionZh: '我们提供OEM/ODM解决方案，在功率等级、尺寸和安装系统方面具有灵活的定制选项。',
      workflow: [
        { step: 'Requirement Analysis', stepZh: '需求分析' },
        { step: 'Technical Design', stepZh: '技术设计' },
        { step: 'Prototype Development', stepZh: '原型开发' },
        { step: 'Testing & Validation', stepZh: '测试验证' },
        { step: 'Mass Production', stepZh: '批量生产' }
      ]
    },
    afterSalesAndCertifications: {
      title: 'After-sales Support & Certifications',
      titleZh: '售后保障与认证',
      warranty: '25 Years Linear Power Warranty / 12 Years Product Warranty',
      warrantyZh: '25年线性功率保修 / 12年产品保修',
      certifications: 'IEC 61215, IEC 61730, CE, TUV, UL, FCC',
      certificationsZh: '符合 IEC 61215, IEC 61730, CE, TUV, UL, FCC 标准',
      testing: 'Comprehensive quality testing including PID, LID, and mechanical stress tests',
      testingZh: '全面质量测试，包括PID、LID和机械应力测试'
    }
  }
]

export function getProductById(id: string) {
  return productsData.find(product => product.id === id)
}

export function getAllProducts() {
  return productsData
}
