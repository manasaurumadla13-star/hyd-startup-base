import { GoogleGenAI } from "@google/genai";
import { StartupDetail } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getStartupLiveDetails(startupName: string, website: string, category: string): Promise<StartupDetail | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a startup research assistant. Search for recent news and info about "${startupName}" (a Hyderabad startup in ${category}, website: ${website}). Extract info and return ONLY a valid JSON object. No markdown, no backticks, no explanation. Use this exact structure:
    {
      "tagline": "...",
      "about": "...",
      "products": ["..."],
      "founders": [{"name": "...", "role": "..."}],
      "funding": "...",
      "valuation": "...",
      "employees": "...",
      "customers": "...",
      "recentNews": [{"headline": "...", "date": "..."}],
      "techStack": ["..."],
      "awards": ["..."],
      "website": "${website}",
      "linkedin": "...",
      "hiring": true
    }`});

    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

export async function getContactAutoReply(name: string, email: string, message: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the friendly community manager of HYD Startup Portal. A visitor sent a contact form message. Write a warm, professional, concise auto-reply (3-5 sentences). Address them by first name. Sign off as "The HYD Startup Portal Team". No bullet points or markdown.
    Visitor Name: ${name}
    Email: ${email}
    Message: ${message}`});

    return response.text || `Hi ${name.split(' ')[0]}, thank you for reaching out! We've received your message and will get back to you within 24 hours.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Hi ${name.split(' ')[0]}, thank you for reaching out! We've received your message and will get back to you within 24 hours.`;
  }
}

export async function getJobConfirmation(name: string, phone: string, role: string, jobTitle: string, company: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the hiring coordinator at HYD Startup Portal. A candidate just registered to apply for a job. Write a warm, enthusiastic 2-4 sentence confirmation. Address them by first name. Mention the exact job title and company. Tell them the hiring team will call them within 48 business hours. Sign off as "HYD Startup Portal Careers Team". No bullet points or markdown.
    Candidate Name: ${name}
    Phone: ${phone}
    Current Role: ${role || 'Not specified'}
    Job Applied For: ${jobTitle}
    Company: ${company}`});

    return response.text || `Hi ${name.split(' ')[0]}, thanks for applying to ${jobTitle} at ${company}! Our hiring team will review your application and contact you at ${phone} within 48 hours.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Hi ${name.split(' ')[0]}, thanks for applying to ${jobTitle} at ${company}! Our hiring team will review your application and contact you at ${phone} within 48 hours.`;
  }
}
