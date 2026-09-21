export type LeadStage =
  | "Lead"
  | "Qualified"
  | "Opportunity"
  | "Proposal"
  | "Won"
  | "Lost";

export type CRMLead = {
  id: string;
  date: string;
  location: string;
  team: string;
  product: string;
  source: string;
  stage: LeadStage;
  daysInStage: number;
  value: number;
};