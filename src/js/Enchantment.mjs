import { toTitleCase, renderListWithTemplate } from "./utils.mjs";

function getRomanNumeral(no){
    switch (no) {
        case 2:
            return "II";
        case 3:
            return "III";
        case 4:
            return "IV";
        case 5:
            return "V";
        default:
            return "I";
    }
}

export default class Enchantment {
  constructor(enchantment) {
    this.id = enchantment.id;
    this.displayName = toTitleCase(enchantment.id);
    this.shortDescription = enchantment.shortDescription;
    this.longDescription = enchantment.longDescription;
    this.maxLevel = enchantment.maxLevel;
    this.levelDescription = enchantment.levelDescription;
    this.exclusionIds = enchantment.exclusions;
    this.categoryIds = enchantment.categories;
  }

  isCategoryCompatible(category) {
    return this.categoryIds == "all" || this.categoryIds == "armor" && category.isArmorCategory || this.categoryIds.includes(category.id);
  }

  getMaxLevelText() {
    const roman = getRomanNumeral(this.maxLevel);
    return `Max Level: ${roman} (${this.maxLevel})`;
  }

  static IMAGE_URL = "/images/enchanted_book.gif";

  static displayFn(enchantment) {
    return `<li>
    <a href="/enchantment.html?enchantment=${enchantment.id}">
    <img src="${Enchantment.IMAGE_URL}" alt="${enchantment.displayName}" />
    <div>
    <p>${enchantment.displayName}</p>
    <span>${enchantment.shortDescription}</span>
    </div>
    </li>
    </a>`;
  }

  static populateLists(enchantments, listSelector = ".all-enchantments") {
    document.querySelectorAll(listSelector).forEach(node => {
      renderListWithTemplate(Enchantment.displayFn, node, enchantments, "afterbegin", true);
    });
  }

  // Returns new HTML with <a> elements inserted for enchantment links.
  static formatParagraph(str) {
      const reg = /\$.*?\$/g;
      const enchants = [...str.matchAll(reg)];
      enchants.forEach(enchant => str = str.replaceAll(enchant[0], `<a href="enchantment.html?enchantment=${enchant[0].replaceAll('$', '')}">`
          + `${toTitleCase(enchant[0].replaceAll('$', ''))}</a>`));
      return str;
  }
}
