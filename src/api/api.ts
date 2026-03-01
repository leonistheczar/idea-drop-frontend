import api from "@/lib/api";
import type { Ideas } from "@/types";
// GET - by ID
export const fetchDatabyID = async (ideasID: string) => {
  try {
    const res = await api.get(`/ideas/${ideasID}/`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch idea by id");
  }
};
// GET IDEAS
export const fetchData = async () => {
  try {
    const res = await api.get("/ideas");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch ideas");
  }
};
// POST IDEA - NEW
export const postIdea = async (newIdea: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Ideas> => {
  try {
    const res = await api.post("/ideas", {
      ...newIdea,
      createdAt: new Date().toISOString(),
    });
    return res.data;
  } catch (error) {
    console.error("Failed to POST");
    throw error;
  }
};
// DELETE IDEA
export const deleteIdea = async (ideaID: string): Promise<void> => {
  try {
    await api.delete(`ideas/${ideaID}`);
  } catch (error) {
    console.error("Failed to delete");
    throw error;
  }
};
// UPDATE IDEA
export const updateIdea = async ({
  ideaID,
  ...newIdea
}: {
  ideaID: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Ideas> => {
  try {
    const res = await api.put(`/ideas/${ideaID}`, {
      ...newIdea,
    createdAt: new Date().toISOString(),
    });
    return res.data;
  } catch (error) {
    console.error("Failed to PUT");
    throw error;
  }
};
