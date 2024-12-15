export interface ContentItem {
  id: string;
  content: string;
  metadata: {
    title?: string;
    type: 'blog' | 'project' | 'experience';
    tags?: string[];
    path?: string;
  };
}

export interface EmbeddingItem extends ContentItem {
  embedding: number[];
} 