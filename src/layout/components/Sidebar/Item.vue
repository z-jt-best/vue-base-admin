<script>
/*
 * 声明为函数式组件, 没有上下文对象(意味着没有this, this为undefined), 只能通过render(h, context)中的context获取上下文对象(指向该实例)
 * 函数式组件渲染速度快, 但是没有this指向, 只能通过context来完成部分任务, 意味着少了很多组件的特性(不能调用method中的方法，因为没有this指向获取)
 * 如果functional为false，为正常的组件，但是使用render函数的话就没有了context参数，只能通过h函数来渲染vnode(偏底层的操作vnode节点，自由度高但是麻烦)
 */
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        getName() {
            return 'zhang'
        }
    },
    render(h, context) {
        const { icon, title } = context.props
        const vnodes = []

        if (icon) {
            vnodes.push(<svg-icon icon-class={icon} />)
        }

        if (title) {
            vnodes.push(
                <span
                    slot="title"
                    onClick={() => {
                        console.log(4444)
                    }}
                >
                    {title}
                </span>
            )
        }
        return vnodes
    }
}
</script>
