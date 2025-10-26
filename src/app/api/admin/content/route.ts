import { NextRequest, NextResponse } from 'next/server';

// Mock content data with enhanced structure
let contentItems = [
  {
    id: '1',
    title: '首页 Hero 区域',
    type: 'section',
    content: '欢迎来到 Lelink Solar，我们提供专业的太阳能解决方案...',
    blocks: [
      {
        id: 'block-1',
        type: 'heading',
        content: '欢迎来到 Lelink Solar',
        metadata: { level: 1 },
        order: 0
      },
      {
        id: 'block-2',
        type: 'text',
        content: '<p>我们提供专业的太阳能解决方案，为您的家庭和企业提供清洁、可靠的能源。</p>',
        order: 1
      },
      {
        id: 'block-3',
        type: 'image',
        content: '/images/hero-solar-panels.jpg',
        metadata: { alt: '太阳能板', caption: '高效太阳能板' },
        order: 2
      }
    ],
    status: 'published',
    lastModified: '2024-01-15',
    author: 'admin',
    metadata: {
      description: 'Lelink Solar 首页介绍',
      keywords: '太阳能,清洁能源,太阳能板',
      featuredImage: '/images/hero-solar-panels.jpg'
    }
  },
  {
    id: '2',
    title: '产品展示区域',
    type: 'section',
    content: '我们的核心产品包括 LK 太阳能发电机、LP 折叠太阳能板...',
    blocks: [
      {
        id: 'block-4',
        type: 'heading',
        content: '我们的核心产品',
        metadata: { level: 2 },
        order: 0
      },
      {
        id: 'block-5',
        type: 'text',
        content: '<p>我们提供多种太阳能产品，满足不同场景的需求。</p>',
        order: 1
      }
    ],
    status: 'published',
    lastModified: '2024-01-14',
    author: 'admin'
  },
  {
    id: '3',
    title: '关于我们页面',
    type: 'page',
    content: 'Lelink Solar 成立于 2020 年，专注于太阳能技术的研发和应用...',
    blocks: [
      {
        id: 'block-6',
        type: 'heading',
        content: '关于 Lelink Solar',
        metadata: { level: 1 },
        order: 0
      },
      {
        id: 'block-7',
        type: 'text',
        content: '<p>Lelink Solar 成立于 2020 年，专注于太阳能技术的研发和应用。</p>',
        order: 1
      }
    ],
    status: 'draft',
    lastModified: '2024-01-13',
    author: 'admin'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const type = searchParams.get('type') || 'all';
    const status = searchParams.get('status') || 'all';
    const id = searchParams.get('id');

    // 如果指定了ID，返回单个内容项
    if (id) {
      const item = contentItems.find(item => item.id === id);
      if (!item) {
        return NextResponse.json({ 
          success: false, 
          error: 'Content item not found' 
        }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: item });
    }

    // 筛选内容项
    let filteredItems = contentItems;

    if (search) {
      filteredItems = filteredItems.filter(item => 
        item.title.toLowerCase().includes(search) ||
        item.content.toLowerCase().includes(search) ||
        (item.metadata?.description && item.metadata.description.toLowerCase().includes(search))
      );
    }

    if (type !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    if (status !== 'all') {
      filteredItems = filteredItems.filter(item => item.status === status);
    }

    return NextResponse.json({ 
      success: true, 
      data: filteredItems,
      total: filteredItems.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch content'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newItem = await request.json();
    
    // 验证必需字段
    if (!newItem.title || !newItem.type) {
      return NextResponse.json({
        success: false,
        error: 'Title and type are required'
      }, { status: 400 });
    }

    // 生成新ID和设置默认值
    newItem.id = Date.now().toString();
    newItem.lastModified = new Date().toISOString().split('T')[0];
    newItem.blocks = newItem.blocks || [];
    newItem.status = newItem.status || 'draft';
    newItem.author = newItem.author || 'admin';
    newItem.metadata = newItem.metadata || {};
    
    contentItems.push(newItem);
    
    return NextResponse.json({ 
      success: true, 
      data: newItem,
      message: 'Content item created successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create content item'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedItem = await request.json();
    
    if (!updatedItem.id) {
      return NextResponse.json({
        success: false,
        error: 'ID is required for update'
      }, { status: 400 });
    }

    const index = contentItems.findIndex(item => item.id === updatedItem.id);
    
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Content item not found' 
      }, { status: 404 });
    }
    
    // 更新项目
    contentItems[index] = { 
      ...contentItems[index], 
      ...updatedItem,
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    return NextResponse.json({ 
      success: true, 
      data: contentItems[index],
      message: 'Content item updated successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update content item'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID is required' 
      }, { status: 400 });
    }
    
    const index = contentItems.findIndex(item => item.id === id);
    
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Content item not found' 
      }, { status: 404 });
    }
    
    contentItems.splice(index, 1);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content item deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete content item'
    }, { status: 500 });
  }
}