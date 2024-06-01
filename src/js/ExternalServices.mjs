import Category from "./Category.mjs";
import Enchantment from "./Enchantment.mjs";

function convertToJson(res) {
  const json = res.json();
  if (res.ok) {
    return json;
  } else {
    throw { name: "servicesError", message: json };
  }
}

export default class ExternalServices {
  constructor() {}
  async getAllCategories() {
    const response = await fetch("/json/categories.json");
    const data = await convertToJson(response);
    return data.categories.map(c => new Category(c));
  }
  async getAllEnchantments() {
    const response = await fetch("/json/enchantments.json");
    const data = await convertToJson(response);
    return data.enchantments.sort(function(a, b) { return a.id > b.id ? 1 : -1 }).map(c => new Enchantment(c));
  }
}
