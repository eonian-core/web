// This file is used to enable/disable features in the app

export const showCommunity = process.env.NEXT_PUBLIC_FEATURE_COMMUNITY_PAGE === 'true';
export const showFaq = process.env.NEXT_PUBLIC_FEATURE_FAQ_PAGE === 'true';
export const showMission = process.env.NEXT_PUBLIC_FEATURE_MISSION_PAGE === 'true';
export const showSecurity = process.env.NEXT_PUBLIC_FEATURE_SECURITY_PAGE === 'true';
export const showEarn = process.env.NEXT_PUBLIC_FEATURE_EARN_PAGE === "true";
export const showTOS = process.env.NEXT_PUBLIC_FEATURE_TOS_PAGE === "true";
export const showPrivacyPolicy = process.env.NEXT_PUBLIC_FEATURE_PP_PAGE === "true";
export const showDocs = process.env.NEXT_PUBLIC_FEATURE_DOCS_PAGE === "true";
export const showRoadmap = process.env.NEXT_PUBLIC_FEATURE_ROADMAP_PAGE === "true";
