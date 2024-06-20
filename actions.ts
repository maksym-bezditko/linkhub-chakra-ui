"use server";

import { revalidatePath } from "next/cache";

export const revalidateCachedPath = (originalPath: string, type?: "page" | "layout" | undefined) => {
  revalidatePath(originalPath, type);
};
