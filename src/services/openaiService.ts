
import OpenAI from 'openai';

// This would typically be in an environment variable or Supabase secret
// For demo purposes, we'll use a placeholder that prompts user input
let openaiApiKey: string | null = null;

const getOpenAIClient = () => {
  if (!openaiApiKey) {
    openaiApiKey = prompt('Please enter your OpenAI API key for the demo:') || '';
  }
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key required for analysis');
  }
  
  return new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
  });
};

export const analyzeCompanyData = async (dossier: any) => {
  try {
    const openai = getOpenAIClient();
    
    const dataPointsText = Object.entries(dossier.dataPoints)
      .map(([category, points]) => `${category.toUpperCase()}:\n${(points as string[]).join('\n')}`)
      .join('\n\n');

    const prompt = `Analyze the following corporate data points for '${dossier.name}.' Identify key entities, ownership percentages, control structures, and any indicators of potential Foreign Ownership, Control, or Influence (FOCI) based on common U.S. national security concerns (e.g., significant ownership by entities from 'Country X', majority foreign board control, financial dependency on 'Country X'). For each identified risk, provide a brief plain-English description, the specific data point(s) supporting it, and categorize it into one of these conceptual FOCI concern areas: 'Foreign Ownership,' 'Foreign Control (Board/Management),' 'Foreign Influence (Financial/Contractual),' or 'Key Personnel Foreign Ties.' Output as structured JSON with fields: riskScore (0-100), riskLevel (LOW/MODERATE/HIGH/CRITICAL), and risks array with type, severity, description, and evidence fields.

Data Points:
${dataPointsText}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a national security analyst specializing in Foreign Ownership, Control, or Influence (FOCI) assessments. Provide clear, actionable analysis in JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Invalid JSON response from OpenAI');
    }
    
  } catch (error) {
    console.error('OpenAI analysis failed:', error);
    throw error;
  }
};

export const analyzeMitigationImpact = async (originalAnalysis: any, changes: any) => {
  try {
    const openai = getOpenAIClient();
    
    const changesText = Object.entries(changes)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const prompt = `Based on the original FOCI analysis, evaluate the impact of the following proposed changes on the risk profile. Provide updated risk assessment and explanation of improvements or remaining concerns.

Original Risk Score: ${originalAnalysis.riskScore}
Original Risks: ${originalAnalysis.risks.map((r: any) => r.description).join('; ')}

Proposed Changes:
${changesText}

Provide response as JSON with: newRiskScore (0-100), newRiskLevel, impactSummary, and remainingConcerns.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system', 
          content: 'You are a FOCI mitigation specialist. Analyze how proposed changes affect national security risk profiles.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 800
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
    
  } catch (error) {
    console.error('Mitigation analysis failed:', error);
    throw error;
  }
};
