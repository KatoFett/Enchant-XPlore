import { loadHeaderFooter, getParam } from "./utils.mjs";
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

  // Get selected category
  const selected = getParam("enchantment");
  const enchantment = enchantments.find((c) => c.id == selected);

  if (enchantment) {
    // Populate page

    // Set display names
    document
      .querySelectorAll(".enchantment-name")
      .forEach((text) => (text.textContent = enchantment.displayName));

    // Set enchantment level text
    const enchantmentLevel = enchantment.getMaxLevelText();
    document
      .querySelectorAll(".enchantment-level")
      .forEach((text) => (text.textContent = enchantmentLevel));
    document
      .querySelectorAll(".enchantment-level-text")
      .forEach((text) => (text.textContent = enchantment.levelDescription));

    // Set description
    const description = Enchantment.formatParagraph(
      enchantment.longDescription,
    );
    document
      .querySelectorAll(".enchantment-description")
      .forEach((text) => (text.innerHTML = description));

    // Set compatible categories
    const compatibleCategories = categories.filter((c) =>
      enchantment.isCategoryCompatible(c),
    );
    Category.populateLists(compatibleCategories, ".enchantment-categories");

    // Set exclusions
    if (enchantment.exclusionIds) {
      const exclusions = enchantments.filter((e) =>
        enchantment.exclusionIds.includes(e.id),
      );
      Enchantment.populateLists(exclusions, ".enchantment-exclusions");
    } else {
      document
        .querySelectorAll(".enchantment-exclusions")
        .forEach((elm) => elm.remove());
      document
        .querySelectorAll(".enchantment-no-exclusions")
        .forEach((elm) => elm.removeAttribute("hidden"));
    }
  }
})();
