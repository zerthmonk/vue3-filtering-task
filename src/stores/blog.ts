import { FilterEnum } from "@/misc/constants";
import type { StoreFilter, StoreLabel, AllowedFields } from "@/types/blog";
import type { BlogItem } from "@/components/BlogItem.vue";
import { defineStore } from "pinia";
import genFakeItems from "@/misc/fakefactory";

// Использую Options API, т.к. Composition Pinia не так хорошо документирована

interface BlogStore {
  itemsValue: BlogItem[];
  activeFilters: StoreFilter;
  labels: StoreLabel;
}

export const useBlogStore = defineStore("blog", {
  state: (): BlogStore => ({
    itemsValue: [],
    activeFilters: {},
    labels: {
      title: "Filter posts app",
      list: "Blog post list",
      filters: "Filters",
    },
  }),

  getters: {
    items(): BlogItem[] {
      // последовательная фильтрация активными фильтрами
      if (Object.keys(this.activeFilters).length > 0) {
        const filtered = Object.values(this.activeFilters).reduce(
          (acc: BlogItem[], filterMethod: Function, idx: number) => {
            const target = idx === 0 ? this.itemsValue : acc;
            return target.filter((item) => filterMethod(item));
          },
          []
        );
        return filtered.length > 0 ? Array.from(new Set(filtered.flat())) : [];
      } else {
        return this.itemsValue;
      }
    },
    getCountryOptions(): string[] {
      // все возможные варианты стран из списка сущностей
      return Array.from([
        ...new Set(this.itemsValue.map((item) => item.country)),
      ]);
    },
    getScoreOptions(): string[] {
      // hardcoded опции
      return ["< 10", "> 20"];
    },
  },

  actions: {
    getFakeItems() {
      // инициализация с фейковыми данными
      this.itemsValue = genFakeItems(10);
    },
    getItems() {
      // инициализация из API
      const api = "SOME_API_URL";
      fetch(api)
        .then((response) => response.json())
        .then(({ data }) => (this.itemsValue = data))
        .catch((error) => console.log(error));
    },
    updateFilter(id: string, method: Function) {
      // обновление или создание нового фильтра
      const filters = { ...this.activeFilters };
      filters[id] = method;
      this.activeFilters = filters;
    },
    dropFilter(id: string) {
      // удаление фильтра
      const filters = { ...this.activeFilters };
      delete filters[id];
      this.activeFilters = filters;
    },
    getFilterOptions(filterType: AllowedFields) {
      // получение связанных методов фильтрации в зависимости от типа поля
      switch (filterType) {
        case FilterEnum.country:
          return this.getCountryOptions.reduce(
            (acc: StoreFilter, countryName: string) => {
              acc[countryName] = this._getFilteringMethod(
                FilterEnum.country,
                countryName
              );
              return acc;
            },
            {}
          );
        case FilterEnum.score:
          return this.getScoreOptions.reduce(
            (acc: StoreFilter, expression: string) => {
              acc[expression] = this._getFilteringMethod(
                FilterEnum.score,
                expression
              );
              return acc;
            },
            {}
          );
        default:
          throw new Error(`Filtering by ${filterType} is not supported`);
      }
    },
    // сервисные функции. оставлены в actions вместо геттеров, чтобы улучшить читаемость
    _isCountryEq(country: string): Function {
      return (item: BlogItem) => item.country === country;
    },
    _isScoreEq(score: number): Function {
      // YAGNI, но без равенства казалось что чего-то не хватает
      return (item: BlogItem) => item.score === score;
    },
    _isScoreGt(score: number): Function {
      return (item: BlogItem) => item.score > score;
    },
    _isScoreLt(score: number): Function {
      return (item: BlogItem) => item.score < score;
    },
    _getFilteringMethod(field: AllowedFields, value: string): Function {
      switch (field) {
        case FilterEnum.country: {
          return this._isCountryEq(value);
        }
        case FilterEnum.score: {
          const [op, num] = [...value.split(" ")];
          const score = parseInt(num, 10);
          switch (op) {
            case "<":
              return this._isScoreLt(score);
            case ">":
              return this._isScoreGt(score);
            case "=":
              return this._isScoreEq(score);
            default:
              return this._isScoreEq(score);
          }
        }
        default: {
          throw new Error(`Filtering by ${field} is not supported`);
        }
      }
    },
  },
});
