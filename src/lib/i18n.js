// src/lib/i18n.js
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
 

// Minimal i18n: small EN dictionary + humanizer fallback so keys don't leak to UI
const EN_DICT = {
  // Nav
  "nav.home": "Home",
  "nav.mentorship": "Mentorship",
  "nav.exams": "Exams",
  "nav.courses": "Courses",
  "nav.contact": "Contact",
  "nav.about": "About",
  "nav.forum": "Forum",
  "nav.forms": "Forms",
  "nav.admissions": "Admissions",
  "nav.blog": "Blog",
  "nav.login": "Login",

  // Home: CTA
  "home.cta.title": "Ready to accelerate your learning?",
  "home.cta.desc": "Join mentorship or subscribe for updates and resources.",
  "home.cta.join": "Join Mentorship",
  "home.cta.subscribe": "Subscribe",

  // Home: Highlights
  "home.highlights.title": "Highlights",
  "home.highlights.desc": "What you can do here",
  "home.highlights.notifications": "Exam Notifications",
  "home.highlights.notifications_desc": "Latest updates and important dates.",
  "home.highlights.mentorship": "Mentorship",
  "home.highlights.mentorship_desc": "1:1 guidance from experts.",
  "home.highlights.forms": "Form Fill-up Guides",
  "home.highlights.forms_desc": "SOPs, letters, and applications.",
  "home.highlights.explore": "Explore",

  // Home: Intro
  "home.intro.title": "Your path to success starts here",
  "home.intro.desc": "Mentorship, exam guidance, and free resources.",

  // Mentorship Page
  "mentorship.title": "Mentorship",
  "mentorship.desc": "Book 1:1 sessions for UPSC, SSC, Banking, NEET, and JEE.",
  "mentorship.exam_categories": "Exam Categories",
  "mentorship.book_mentor": "Book a Mentor",
  "mentorship.study_plans": "Study Plans",
  "mentorship.guidance_articles": "Guidance Articles",
  "mentorship.success_stories": "Success Stories",
  "mentorship.exam_strategies": "Exam Strategies",
  "mentorship.book_session": "Book Session",
  "mentorship.browse_mentors": "Browse Mentors",

  // Mentorship Booking Page
  "mentorship.book.title": "Book a Mentor",
  "mentorship.book.desc": "Pick a date and choose one of the 5 available time slots.",
  "mentorship.book.select_date": "Select Date",
  "mentorship.book.check_availability": "Check availability and book your session",
  "mentorship.book.loading": "Loading...",
  "mentorship.book.refresh": "Refresh",
  "mentorship.book.pick_specific_day": "Pick a specific day",
  "mentorship.book.loading_slots": "Loading slots...",
  "mentorship.book.no_slots": "No slots available.",
  "mentorship.book.available": "Available",
  "mentorship.book.booked": "Booked",
  "mentorship.book.confirm_booking": "Confirm booking",
  "mentorship.book.date": "Date",
  "mentorship.book.slot": "Slot",
  "mentorship.book.cancel": "Cancel",
  "mentorship.book.confirm": "Confirm",
  "mentorship.book.sign_in_to_book": "Please sign in to book a slot",
  "mentorship.book.toast.loading": "Booking...",
  "mentorship.book.toast.success": "Slot booked successfully!",
  "mentorship.book.toast.error": "Booking failed",
  "mentorship.book.error.fetch": "Failed to fetch availability",
  "mentorship.book.error.load": "Could not load availability. Please try again.",
  "mentorship.book.message.success": "✅ Slot booked successfully!",
  "mentorship.book.message.error_prefix": "❌",

  // Courses Page
  "courses.desc": "Structured, outcome-focused learning. New drops soon.",
  "courses.card_desc": "Structured lessons, focused practice, and clear outcomes.",
  "courses.course_label": "Course",
  "courses.detail_placeholder": "This is a placeholder page. Detailed curriculum, schedules, and enrollment info coming soon.",

  // Guidance Page
  "guidance.title": "Motivation & Guidance Articles",
  "guidance.desc": "Curated articles to help you stay consistent and prepare smarter.",

  // Strategies Page
  "strategies.title": "Exam Strategies & Study Hacks",
  "strategies.desc": "Use systems that scale—don’t rely on motivation alone.",

  // Success Stories Page
  "success_stories.desc": "Wins from focused mentorship and smart plans.",

  // Testimonials Section
  "testimonials.title": "Success Stories",
  "testimonials.subtitle": "Real results from focused guidance.",
  "features.title": "What We Offer",
  "features.subtitle": "Premium guidance designed for outcomes.",
  "features.items.mentorship.title": "Mentorship",
  "features.items.mentorship.desc": "1:1 guidance from experts.",
  "features.items.form_help.title": "Form Help",
  "features.items.form_help.desc": "SOPs, Letters, and applications—reviewed and refined for clarity.",
  "features.items.exam_guidance.title": "Exam Guidance",
  "features.items.exam_guidance.desc": "Roadmaps, PYQ strategies, and practice plans tailored to your goals.",
  "features.items.college_admissions.title": "College Admissions",
  "features.items.college_admissions.desc": "End-to-end support for shortlisting, applications, and interviews.",

  // Common
  "common.view_details": "View Details",
  "common.language": "Language",
  "common.back_to_courses": "← Back to Courses",
  
  // About Page
  "about.title": "About Us",
  "about.intro": "We started AskYourCounsellor to give students practical, premium guidance—without the noise. Clear mentorship, proven exam strategies, and honest admissions help.",
  "about.story.title": "Our Story",
  "about.story.desc": "Why we started this",
  "about.story.body": "We saw ambitious students wasting time on scattered advice. We decided to build a place that brings clarity—expert mentorship, structured plans, and trusted resources to help you move faster.",
  "about.mission.title": "Mission & Vision",
  "about.mission.desc": "What drives us",
  "about.mission.list.1": "Make top-tier guidance accessible.",
  "about.mission.list.2": "Turn confusion into clear action.",
  "about.mission.list.3": "Build confident, independent learners.",
  "about.team.title": "Team & Mentors",
  "about.team.card_desc": "Experienced, empathetic mentors focused on real outcomes.",
  
  // Exams Page
  "exams.title": "Competitive Exams",
  "exams.desc": "Quick links to everything you need—syllabus, dates, PYQs, resources, and more.",
  "exams.cat.upsc.title": "UPSC",
  "exams.cat.upsc.desc": "CSE and other major exams",
  "exams.cat.ssc.title": "SSC",
  "exams.cat.ssc.desc": "CGL, CHSL, and more",
  "exams.cat.bank.title": "Bank Exams",
  "exams.cat.bank.desc": "IBPS • SBI • RBI",
  "exams.cat.engmed.title": "Engineering/Medical",
  "exams.cat.engmed.desc": "JEE • NEET • Others",
  
  // Contact Page
  "contact.title": "Contact & Support",
  "contact.desc": "We’re here to help with mentorship, exams, and admissions.",
  "contact.form.title": "Send us a message",
  "contact.form.name": "Name",
  "contact.form.name_ph": "Your name",
  "contact.form.email": "Email",
  "contact.form.email_ph": "you@example.com",
  "contact.form.topic": "Topic",
  "contact.form.topic.mentorship": "Mentorship",
  "contact.form.topic.exams": "Exams",
  "contact.form.topic.admissions": "Admissions",
  "contact.form.topic.technical": "Technical",
  "contact.form.topic.payments": "Payments",
  "contact.form.message": "Message",
  "contact.form.message_ph": "How can we help?",
  "contact.form.send": "Send",
  "contact.support.title": "Support Options",
  "contact.support.email": "Email:",
  "contact.support.chat": "Chat:",
  "contact.support.chat_desc": "Coming soon — WhatsApp/Intercom integration",
  "contact.support.response_time": "Response Time:",
  "contact.support.response_sla": "Within 24 hours",
  "contact.faq.title": "FAQ",
  "contact.faq.payments": "Payments & Refunds",
  "contact.faq.payments_desc": "Payments are processed securely. Refunds are considered for cancellations within 24 hours of booking.",
  "contact.faq.sessions": "Mentorship Sessions",
  "contact.faq.sessions_desc": "You can book paid/free sessions depending on mentor availability. Session links are shared via email.",
  "contact.faq.tech": "Technical Issues",
  "contact.faq.tech_desc": "Try refreshing the page or using a different browser. If issues persist, contact support with screenshots.",
};

// Additional locales (sparse dictionaries; EN will be used as fallback)
const BN_DICT = {
  "nav.home": "হোম",
  "nav.mentorship": "মেন্টরশিপ",
  "nav.exams": "পরীক্ষা",
  "nav.courses": "কোর্স",
  "nav.contact": "যোগাযোগ",
  "nav.about": "আমাদের সম্পর্কে",
  "nav.forum": "ফোরাম",
  "nav.forms": "ফর্ম",
  "nav.admissions": "ভর্তি",
  "nav.blog": "ব্লগ",
  "nav.login": "লগইন",

  "home.cta.title": "আপনি কি আপনার শেখার গতি বাড়াতে প্রস্তুত?",
  "home.cta.desc": "মেন্টরশিপে যোগ দিন বা আপডেট ও রিসোর্সের জন্য সাবস্ক্রাইব করুন।",
  "home.cta.join": "মেন্টরশিপে যোগ দিন",
  "home.cta.subscribe": "সাবস্ক্রাইব করুন",

  "home.highlights.title": "হাইলাইটস",
  "home.highlights.desc": "এখানে আপনি যা করতে পারেন",
  "home.highlights.notifications": "পরীক্ষা নোটিফিকেশন",
  "home.highlights.notifications_desc": "সর্বশেষ আপডেট ও গুরুত্বপূর্ণ তারিখ।",
  "home.highlights.mentorship": "মেন্টরশিপ",
  "home.highlights.mentorship_desc": "বিশেষজ্ঞদের কাছ থেকে ১:১ গাইডেন্স।",
  "home.highlights.forms": "ফর্ম ফিল‑আপ গাইড",
  "home.highlights.forms_desc": "SOP, লেটার এবং আবেদনপত্র।",
  "home.highlights.explore": "এক্সপ্লোর",

  "home.intro.title": "আপনার সাফল্যের পথ শুরু হোক এখানেই",
  "home.intro.desc": "মেন্টরশিপ, পরীক্ষা নির্দেশনা এবং ফ্রি রিসোর্স।",

  "mentorship.title": "মেন্টরশিপ",
  "mentorship.desc": "UPSC, SSC, ব্যাংকিং, NEET এবং JEE এর জন্য ১:১ সেশন বুক করুন।",
  "mentorship.exam_categories": "পরীক্ষার ক্যাটাগরি",
  "mentorship.book_mentor": "একজন মেন্টর বুক করুন",
  "mentorship.study_plans": "স্টাডি প্ল্যান",
  "mentorship.guidance_articles": "গাইডেন্স আর্টিকেল",
  "mentorship.success_stories": "সাফল্যের গল্প",
  "mentorship.exam_strategies": "পরীক্ষা কৌশল",
  "mentorship.book_session": "সেশন বুক করুন",
  "mentorship.browse_mentors": "মেন্টর ব্রাউজ করুন",

  "mentorship.book.title": "একজন মেন্টর বুক করুন",
  "mentorship.book.desc": "তারিখ বেছে নিন এবং ৫টি উপলব্ধ স্লটের মধ্যে যেকোনো একটি নির্বাচন করুন।",
  "mentorship.book.select_date": "তারিখ নির্বাচন করুন",
  "mentorship.book.check_availability": "উপলব্ধতা দেখে সেশন বুক করুন",
  "mentorship.book.loading": "লোড হচ্ছে...",
  "mentorship.book.refresh": "রিফ্রেশ",
  "mentorship.book.pick_specific_day": "নির্দিষ্ট দিন নির্বাচন করুন",
  "mentorship.book.loading_slots": "স্লট লোড হচ্ছে...",
  "mentorship.book.no_slots": "কোনো স্লট উপলব্ধ নেই।",
  "mentorship.book.available": "উপলব্ধ",
  "mentorship.book.booked": "বুকড",
  "mentorship.book.confirm_booking": "বুকিং নিশ্চিত করুন",
  "mentorship.book.date": "তারিখ",
  "mentorship.book.slot": "স্লট",
  "mentorship.book.cancel": "বাতিল",
  "mentorship.book.confirm": "কনফার্ম",
  "mentorship.book.sign_in_to_book": "স্লট বুক করতে সাইন ইন করুন",
  "mentorship.book.toast.loading": "বুকিং চলছে...",
  "mentorship.book.toast.success": "স্লট সফলভাবে বুক হয়েছে!",
  "mentorship.book.toast.error": "বুকিং ব্যর্থ",
  "mentorship.book.error.fetch": "উপলব্ধতা আনতে ব্যর্থ",
  "mentorship.book.error.load": "উপলব্ধতা লোড করা যায়নি। পুনরায় চেষ্টা করুন।",
  "mentorship.book.message.success": "✅ স্লট সফলভাবে বুক হয়েছে!",
  "mentorship.book.message.error_prefix": "❌",

  "courses.desc": "কাঠামোবদ্ধ, ফলাফল-কেন্দ্রিক শেখা। নতুন কোর্স শিগগিরই।",
  "courses.card_desc": "কাঠামোবদ্ধ পাঠ, লক্ষ্যভিত্তিক অনুশীলন ও স্পষ্ট ফলাফল।",
  "courses.course_label": "কোর্স",
  "courses.detail_placeholder": "এটি একটি প্লেসহোল্ডার পেজ। বিস্তারিত কারিকুলাম, সময়সূচি এবং ভর্তি তথ্য শিগগিরই আসছে।",

  "guidance.title": "মোটিভেশন ও গাইডেন্স আর্টিকেল",
  "guidance.desc": "নিয়মিত থাকতে এবং স্মার্টভাবে প্রস্তুতি নিতে সহায়ক বাছাই করা আর্টিকেল।",

  "strategies.title": "পরীক্ষা কৌশল ও স্টাডি হ্যাকস",
  "strategies.desc": "কেবল মোটিভেশনের উপর নির্ভর নয়—স্কেলযোগ্য সিস্টেম ব্যবহার করুন।",

  "success_stories.desc": "ফোকাসড মেন্টরশিপ ও স্মার্ট প্ল্যান থেকে প্রাপ্ত সাফল্য।",

  "testimonials.title": "সাফল্যের গল্প",
  "testimonials.subtitle": "ফোকাসড গাইডেন্স থেকে বাস্তব ফলাফল।",
  "features.title": "আমরা যা অফার করি",
  "features.subtitle": "ফলাফলের জন্য ডিজাইন করা প্রিমিয়াম গাইডেন্স।",
  "features.items.mentorship.title": "মেন্টরশিপ",
  "features.items.mentorship.desc": "বিশেষজ্ঞদের কাছ থেকে ১:১ গাইডেন্স।",
  "features.items.form_help.title": "ফর্ম সহায়তা",
  "features.items.form_help.desc": "SOP, লেটার ও আবেদন—স্বচ্ছতার জন্য পরিমার্জিত।",
  "features.items.exam_guidance.title": "পরীক্ষা নির্দেশনা",
  "features.items.exam_guidance.desc": "রোডম্যাপ, PYQ কৌশল ও অনুশীলন পরিকল্পনা।",
  "features.items.college_admissions.title": "কলেজ ভর্তি",
  "features.items.college_admissions.desc": "শর্টলিস্টিং থেকে আবেদন ও ইন্টারভিউ পর্যন্ত সম্পূর্ণ সহায়তা।",

  "common.view_details": "বিস্তারিত দেখুন",
  "common.language": "ভাষা",
  "common.back_to_courses": "← কোর্সে ফিরে যান",
  
  // About Page
  "about.title": "আমাদের সম্পর্কে",
  "about.intro": "আমরা AskYourCounsellor শুরু করেছি শিক্ষার্থীদের জন্য ব্যবহারিক, প্রিমিয়াম গাইডেন্স দেওয়ার জন্য—অপ্রয়োজনীয় শব্দ ছাড়া। পরিষ্কার মেন্টরশিপ, পরীক্ষায় সফল কৌশল এবং সৎ অ্যাডমিশন সহায়তা।",
  "about.story.title": "আমাদের গল্প",
  "about.story.desc": "কেন শুরু করলাম",
  "about.story.body": "আমরা দেখেছি অনেক শিক্ষার্থী ছড়িয়ে-ছিটিয়ে থাকা পরামর্শে সময় নষ্ট করছে। আমরা এমন একটি জায়গা তৈরি করেছি যা স্পষ্টতা আনে—বিশেষজ্ঞ মেন্টরশিপ, গঠনমূলক পরিকল্পনা এবং নির্ভরযোগ্য রিসোর্স, যাতে আপনি আরও দ্রুত এগোতে পারেন।",
  "about.mission.title": "মিশন ও ভিশন",
  "about.mission.desc": "যা আমাদের চালিত করে",
  "about.mission.list.1": "টপ-টিয়ার গাইডেন্স সবার জন্য সহজলভ্য করা।",
  "about.mission.list.2": "দ্বিধা দূর করে পরিষ্কার অ্যাকশনে নিয়ে যাওয়া।",
  "about.mission.list.3": "আত্মবিশ্বাসী, স্বাধীন শিক্ষার্থী তৈরি করা।",
  "about.team.title": "টিম ও মেন্টররা",
  "about.team.card_desc": "অভিজ্ঞ, সহানুভূতিশীল মেন্টররা যারা বাস্তব ফলাফলে ফোকাস করেন।",
};

const TA_DICT = {
  "nav.home": "முகப்பு",
  "nav.mentorship": "மேன்டோர்ஷிப்",
  "nav.exams": "தேர்வுகள்",
  "nav.courses": "பாடநெறிகள்",
  "nav.contact": "தொடர்பு",
  "nav.about": "எங்களை பற்றி",
  "nav.forum": "கருத்துக்களம்",
  "nav.forms": "படிவங்கள்",
  "nav.admissions": "சேர்க்கை",
  "nav.blog": "வலைப்பதிவு",
  "nav.login": "உள்நுழை",

  "home.cta.title": "உங்கள் கற்றலை வேகப்படுத்த தயாரா?",
  "home.cta.desc": "மேன்டோர்ஷிப்பில் சேரவோ அல்லது புதுப்பிப்புகள் மற்றும் வளங்களுக்கு சந்தாதாரராகவோ செய்யுங்கள்.",
  "home.cta.join": "மேன்டோர்ஷிப்பில் சேரவும்",
  "home.cta.subscribe": "சந்தாதாரராகவும்",

  "home.highlights.title": "முக்கிய அம்சங்கள்",
  "home.highlights.desc": "இங்கு நீங்கள் செய்யக்கூடியவை",
  "home.highlights.notifications": "தேர்வு அறிவிப்புகள்",
  "home.highlights.notifications_desc": "சமீபத்திய புதுப்பிப்புகள் மற்றும் முக்கிய தேதிகள்.",
  "home.highlights.mentorship": "மேன்டோர்ஷிப்",
  "home.highlights.mentorship_desc": "நிபுணர்களிடமிருந்து 1:1 வழிகாட்டுதல்.",
  "home.highlights.forms": "படிவ உதவிகள்",
  "home.highlights.forms_desc": "SOPகள், கடிதங்கள் மற்றும் விண்ணப்பங்கள்.",
  "home.highlights.explore": "ஆராய்க",

  "home.intro.title": "உங்கள் வெற்றிப் பயணம் இங்கிருந்தே தொடங்குகிறது",
  "home.intro.desc": "மேன்டோர்ஷிப், தேர்வு வழிகாட்டுதல், மற்றும் இலவச வளங்கள்.",

  "mentorship.title": "மேன்டோர்ஷிப்",
  "mentorship.desc": "UPSC, SSC, வங்கித் தேர்வுகள், NEET, JEE ஆகியவற்றுக்கான 1:1 அமர்வுகளைப் பதிவு செய்யவும்.",
  "mentorship.exam_categories": "தேர்வு பிரிவுகள்",
  "mentorship.book_mentor": "ஒரு மேன்டரைப் பதிவு செய்யவும்",
  "mentorship.study_plans": "படிப்பு திட்டங்கள்",
  "mentorship.guidance_articles": "வழிகாட்டும் கட்டுரைகள்",
  "mentorship.success_stories": "வெற்றிக் கதைகள்",
  "mentorship.exam_strategies": "தேர்வு தந்திரங்கள்",
  "mentorship.book_session": "அமர்வை பதிவு செய்க",
  "mentorship.browse_mentors": "மேன்டர்களை உலாவவும்",

  "mentorship.book.title": "ஒரு மேன்டரைப் பதிவு செய்யவும்",
  "mentorship.book.desc": "தேதியைத் தேர்ந்தெடுத்து 5 கிடைக்கும் நேர இடங்களில் ஒன்றைத் தேர்வுசெய்க.",
  "mentorship.book.select_date": "தேதி தேர்வு",
  "mentorship.book.check_availability": "கிடைப்பதையும் பதிவு செய்வதையும் சரிபார்க்கவும்",
  "mentorship.book.loading": "ஏற்றுகிறது...",
  "mentorship.book.refresh": "புதுப்பிக்க",
  "mentorship.book.pick_specific_day": "குறிப்பிட்ட நாளைத் தேர்ந்தெடுக்கவும்",
  "mentorship.book.loading_slots": "இடங்கள் ஏற்றப்படுகிறது...",
  "mentorship.book.no_slots": "இடங்கள் எதுவும் இல்லை.",
  "mentorship.book.available": "கிடைக்கும்",
  "mentorship.book.booked": "பதிவு செய்யப்பட்டு விட்டது",
  "mentorship.book.confirm_booking": "பதிவை உறுதிப்படுத்தவும்",
  "mentorship.book.date": "தேதி",
  "mentorship.book.slot": "இடம்",
  "mentorship.book.cancel": "ரத்துசெய்",
  "mentorship.book.confirm": "உறுதிப்படுத்து",
  "mentorship.book.sign_in_to_book": "இடத்தைப் பதிவு செய்ய உள்நுழையவும்",
  "mentorship.book.toast.loading": "பதிவு நடைபெறுகிறது...",
  "mentorship.book.toast.success": "இடம் வெற்றிகரமாக பதிவு செய்யப்பட்டது!",
  "mentorship.book.toast.error": "பதிவு தோல்வியடைந்தது",
  "mentorship.book.error.fetch": "கிடைக்கும் தகவலை பெற முடியவில்லை",
  "mentorship.book.error.load": "கிடைக்கும் தகவலை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
  "mentorship.book.message.success": "✅ இடம் வெற்றிகரமாக பதிவு செய்யப்பட்டது!",
  "mentorship.book.message.error_prefix": "❌",

  "courses.desc": "வடிவமைக்கப்பட்ட, விளைவுக்கு முக்கியத்துவம் தரும் கற்றல். புதிய வெளியீர்கள் விரைவில்.",
  "courses.card_desc": "வடிவமைக்கப்பட்ட பாடங்கள், கவனமான பயிற்சி, தெளிவான விளைவுகள்.",
  "courses.course_label": "பாடநெறி",
  "courses.detail_placeholder": "இது ஒரு இடம்பிடிப்பு பக்கம். விரிவான பாடத்திட்டம், அட்டவணைகள், சேர்க்கை தகவல் விரைவில் வருகிறது.",

  "guidance.title": "மூச்சுத்துணை & வழிகாட்டும் கட்டுரைகள்",
  "guidance.desc": "தொடர்ச்சியாக இருக்கவும், புத்திசாலித்தனமாக தயாராகவும் உதவும் தொகுக்கப்பட்ட கட்டுரைகள்.",

  "strategies.title": "தேர்வு தந்திரங்கள் & படிப்பு நுட்பங்கள்",
  "strategies.desc": "முனைப்பை மட்டுமே நம்பாதீர்கள்—அளவிடக்கூடிய முறைகளைப் பயன்படுத்துங்கள்.",

  "success_stories.desc": "கவனமுடைய மேன்டோர்ஷிப் மற்றும் புத்திசாலி திட்டங்கள் மூலம் கிடைத்த வெற்றிகள்.",

  "testimonials.title": "வெற்றிக் கதைகள்",
  "testimonials.subtitle": "கவனமுடைய வழிகாட்டுதலிலிருந்து கிடைக்கும் உண்மையான விளைவுகள்.",
  "features.title": "நாங்கள் வழங்குவது",
  "features.subtitle": "விளைவுகளுக்காக வடிவமைக்கப்பட்ட பிரீமியம் வழிகாட்டுதல்.",
  "features.items.mentorship.title": "மேன்டோர்ஷிப்",
  "features.items.mentorship.desc": "நிபுணர்களிடமிருந்து 1:1 வழிகாட்டுதல்.",
  "features.items.form_help.title": "படிவ உதவி",
  "features.items.form_help.desc": "SOPகள், கடிதங்கள், விண்ணப்பங்கள்—தெளிவுக்காக பராமரிக்கப்பட்டவை.",
  "features.items.exam_guidance.title": "தேர்வு வழிகாட்டுதல்",
  "features.items.exam_guidance.desc": "ரோட்மாப், PYQ தந்திரங்கள், பயிற்சி திட்டங்கள்.",
  "features.items.college_admissions.title": "கல்லூரி சேர்க்கை",
  "features.items.college_admissions.desc": "குறுக்கீடு, விண்ணப்பங்கள், நேர்முகங்கள் வரை முழுமையான உதவி.",

  "common.view_details": "விவரங்களைப் பார்க்க",
  "common.language": "மொழி",
  "common.back_to_courses": "← பாடநெறிகளுக்கு திரும்ப",
  
  // About Page
  "about.title": "எங்களை பற்றி",
  "about.intro": "மாணவர்களுக்கு நடைமுறை, உயர்தர வழிகாட்டுதலை வழங்க AskYourCounsellor-ஐ தொடங்கினோம் — தேவையற்ற சத்தமின்றி. தெளிவான மேன்டோர்ஷிப், நிரூபிக்கப்பட்ட தேர்வு தந்திரங்கள், நேர்மையான சேர்க்கை உதவி.",
  "about.story.title": "எங்கள் கதை",
  "about.story.desc": "ஏன் தொடங்கினோம்",
  "about.story.body": "முயற்சி மிக்க மாணவர்கள் சிதறிய ஆலோசனையில் நேரத்தை வீணடிப்பதைப் பார்த்தோம். தெளிவை அளிக்கும் இடத்தை உருவாக்க முடிவு செய்தோம் — நிபுணர்களின் மேன்டோர்ஷிப், கட்டமைக்கப்பட்ட திட்டங்கள், நம்பகமான வளங்கள் — நீங்கள் விரைவாக முன்னேற உதவ.",
  "about.mission.title": "பணி மற்றும் நோக்கம்",
  "about.mission.desc": "எங்களை இயக்குவது",
  "about.mission.list.1": "மிகுந்த தரமான வழிகாட்டுதலை எல்லோருக்கும் அணுகக்கூடியதாக்குதல்.",
  "about.mission.list.2": "தெளிவில்லாமையை தெளிவான செயலாக்கமாக மாற்றுதல்.",
  "about.mission.list.3": "நம்பிக்கையுடன் சுயமாக கற்கும் மாணவர்களை உருவாக்குதல்.",
  "about.team.title": "அணி & மேன்டர்கள்",
  "about.team.card_desc": "உண்மையான விளைவுகளில் கவனம் செலுத்தும் அனுபவமிக்க, பரிவு மிக்க மேன்டர்கள்.",
};

const TE_DICT = {
  "nav.home": "హోమ్",
  "nav.mentorship": "మెంటార్షిప్",
  "nav.exams": "పరీక్షలు",
  "nav.courses": "కోర్సులు",
  "nav.contact": "సంప్రదించండి",
  "nav.about": "మా గురించి",
  "nav.forum": "ఫోరం",
  "nav.forms": "ఫారమ్‌లు",
  "nav.admissions": "అడ్మిషన్లు",
  "nav.blog": "బ్లాగ్",
  "nav.login": "లాగిన్",

  "home.cta.title": "మీ అభ్యాస వేగాన్ని పెంచడానికి సిద్ధంగా ఉన్నారా?",
  "home.cta.desc": "మెంటార్షిప్‌లో చేరండి లేదా అప్డేట్స్ మరియు వనరుల కోసం సబ్స్క్రైబ్ చేయండి.",
  "home.cta.join": "మెంటార్షిప్‌లో చేరండి",
  "home.cta.subscribe": "సబ్స్క్రైబ్ చేయండి",

  "home.highlights.title": "హైలైట్స్",
  "home.highlights.desc": "ఇక్కడ మీరు చేయగలిగేవి",
  "home.highlights.notifications": "పరీక్షా నోటిఫికేషన్స్",
  "home.highlights.notifications_desc": "తాజా అప్డేట్స్ మరియు ముఖ్యమైన తేదీలు.",
  "home.highlights.mentorship": "మెంటార్షిప్",
  "home.highlights.mentorship_desc": "నిపుణుల నుండి 1:1 మార్గదర్శకం.",
  "home.highlights.forms": "ఫారమ్ సహాయం",
  "home.highlights.forms_desc": "SOPలు, లేఖలు, అప్లికేషన్లు.",
  "home.highlights.explore": "ఎక్స్‌ప్లోర్",

  "home.intro.title": "మీ విజయ ప్రయాణం ఇక్కడి నుండి ప్రారంభమవుతుంది",
  "home.intro.desc": "మెంటార్షిప్, పరీక్షా మార్గదర్శనం, మరియు ఉచిత వనరులు.",

  "mentorship.title": "మెంటార్షిప్",
  "mentorship.desc": "UPSC, SSC, బ్యాంకింగ్, NEET, JEE కోసం 1:1 సెషన్లు బుక్ చేయండి.",
  "mentorship.exam_categories": "పరీక్షా విభాగాలు",
  "mentorship.book_mentor": "మెంటర్‌ను బుక్ చేయండి",
  "mentorship.study_plans": "అభ్యాస ప్రణాళికలు",
  "mentorship.guidance_articles": "మార్గదర్శక వ్యాసాలు",
  "mentorship.success_stories": "విజయ కథలు",
  "mentorship.exam_strategies": "పరీక్షా వ్యూహాలు",
  "mentorship.book_session": "సెషన్ బుక్ చేయండి",
  "mentorship.browse_mentors": "మెంటర్స్ చూడండి",

  "mentorship.book.title": "మెంటర్‌ను బుక్ చేయండి",
  "mentorship.book.desc": "తేదీ ఎంచుకుని 5 అందుబాటులో ఉన్న టైమ్ స్లాట్లలో ఒకటిని ఎంచుకోండి.",
  "mentorship.book.select_date": "తేదీ ఎంచుకోండి",
  "mentorship.book.check_availability": "అందుబాటును పరిశీలించి సెషన్ బుక్ చేయండి",
  "mentorship.book.loading": "లోడ్ అవుతోంది...",
  "mentorship.book.refresh": "రిఫ్రెష్",
  "mentorship.book.pick_specific_day": "ఒక నిర్దిష్ట రోజును ఎంచుకోండి",
  "mentorship.book.loading_slots": "స్లాట్లు లోడ్ అవుతున్నాయి...",
  "mentorship.book.no_slots": "స్లాట్లు అందుబాటులో లేవు.",
  "mentorship.book.available": "అందుబాటులో ఉంది",
  "mentorship.book.booked": "బుక్ అయింది",
  "mentorship.book.confirm_booking": "బుకింగ్‌ను నిర్ధారించండి",
  "mentorship.book.date": "తేదీ",
  "mentorship.book.slot": "స్లాట్",
  "mentorship.book.cancel": "రద్దు",
  "mentorship.book.confirm": "ఖచ్చితపరచండి",
  "mentorship.book.sign_in_to_book": "స్లాట్ బుక్ చేయడానికి సైన్ ఇన్ చేయండి",
  "mentorship.book.toast.loading": "బుకింగ్ జరుగుతోంది...",
  "mentorship.book.toast.success": "స్లాట్ విజయవంతంగా బుక్ అయ్యింది!",
  "mentorship.book.toast.error": "బుకింగ్ విఫలమైంది",
  "mentorship.book.error.fetch": "అందుబాటును తెచ్చుకోలేకపోయాం",
  "mentorship.book.error.load": "అందుబాటు లోడ్ కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.",
  "mentorship.book.message.success": "✅ స్లాట్ విజయవంతంగా బుక్ అయ్యింది!",
  "mentorship.book.message.error_prefix": "❌",

  "courses.desc": "నిర్వచిత, ఫలితాలపై దృష్టి పెట్టిన అభ్యాసం. కొత్త కోర్సులు త్వరలో.",
  "courses.card_desc": "నిర్వచిత పాఠాలు, కేంద్రీకృత సాధన, స్పష్టమైన ఫలితాలు.",
  "courses.course_label": "కోర్సు",
  "courses.detail_placeholder": "ఇది ఒక ప్లేస్‌హోల్డు పేజీ. వివరణాత్మక సిలబస్, షెడ్యూళ్లు, అడ్మిషన్ సమాచారం త్వరలో వస్తుంది.",

  "guidance.title": "మోటివేషన్ & మార్గదర్శక వ్యాసాలు",
  "guidance.desc": "నిరంతరం ఉండటానికి, తెలివిగా తయారీకి సహాయపడే ఎంపిక చేసిన వ్యాసాలు.",

  "strategies.title": "పరీక్షా వ్యూహాలు & స్టడీ హ్యాక్స్",
  "strategies.desc": "మోటివేషన్‌పై మాత్రమే ఆధారపడకండి—పరిమాణంలో పెరగగల సిస్టమ్స్ వాడండి.",

  "success_stories.desc": "ఫోకస్డ్ మెంటార్షిప్ మరియు స్మార్ట్ ప్లాన్స్ ద్వారా పొందిన విజయాలు.",

  "testimonials.title": "విజయ కథలు",
  "testimonials.subtitle": "ఫోకస్డ్ మార్గదర్శనంతో వచ్చిన నిజమైన ఫలితాలు.",
  "features.title": "మేము ఏమి అందిస్తున్నాం",
  "features.subtitle": "ఫలితాల కోసం రూపొందించిన ప్రీమియమ్ మార్గదర్శకం.",
  "features.items.mentorship.title": "మెంటార్షిప్",
  "features.items.mentorship.desc": "నిపుణుల నుండి 1:1 మార్గదర్శకం.",
  "features.items.form_help.title": "ఫారమ్ సహాయం",
  "features.items.form_help.desc": "SOPలు, లేఖలు, అప్లికేషన్లు—స్పష్టత కోసం మెరుగుపరచబడ్డవి.",
  "features.items.exam_guidance.title": "పరీక్షా మార్గదర్శనం",
  "features.items.exam_guidance.desc": "రోడ్‌మ్యాప్స్, PYQ వ్యూహాలు, సాధన ప్రణాళికలు.",
  "features.items.college_admissions.title": "కాలేజ్ అడ్మిషన్స్",
  "features.items.college_admissions.desc": "షార్ట్‌లిస్టింగ్ నుంచి అప్లికేషన్స్, ఇంటర్వ్యూల వరకు పూర్తి సహాయం.",

  "common.view_details": "వివరాలు చూడండి",
  "common.language": "భాష",
  "common.back_to_courses": "← కోర్సులకు తిరిగి వెళ్ళండి",
  
  // About Page
  "about.title": "మా గురించి",
  "about.intro": "విద్యార్థులకు ప్రయోజనకరమైన, ప్రీమియం మార్గదర్శకత ఇవ్వడానికి AskYourCounsellor‌ను ప్రారంభించాము — అనవసర గోల లేకుండా. స్పష్టమైన మెంటార్షిప్, నిరూపిత పరీక్షా వ్యూహాలు, నిజాయితీగల అడ్మిషన్ సహాయం.",
  "about.story.title": "మా కథ",
  "about.story.desc": "మేము ఎందుకు ప్రారంభించాము",
  "about.story.body": "మేము చాలా మంది విద్యార్థులు చెదురుమదురు సలహాల్లో సమయం వృథా చేస్తూ చూస్తున్నాము. స్పష్టతను ఇచ్చే స్థలాన్ని నిర్మించాలనుకున్నాము — నిపుణుల మెంటార్షిప్, నిర్మిత ప్రణాళికలు, నమ్మదగిన వనరులు — మీరు వేగంగా ముందుకు కదలడానికి.",
  "about.mission.title": "మిషన్ & విజన్",
  "about.mission.desc": "మమ్మల్ని నడిపేదేమిటి",
  "about.mission.list.1": "టాప్-టియర్ మార్గదర్శకతను అందరికీ అందుబాటులోకి తేవడం.",
  "about.mission.list.2": "గందరగోళాన్ని స్పష్టమైన చర్యగా మార్చడం.",
  "about.mission.list.3": "ఆత్మవిశ్వాసంతో స్వతంత్రంగా నేర్చుకునే విద్యార్థులను తయారు చేయడం.",
  "about.team.title": "బృందం & మెంటర్లు",
  "about.team.card_desc": "నిజమైన ఫలితాలపై దృష్టి పెట్టే అనుభవజ్ఞులైన, స్పందన గల మెంటర్లు.",
};

export const SUPPORTED_LOCALES = ["en", "hi", "bn", "ta", "te"];

const HI_DICT = {
  "nav.home": "होम",
  "nav.mentorship": "मेंटॉरशिप",
  "nav.exams": "परीक्षाएं",
  "nav.courses": "पाठ्यक्रम",
  "nav.contact": "संपर्क",
  "nav.about": "हमारे बारे में",
  "nav.forum": "फोरम",
  "nav.forms": "फॉर्म्स",
  "nav.admissions": "प्रवेश",
  "nav.blog": "ब्लॉग",
  "nav.login": "लॉगिन",
  "nav.resources": "संसाधन",
  "nav.dashboard": "डैशबोर्ड",

  "home.cta.title": "क्या आप सीखने की गति बढ़ाने के लिए तैयार हैं?",
  "home.cta.desc": "मेंटॉरशिप से जुड़ें या अपडेट और संसाधनों के लिए सब्सक्राइब करें.",
  "home.cta.join": "मेंटॉरशिप जॉइन करें",
  "home.cta.subscribe": "सब्सक्राइब करें",

  "home.highlights.title": "हाइलाइट्स",
  "home.highlights.desc": "यहां आप क्या कर सकते हैं",
  "home.highlights.notifications": "परीक्षा सूचनाएं",
  "home.highlights.notifications_desc": "नवीनतम अपडेट और महत्वपूर्ण तिथियां.",
  "home.highlights.mentorship": "मेंटॉरशिप",
  "home.highlights.mentorship_desc": "विशेषज्ञों से 1:1 मार्गदर्शन.",
  "home.highlights.forms": "फॉर्म फिल‑अप गाइड्स",
  "home.highlights.forms_desc": "SOPs, पत्र और आवेदन.",
  "home.highlights.explore": "देखें",

  "home.intro.title": "आपकी सफलता का मार्ग यहीं से शुरू होता है",
  "home.intro.desc": "मेंटॉरशिप, परीक्षा मार्गदर्शन और मुफ्त संसाधन.",

  // Mentorship Page
  "mentorship.title": "मेंटॉरशिप",
  "mentorship.desc": "UPSC, SSC, बैंकिंग, NEET और JEE के लिए 1:1 सत्र बुक करें.",
  "mentorship.exam_categories": "परीक्षा श्रेणियाँ",
  "mentorship.book_mentor": "मेंटॉर बुक करें",
  "mentorship.study_plans": "स्टडी प्लान्स",
  "mentorship.guidance_articles": "मार्गदर्शन लेख",
  "mentorship.success_stories": "सफलता की कहानियाँ",
  "mentorship.exam_strategies": "परीक्षा रणनीतियाँ",
  "mentorship.book_session": "सेशन बुक करें",
  "mentorship.browse_mentors": "मेंटर्स देखें",

  // Mentorship Booking Page
  "mentorship.book.title": "मेंटॉर बुक करें",
  "mentorship.book.desc": "तिथि चुनें और 5 उपलब्ध समय स्लॉट में से एक चुनें।",
  "mentorship.book.select_date": "तिथि चुनें",
  "mentorship.book.check_availability": "उपलब्धता देखें और सेशन बुक करें",
  "mentorship.book.loading": "लोड हो रहा है...",
  "mentorship.book.refresh": "रिफ्रेश",
  "mentorship.book.pick_specific_day": "किसी विशेष दिन का चयन करें",
  "mentorship.book.loading_slots": "स्लॉट्स लोड हो रहे हैं...",
  "mentorship.book.no_slots": "कोई स्लॉट उपलब्ध नहीं है.",
  "mentorship.book.available": "उपलब्ध",
  "mentorship.book.booked": "बुक्ड",
  "mentorship.book.confirm_booking": "बुकिंग की पुष्टि करें",
  "mentorship.book.date": "तिथि",
  "mentorship.book.slot": "स्लॉट",
  "mentorship.book.cancel": "रद्द करें",
  "mentorship.book.confirm": "पुष्टि करें",
  "mentorship.book.sign_in_to_book": "स्लॉट बुक करने के लिए कृपया साइन इन करें",
  "mentorship.book.toast.loading": "बुकिंग हो रही है...",
  "mentorship.book.toast.success": "स्लॉट सफलतापूर्वक बुक हो गया!",
  "mentorship.book.toast.error": "बुकिंग विफल",
  "mentorship.book.error.fetch": "उपलब्धता प्राप्त करने में विफल",
  "mentorship.book.error.load": "उपलब्धता लोड नहीं हो सकी. कृपया पुनः प्रयास करें.",
  "mentorship.book.message.success": "✅ स्लॉट सफलतापूर्वक बुक हो गया!",
  "mentorship.book.message.error_prefix": "❌",

  // Courses Page
  "courses.desc": "संरचित, परिणाम-केंद्रित सीखना. नए कोर्स जल्द आ रहे हैं.",
  "courses.card_desc": "संरचित पाठ, केंद्रित अभ्यास, और स्पष्ट परिणाम.",
  "courses.course_label": "पाठ्यक्रम",
  "courses.detail_placeholder": "यह एक प्लेसहोल्डर पेज है. विस्तृत पाठ्यक्रम, समय-सारिणी और नामांकन जानकारी जल्द उपलब्ध होगी।",

  // Guidance Page
  "guidance.title": "प्रेरणा और मार्गदर्शन लेख",
  "guidance.desc": "संग्रहित लेख जो आपको निरंतर रहने और बेहतर तैयारी में मदद करें।",

  // Strategies Page
  "strategies.title": "परीक्षा रणनीतियाँ और अध्ययन हैक्स",
  "strategies.desc": "ऐसी प्रणालियाँ अपनाएँ जो टिकाऊ हों—सिर्फ प्रेरणा पर निर्भर न रहें।",

  // Success Stories Page
  "success_stories.desc": "फोकस्ड मेंटॉरशिप और स्मार्ट प्लान्स से मिली सफलताएँ।",

  // Testimonials Section
  "testimonials.title": "सफलता की कहानियाँ",
  "testimonials.subtitle": "वास्तविक परिणाम, केंद्रित मार्गदर्शन से।",
  "features.title": "हम क्या प्रदान करते हैं",
  "features.subtitle": "परिणामों के लिए डिज़ाइन किया गया प्रीमियम मार्गदर्शन.",
  "features.items.mentorship.title": "मेंटॉरशिप",
  "features.items.mentorship.desc": "विशेषज्ञों से 1:1 मार्गदर्शन.",
  "features.items.form_help.title": "फॉर्म सहायता",
  "features.items.form_help.desc": "SOPs, पत्र और आवेदन—स्पष्टता के लिए परिष्कृत.",
  "features.items.exam_guidance.title": "परीक्षा मार्गदर्शन",
  "features.items.exam_guidance.desc": "रोडमैप, PYQ रणनीतियाँ और अभ्यास योजनाएँ.",
  "features.items.college_admissions.title": "कॉलेज एडमिशन",
  "features.items.college_admissions.desc": "शॉर्टलिस्टिंग, आवेदन और इंटरव्यू तक संपूर्ण सहायता.",

  // Common
  "common.view_details": "विवरण देखें",
  "common.language": "भाषा",
  "common.back_to_courses": "← कोर्सेज़ पर वापस जाएँ",
  
  // About Page
  "about.title": "हमारे बारे में",
  "about.intro": "हमने AskYourCounsellor की शुरुआत छात्रों को व्यावहारिक, प्रीमियम मार्गदर्शन देने के लिए की—बिना किसी शोर के। स्पष्ट मेंटॉरशिप, प्रमाणित परीक्षा रणनीतियाँ और ईमानदार एडमिशन सहायता।",
  "about.story.title": "हमारी कहानी",
  "about.story.desc": "हमने यह क्यों शुरू किया",
  "about.story.body": "हमने देखा कि महत्वाकांक्षी छात्र बिखरी हुई सलाह पर समय बर्बाद कर रहे थे। हमने एक ऐसा स्थान बनाने का निर्णय लिया जो स्पष्टता लाए—विशेषज्ञ मेंटॉरशिप, संरचित योजनाएँ, और भरोसेमंद संसाधन ताकि आप तेजी से आगे बढ़ सकें।",
  "about.mission.title": "मिशन और विज़न",
  "about.mission.desc": "क्या हमें प्रेरित करता है",
  "about.mission.list.1": "टॉप-टियर मार्गदर्शन सुलभ बनाना।",
  "about.mission.list.2": "उलझन को स्पष्ट कार्रवाई में बदलना।",
  "about.mission.list.3": "आत्मविश्वासी, स्वतंत्र शिक्षार्थियों का निर्माण करना।",
  "about.team.title": "टीम और मेंटर्स",
  "about.team.card_desc": "अनुभवी, सहृदय मेंटर्स जो वास्तविक परिणामों पर केंद्रित हैं।",
};

function humanizeFromKey(key) {
  if (!key) return "";
  const last = key.split(".").pop() || key;
  const words = last.replace(/[_-]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const I18nContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key) => EN_DICT[key] ?? humanizeFromKey(key),
});

export function I18nProvider({ children }) {
  

  // Initialize locale from URL prefix if present, else from localStorage/cookie fallback
  const [locale, setLocaleState] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("locale") || "en";
      }
    } catch {}
    return "en";
  });

  useEffect(() => {
    try { localStorage.setItem("locale", locale); } catch {}
    try { document.documentElement.lang = locale; } catch {}
    // Do not modify the URL based on locale.
  }, [locale]);

  const dict = useMemo(() => {
    const base = EN_DICT;
    const map = { en: EN_DICT, hi: HI_DICT, bn: BN_DICT, ta: TA_DICT, te: TE_DICT };
    const d = map[locale] || EN_DICT;
    return d;
  }, [locale]);
  const t = (k) => (dict[k] ?? EN_DICT[k]) ?? humanizeFromKey(k);

  const setLocale = (next) => {
    if (!SUPPORTED_LOCALES.includes(next)) return;
    setLocaleState(next);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}
