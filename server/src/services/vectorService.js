import client from "../config/qdrant.js";
import { randomUUID } from "crypto";

const COLLECTION_NAME = "lawsaral_documents";

// ======================================
// Create Collection
// ======================================

export const createCollection = async () => {
  try {

    const collections =
      await client.getCollections();

    const exists =
      collections.collections.find(
        (collection) =>
          collection.name === COLLECTION_NAME
      );

    if (!exists) {

      await client.createCollection(
        COLLECTION_NAME,
        {
          vectors: {
            size: 3072,
            distance: "Cosine",
          },
        }
      );

      console.log(
        "✅ Qdrant collection created."
      );

    }

    try {

      await client.createPayloadIndex(
        COLLECTION_NAME,
        {
          field_name: "documentId",
          field_schema: "keyword",
        }
      );

    } catch {
      // Payload index already exists
    }

  } catch (error) {

    console.error(
      "Qdrant Collection Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to initialize Qdrant collection."
    );

  }

};

// ======================================
// Store Chunks
// ======================================

export const storeChunks = async (
  documentId,
  filename,
  chunks,
  embeddings
) => {

  try {

    if (
      chunks.length !== embeddings.length
    ) {
      throw new Error(
        "Chunks and embeddings count mismatch."
      );
    }

    const points = chunks.map(
      (chunk, index) => {

        if (
          !embeddings[index] ||
          embeddings[index].length !== 3072
        ) {
          throw new Error(
            `Invalid embedding at index ${index}.`
          );
        }

        return {
          id: randomUUID(),

          vector: embeddings[index],

          payload: {
            documentId,
            filename,
            chunkIndex: index,
            uploadedAt:
              new Date().toISOString(),
            text: chunk,
          },
        };

      }
    );

    await client.upsert(
      COLLECTION_NAME,
      {
        wait: true,
        points,
      }
    );

  } catch (error) {

    console.error(
      "Store Chunks Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to store document vectors."
    );

  }

};

// ======================================
// Search Similar Chunks
// ======================================

export const searchSimilarChunks = async (
  documentId,
  queryEmbedding
) => {

  try {

    const result =
      await client.query(
        COLLECTION_NAME,
        {
          query: queryEmbedding,

          limit: 5,

          with_payload: true,

          filter: {
            must: [
              {
                key: "documentId",
                match: {
                  value: documentId,
                },
              },
            ],
          },
        }
      );

    return result.points || [];

  } catch (error) {

    console.error(
      "Vector Search Error:",
      error
    );

    throw new Error(
      error.message ||
      "Vector search failed."
    );

  }

};

// ======================================
// Delete Document Vectors
// ======================================

export const deleteDocumentVectors = async (
  documentId
) => {

  try {

    await client.delete(
      COLLECTION_NAME,
      {
        wait: true,

        filter: {
          must: [
            {
              key: "documentId",
              match: {
                value: documentId,
              },
            },
          ],
        },
      }
    );

  } catch (error) {

    console.error(
      "Delete Vectors Error:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to delete vectors."
    );

  }

};

export default client;

export { COLLECTION_NAME };