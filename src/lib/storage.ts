export interface Requirement {
    id: string;
    title: string;
    description: string;
    category: 'Functional' | 'Non-Functional' | 'Constraint' | 'Action Item';
    priority: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
    transcript: string;
    requirements: Requirement[];
}

export const storeAnalysis = (data: AnalysisResult) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('analysisResult', JSON.stringify(data));
    }
};

export const getAnalysis = (): AnalysisResult | null => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('analysisResult');
        return data ? JSON.parse(data) : null;
    }
    return null;
};
