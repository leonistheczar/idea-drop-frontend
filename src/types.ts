import type { QueryClient } from "@tanstack/react-query"

export type Ideas = {
    _id?: number,
    title: string,
    summary: string,
    description: string,
    tags: string[],
    createdAt?: string,
    updatedAt?: string
}
export type User = {
    _id?: number,
    name:string,
    email:string,
    password:string,
    createdAt?: string,
    updatedAt?: string

}
export type RouterContext = {
    user: User | null
    queryClient: QueryClient
  }