<script>
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
    },
    titleClass: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, titleClass} = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span class={(titleClass)} slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
