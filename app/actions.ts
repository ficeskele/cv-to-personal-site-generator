// This file contains server-side logic only and is never sent to the browser.
'use server';

import { GoogleGenAI, Type } from "@google/genai";
import type { Profile } from '../types';

// Initialize the AI client securely on the server
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const profileSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The full name of the person." },
        role: { type: Type.STRING, description: "The person's primary professional title or role (e.g., 'Senior Software Engineer')." },
        summary: { type: Type.STRING, description: "A professional summary of 80-120 words, written in the first person." },
        links: {
            type: Type.ARRAY,
            description: "An array of social/professional links. Include 'linkedin', 'github', 'twitter', 'website', and 'email' if available. For 'email', the url should be just the email address (e.g., 'hello@example.com').",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The platform name (e.g., 'linkedin', 'email')." },
                    url: { type: Type.STRING, description: "The full URL, or just the email address for the 'email' type." },
                },
                required: ['name', 'url'],
            },
        },
        skills: {
            type: Type.ARRAY,
            description: "An array of skill categories.",
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING, description: "The skill category (e.g., 'Frontend', 'Backend', 'DevOps')." },
                    technologies: {
                        type: Type.ARRAY,
                        description: "A list of technologies/skills within this category.",
                        items: { type: Type.STRING },
                    },
                },
                required: ['category', 'technologies'],
            },
        },
        experience: {
            type: Type.ARRAY,
            description: "Professional experience in reverse-chronological order.",
            items: {
                type: Type.OBJECT,
                properties: {
                    role: { type: Type.STRING },
                    company: { type: Type.STRING },
                    period: { type: Type.STRING, description: "The employment period (e.g., 'Jan 2020 - Present')." },
                    description: {
                        type: Type.ARRAY,
                        description: "3-5 bullet points describing achievements, written in an outcome-first manner.",
                        items: { type: Type.STRING },
                    },
                },
                required: ['role', 'company', 'period', 'description'],
            },
        },
        projects: {
            type: Type.ARRAY,
            description: "A list of personal or professional projects.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING, description: "A one-line description of the project." },
                    stack: {
                        type: Type.ARRAY,
                        description: "Key technologies used in the project.",
                        items: { type: Type.STRING },
                    },
                    url: { type: Type.STRING, description: "A URL to the project if available." },
                },
                required: ['name', 'description', 'stack'],
            },
        },
    },
    required: ['name', 'role', 'summary', 'skills', 'experience', 'projects', 'links'],
};

export async function generateWebsiteContent(cvText: string): Promise<{ profile: Profile }> {
    try {
        // Generate Profile Data
        const profileResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Parse the following CV text and extract the information based on the schema.\n\nCV TEXT:\n---\n${cvText}`,
            config: {
                systemInstruction: "You are an expert CV parser. Your task is to extract information from the provided CV text and return it in a structured JSON format that strictly adheres to the provided schema. Do not add any explanatory text or markdown formatting (like ```json) around the JSON output. The entire response must be only the JSON object.",
                responseMimeType: 'application/json',
                responseSchema: profileSchema,
            },
        });
        
        const profileJson = JSON.parse(profileResponse.text.trim());

        return { profile: profileJson as Profile };

    } catch (error) {
        console.error("Error generating website content:", error);
        if (error instanceof Error) {
            // Re-throw a serializable error object for the client
            throw new Error(`Failed to generate content from Gemini API: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating content.");
    }
};
