<script>
import draggable from "vuedraggable";
// import { render } from "@/lib/render";
import { renderChild } from "../../lib/render/creator";

// const components = {
//   itemBtns(h, element, index, parent) {
//     const { copyItem, deleteItem } = this.$listeners;
//     return [
//       <span
//         class="drawing-item-copy"
//         title="复制"
//         onClick={event => {
//           copyItem(element, parent);
//           event.stopPropagation();
//         }}
//       >
//         <i class="el-icon-copy-document" />
//       </span>,
//       <span
//         class="drawing-item-delete"
//         title="删除"
//         onClick={event => {
//           deleteItem(index, parent);
//           event.stopPropagation();
//         }}
//       >
//         <i class="el-icon-delete" />
//       </span>
//     ];
//   }
// };

export default {
  name: "",
  components: {
    // render,
    draggable
  },
  data() {
    return {
      options: {}
    };
  },
  props: ["element", "index", "drawingList", "activeId", "formData"],
  render(h) {
    return renderChild.call(this, h, this.element, this.drawingList, this.formData);
  }
};
</script>
