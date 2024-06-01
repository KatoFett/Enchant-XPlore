import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Category from "./Category.mjs";
import Enchantment from "./Enchantment.mjs";

loadHeaderFooter();

(async function () {
  // Database connection
  const service = new ExternalServices();

  // Load and display all categories
  var categories = await service.getAllCategories();
  Category.populateLists(categories);

  // Load and display all enchantments
  var enchantments = await service.getAllEnchantments();
  Enchantment.populateLists(enchantments);

  // Get selected category
  const selected = getParam("category");
  const category = categories.find((c) => c.id == selected);

  if (category) {
    // Populate page

    // Set icon images
    document
      .querySelectorAll(".category-icon")
      .forEach((image) => (image.src = category.imageUrl));

    // Set display names
    document
      .querySelectorAll(".category-name")
      .forEach((text) => (text.textContent = category.displayName));

    // Set all enchantments
    const categoryEnchantments = enchantments.filter((e) =>
      e.isCategoryCompatible(category),
    );
    Enchantment.populateLists(categoryEnchantments, ".category-enchantments");

    // Set recommended enchantments
    const recommendedEnchantments = enchantments.filter((e) =>
      category.recommendedEnchantmentIds.includes(e.id),
    );
    Enchantment.populateLists(recommendedEnchantments, ".category-recommended");

    // Set explanation
    const explanation = Enchantment.formatParagraph(
      category.recommendDescription,
    );
    document
      .querySelectorAll(".category-explanation")
      .forEach((text) => (text.innerHTML = explanation));
  }
})();
