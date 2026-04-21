import { marketPlaceApiClient } from "../api/market-place";
import {
  CreateCommentRequest,
  CreateCommentResponse,
} from "../interfaces/http/create-comment";
import { PaginatedResponse } from "../interfaces/http/paginated-response";
import { ProductRequest } from "../interfaces/http/product";
import { GetProductCommentsInterface } from "../interfaces/http/product-comments";
import { ProductDetails } from "../interfaces/http/product-details";
import {
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "../interfaces/http/update-comment";
import { ProductCategory, ProductInterface } from "../interfaces/product";
import { ProductComment } from "../interfaces/product-comment";

const getProducts = async (params: ProductRequest) => {
  const { data } = await marketPlaceApiClient.post<
    PaginatedResponse<ProductInterface>
  >("/products", params);
  return data;
};

const getProductCategories = async () => {
  const { data } = await marketPlaceApiClient.get<ProductCategory[]>(
    "/products/categories",
  );
  return data;
};

const getProductDetails = async (id: number) => {
  const { data } = await marketPlaceApiClient.get<ProductDetails>(
    `/products/${id}`,
  );
  return data;
};

const getProductComments = async (params: GetProductCommentsInterface) => {
  const { data } = await marketPlaceApiClient.post<
    PaginatedResponse<ProductComment>
  >("/products/comments", params);

  return data;
};

const createComment = async (params: CreateCommentRequest) => {
  const { data } = await marketPlaceApiClient.post<CreateCommentResponse>(
    "/products/create/comments",
    params,
  );

  return data;
};

const getUserComment = async (productId: number) => {
  const { data } = await marketPlaceApiClient.get<{
    content: string;
    comment: {
      id: number;
      content: string;
      createdAt: Date;
      user: {
        id: number;
        name: string;
      };
    };
    rating: number;
  }>(`/products/${productId}/user-comment`);

  return data;
};

export const updateUserComment = async (params: UpdateCommentRequest) => {
  const { data } = await marketPlaceApiClient.put<UpdateCommentResponse>(
    `/products/comments/${params.commentId}`,
    {
      content: params.content,
      rating: params.rating,
    },
  );
  return data;
};

export const productService = {
  getProducts,
  getProductCategories,
  getProductDetails,
  getProductComments,
  createComment,
  getUserComment,
  updateUserComment,
};
