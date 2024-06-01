import { toTitleCase, renderListWithTemplate } from "./utils.mjs";

export default class Category {
  constructor(category) {
    this.id = category.id;
    this.displayName = toTitleCase(category.id);
    this.imageUrl = `/images/categories/${category.id}.png`;
    this.recommendedEnchantmentIds = category.recommendedEnchantments;
    this.recommendDescription = category.recommendDescription;
    this.isArmorCategory = category.id == "boots" || category.id == "chestplate" || category.id == "helmet" || category.id == "leggings";
  }

  static displayFn(category) {
    return `<li><a href="/category.html?category=${category.id}"><img src="${category.imageUrl}" alt="${category.displayName}" /><p>${category.displayName}</p></li></a>`;
  }

  static populateLists(categories, listSelector = ".all-categories") {
    document.querySelectorAll(listSelector).forEach(node => {
      renderListWithTemplate(Category.displayFn, node, categories, "afterbegin", true);
    });
  }
}
