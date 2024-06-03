import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Category from "./Category.mjs";
import Enchantment from "./Enchantment.mjs";

(async function () {
  // Load header and footer first
  // We need to populate dropdowns in header
  await loadHeaderFooter();

  // Database connection
  const service = new ExternalServices();

  // Load and display all categories
  var categories = await service.getAllCategories();
  Category.populateLists(categories);

  // Load and display all enchantments
  var enchantments = await service.getAllEnchantments();
  Enchantment.populateLists(enchantments);
})();
