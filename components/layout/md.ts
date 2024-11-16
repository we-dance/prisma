import MarkdownIt from "markdown-it";

const md = new MarkdownIt({});

import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    content: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "span",
    },
  },
  setup(props, { attrs }) {
    return () => {
      return h(props.tag, {
        ...attrs,
        innerHTML: md.renderInline(props.content),
      });
    };
  },
});
