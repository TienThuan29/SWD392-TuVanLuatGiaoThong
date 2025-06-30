export type Law = {
  id?: string;
  referenceNumber?: string;
  dateline?: string;
  title?: string;
  lawType?: LawType;
  lawTypeId?: string;
  issueDate?: string;
  effectiveDate?: string;
  sourceUrl?: string;
  filePath?: string;
  isDeleted?: boolean;
  createdDate?: string;
  updatedDate?: string;
};

export type LawType = {
  id?: string;
  name?: string;
  isDeleted?: boolean;
  createdDate?: string;
  updatedDate?: string;
};
