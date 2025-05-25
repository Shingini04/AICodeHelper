export interface CodeExplanation {
  type: 'detailed' | 'lineByLine' | 'summary';
  intuition?: string;
  approach?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  lineByLine?: string;
  summary?: string;
}

export interface ApiResponse {
  explanation: CodeExplanation;
}