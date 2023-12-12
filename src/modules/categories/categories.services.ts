import prisma from "../../utils/prisma";
import { CategoryWithoutId } from "../../types";

export async function createCategory(data: CategoryWithoutId) {
  const category = await prisma.category.create({
    data,
  });

  return category;
}

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}

export async function deleteCategory(id: number) {
  await prisma.category.delete({
    where: {
      id,
    },
  });
}

export async function updateCategory(id: number, data: CategoryWithoutId) {
  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data,
  });

  return updatedCategory;
}
