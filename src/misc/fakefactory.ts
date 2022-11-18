import { faker } from "@faker-js/faker";
import type { BlogItem } from "@/components/BlogItem.vue";

// генерация фейковых данных

const randomDecimal = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getAvatar = (): string => {
  const idx = randomDecimal(2, 5);
  return `https://cdn.vuetifyjs.com/images/lists/${idx}.jpg`;
};

export default function generateFakeBlogItems(count: number): BlogItem[] {
  return [...Array(count)].map((_, idx) => {
    const repliedTo = [...Array(randomDecimal(1, 3))]
      .map(() => faker.name.fullName())
      .join(", ");
    return {
      uuid: idx,
      fullname: faker.name.fullName(),
      score: idx % 3 > 0 ? 5 : 25, // оставляем для наглядности существующих фильтров
      avatar: getAvatar(),
      country: idx % 2 > 0 ? "Russia" : "USA", // тоже для наглядности
      address: faker.address.city(),
      title: faker.lorem.sentence(randomDecimal(2, 5)),
      content: [repliedTo, faker.lorem.lines(randomDecimal(1, 3))].join(" - "),
    };
  });
}
