import { ComponentsService } from "./services";
import LTextView from "./LTextView";
import LElSelect from "./LELSelect";
const componentsService = new ComponentsService();
componentsService.registerService(LTextView);
componentsService.registerService(LElSelect);
export default componentsService;
export { componentsService };
export { ComponentsBaseService } from "./services";
