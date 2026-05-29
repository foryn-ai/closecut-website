export type ResourceCategory = "Therapy model" | "Theory" | "Area of interest";

export type CitationKind =
  | "systematic_review"
  | "meta_analysis"
  | "guideline"
  | "reference"
  | "study"
  | "overview";

export type ResourceCitation = {
  id: string;
  title: string;
  url: string;
  publisher?: string;
  year?: number;
  kind: CitationKind;
};

export type ResourceAsset = {
  id: string;
  label: string;
  url: string;
  type: "pdf" | "doc" | "image";
};

export type Resource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  tags: string[];
  summary: string;
  updatedAt?: string;
  keyConcepts: string[];
  citations: ResourceCitation[];
  worksheets?: {
    previewImage?: string;
    assets: ResourceAsset[];
    notes?: string;
  };
};
