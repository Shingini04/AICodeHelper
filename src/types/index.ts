export interface CodeExplanation {
  intuition: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ApiResponse {
  explanation: CodeExplanation;
}