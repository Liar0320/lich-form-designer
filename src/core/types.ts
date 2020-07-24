import { ISuerDefineProps } from "./define";

export enum EElCompoents {
  El_alert = "el-alert",
  El_aside = "el-aside",
  El_autocomplete = "el-autocomplete",
  El_badge = "el-badge",
  El_breadcrumb = "el-breadcrumb",
  El_breadcrumb_item = "el-breadcrumb-item",
  El_button = "el-button",
  El_button_group = "el-button-group",
  El_card = "el-card",
  El_carousel = "el-carousel",
  El_carousel_item = "el-carousel-item",
  El_cascader = "el-cascader",
  El_checkbox = "el-checkbox",
  El_checkbox_button = "el-checkbox-button",
  El_checkbox_group = "el-checkbox-group",
  El_col = "el-col",
  El_collapse = "el-collapse",
  El_collapse_item = "el-collapse-item",
  El_color_picker = "el-color-picker",
  El_container = "el-container",
  El_date_picker = "el-date-picker",
  El_dialog = "el-dialog",
  El_dropdown = "el-dropdown",
  El_dropdown_item = "el-dropdown-item",
  El_dropdown_menu = "el-dropdown-menu",
  El_footer = "el-footer",
  El_form = "el-form",
  El_form_item = "el-form-item",
  El_header = "el-header",
  El_input = "el-input",
  El_input_number = "el-input-number",
  El_loading = "el-loading",
  El_main = "el-main",
  El_menu = "el-menu",
  El_menu_item = "el-menu-item",
  El_menu_item_group = "el-menu-item-group",
  El_message = "el-message",
  El_message_box = "el-message-box",
  El_notification = "el-notification",
  El_option = "el-option",
  El_option_group = "el-option-group",
  El_pagination = "el-pagination",
  El_popover = "el-popover",
  El_progress = "el-progress",
  El_rate = "el-rate",
  El_radio = "el-radio",
  El_radio_button = "el-radio-button",
  El_radio_group = "el-radio-group",
  El_row = "el-row",
  El_select = "el-select",
  El_slider = "el-slider",
  El_step = "el-step",
  El_steps = "el-steps",
  El_submenu = "el-submenu",
  El_switch = "el-switch",
  El_table = "el-table",
  El_table_column = "el-table-column",
  El_tag = "el-tag",
  El_tabs = "el-tabs",
  El_tab_pane = "el-tab-pane",
  El_timeline = "el-timeline",
  El_timeline_item = "el-timeline-item",
  El_time_picker = "el-time-picker",
  El_time_select = "el-time-select",
  El_tooltip = "el-tooltip",
  El_transfer = "el-transfer",
  El_tree = "el-tree",
  // tree_data
  El_upload = "el-upload",
  El_link = "el-link",
  El_divider = "el-divider",
  El_icon = "el-icon",
  El_calendar = "el-calendar",
  El_image = "el-image",
  El_backtop = "el-backtop",
  El_infinite_scroll = "el-infinite-scroll",
  El_page_header = "el-page-header",
  El_avatar = "el-avatar",
  El_drawer = "el-drawer",
  El_popconfirm = "el-popconfirm"
}

export enum EComponentType {
  DefineComponents,
  BasicComponent,
  FormComponent
}

export interface IComponentService {
  uuid?: string;
  /**名称 */
  name: string;
  /**组件名称 对应的 ComponentRegister */
  tag: string;
  /**图标 svg */
  icon: string;
  /**组件属于什么类型 */
  type: EComponentType;
  /**解析组件的service 如果需要重写可注册到 ComponentsPack */
  serviceName?: string;
  /**组件文档 */
  document?: string;
  /**组件属性 */
  props?: { [key: string]: any };
  /**组件属性 */
  attrs?: { [key: string]: any };
  /**组件右侧配置面板 */
  controlPanel?: string;
  /**用户自定义属性 */
  userDefineProps?: ISuerDefineProps;
  /**是否后端解析 */
  isAnalysis?: Boolean;
}

// export const componentListService = new ComponentListService();
