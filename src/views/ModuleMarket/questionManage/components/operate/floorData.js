import { createUUID } from '@/utils/tools'

export const componentsDict = {
    // 基本配置
    basic: {
        title: '', // 页面标题
        date: '', // 有效期
        anonymousFlag: 1, // 登录状态
        resultShowFlag: false, // 调研结果
        participateManyFlag: 0, // 可参与次数
        coupon: '', // 参与送优惠
        integral: '', //参与送积分
        becomeShareSaleFlag: 0, // 参与成为分销员
        startTime: '', // 开始事件
        endTime: '' // 结束事件
    },
    textInput: {
        type: 'textInput',
        uuid: createUUID(),
        componentName: 'TextAreaInput',
        title: '',
        required: false,
        content: '',
        maxLength: 20 // 字数限制
    },
    phone: {
        type: 'phone',
        uuid: createUUID(),
        componentName: 'TextInput',
        title: '',
        required: false,
        content: ''
    },
    date: {
        type: 'date',
        uuid: createUUID(),
        componentName: 'DateInput',
        title: '',
        required: false,
        content: ''
    },
    email: {
        type: 'email',
        uuid: createUUID(),
        componentName: 'TextInput',
        title: '',
        required: false,
        content: ''
    },
    richText: {
        type: 'richText',
        uuid: createUUID(),
        componentName: 'RichText',
        content: ''
    },
    photo: {
        type: 'photo',
        uuid: createUUID(),
        componentName: 'Picture',
        title: '',
        content: [],
        required: false,
        count: '' // 数量限制
    },
    textSelect: {
        type: 'textSelect',
        uuid: createUUID(),
        componentName: 'TextSelect',
        title: '',
        content: [],
        required: false,
        subType: 'radio', // 单选：radio；多选：checkbox
        optionList: [
            {
                id: 1,
                value: ''
            },
            {
                id: 2,
                value: ''
            }
        ] // 选项
    },
    photoSelect: {
        type: 'photoSelect',
        uuid: createUUID(),
        componentName: 'PhotoSelect',
        title: '',
        content: [],
        required: false,
        subType: 'radio', // 单选：radio；多选：checkbox
        showOff: 'multiple', // single: 单列; multiple: 双列
        optionList: [
            {
                id: 1,
                value: []
            },
            {
                id: 2,
                value: []
            }
        ]
    },
    region: {
        type: 'region',
        uuid: createUUID(),
        componentName: 'Region',
        title: '',
        required: false,
        content: [], // 省市区id
        regionName: '' // 省市区名称
    },
    pagination: {
        type: 'pagination',
        uuid: createUUID(),
        componentName: 'Pagination'
    }
}

export const floorList = [
    {
        id: 1,
        name: 'textInput',
        label: '文本'
    },
    {
        id: 2,
        name: 'phone',
        label: '电话'
    },
    {
        id: 3,
        name: 'date',
        label: '日期'
    },
    {
        id: 4,
        name: 'email',
        label: '邮箱'
    },
    {
        id: 5,
        name: 'richText',
        label: '富文本'
    },
    {
        id: 6,
        name: 'photo',
        label: '图片'
    },
    {
        id: 7,
        name: 'textSelect',
        label: '文本选项'
    },
    {
        id: 8,
        name: 'photoSelect',
        label: '图片选项'
    },
    {
        id: 9,
        name: 'region',
        label: '地区'
    },
    {
        id: 10,
        name: 'pagination',
        label: '分页'
    }
]
