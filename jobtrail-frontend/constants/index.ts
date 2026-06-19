import { Status } from "@/types";

export const STATUSES: Status[] = [
  { id: "wishlist",    label: "Wishlist",    color: "#818CF8", bg: "rgba(129,140,248,0.1)" },
  { id: "preparing",  label: "Preparing",   color: "#A78BFA", bg: "rgba(167,139,250,0.1)" },
  { id: "applied",    label: "Applied",     color: "#60A5FA", bg: "rgba(96,165,250,0.1)"  },
  { id: "shortlisted",label: "Shortlisted", color: "#22D3EE", bg: "rgba(34,211,238,0.1)"  },
  { id: "interview",  label: "Interview",   color: "#FBBF24", bg: "rgba(251,191,36,0.1)"  },
  { id: "technical",  label: "Technical",   color: "#FB923C", bg: "rgba(251,146,60,0.1)"  },
  { id: "waiting",    label: "Waiting",     color: "#94A3B8", bg: "rgba(148,163,184,0.1)" },
  { id: "offer",      label: "Offer",       color: "#34D399", bg: "rgba(52,211,153,0.1)"  },
  { id: "rejected",   label: "Rejected",    color: "#F87171", bg: "rgba(248,113,113,0.1)" },
  { id: "archived",   label: "Archived",    color: "#64748B", bg: "rgba(100,116,139,0.1)" },
];

export const METHODS = ["LinkedIn","Company Website","Email","Referral","Job Board","Other"];

export const INDUSTRIES = ["Technology","Finance","Healthcare","Education","E-commerce","Media","Consulting","Startup","Other"];

export const TIMELINE_ICONS: Record<string, string> = {
  applied:"ti-send", upload:"ti-upload", followup:"ti-mail",
  interview:"ti-calendar-event", rejected:"ti-x", shortlisted:"ti-star", offer:"ti-check",
};

export const TIMELINE_COLORS: Record<string, string> = {
  applied:"#818CF8", upload:"#60A5FA", followup:"#FBBF24",
  interview:"#34D399", rejected:"#F87171", shortlisted:"#22D3EE", offer:"#34D399",
};

// export const MOCK_APPS = [
//   { id:1, company:"Stripe", position:"Senior Frontend Engineer", industry:"Finance", dateApplied:"2025-01-10", status:"interview" as const, method:"LinkedIn", url:"https://stripe.com/jobs", contact:"talent@stripe.com", followUp:"2025-06-20", location:"Remote", salary:"$180k–220k", notes:"Great culture fit. Referred by Alex.", attachments:[{name:"CV_v3.pdf",type:"cv" as const,size:"245 KB"},{name:"Cover_Stripe.pdf",type:"cover" as const,size:"98 KB"}], timeline:[{date:"2025-01-10",event:"Application submitted",type:"applied" as const},{date:"2025-01-15",event:"Interview invitation received",type:"interview" as const}]},
//   { id:2, company:"Linear", position:"Product Engineer", industry:"Technology", dateApplied:"2025-01-08", status:"technical" as const, method:"Company Website", url:"https://linear.app/careers", contact:"jobs@linear.app", followUp:"2025-06-18", location:"San Francisco", salary:"$160k–190k", notes:"Love the product.", attachments:[{name:"CV_v2.pdf",type:"cv" as const,size:"230 KB"}], timeline:[{date:"2025-01-08",event:"Application submitted",type:"applied" as const}]},
//   { id:3, company:"Vercel", position:"Staff Engineer", industry:"Technology", dateApplied:"2025-01-05", status:"waiting" as const, method:"Referral", url:"https://vercel.com/careers", contact:"hr@vercel.com", followUp:"2025-06-22", location:"Remote", salary:"$200k–240k", notes:"Referred by Sarah.", attachments:[{name:"CV_v3.pdf",type:"cv" as const,size:"245 KB"}], timeline:[{date:"2025-01-05",event:"Application submitted",type:"applied" as const}]},
//   { id:4, company:"Notion", position:"Frontend Engineer", industry:"Technology", dateApplied:"2024-12-28", status:"rejected" as const, method:"LinkedIn", url:"", contact:"", followUp:"", location:"New York, NY", salary:"", notes:"Good experience.", attachments:[], timeline:[{date:"2024-12-28",event:"Application submitted",type:"applied" as const},{date:"2025-01-06",event:"Rejection received",type:"rejected" as const}]},
//   { id:5, company:"Figma", position:"UI Engineer", industry:"Technology", dateApplied:"2025-01-12", status:"applied" as const, method:"Company Website", url:"https://figma.com/careers", contact:"", followUp:"2025-06-25", location:"San Francisco", salary:"$170k–200k", notes:"", attachments:[{name:"CV_v3.pdf",type:"cv" as const,size:"245 KB"}], timeline:[{date:"2025-01-12",event:"Application submitted",type:"applied" as const}]},
//   { id:6, company:"Raycast", position:"React Native Engineer", industry:"Technology", dateApplied:"2025-01-14", status:"shortlisted" as const, method:"Email", url:"", contact:"team@raycast.com", followUp:"2025-06-21", location:"Remote (EU)", salary:"€100k–130k", notes:"Dream company.", attachments:[{name:"CV_v3.pdf",type:"cv" as const,size:"245 KB"},{name:"CL_Raycast.pdf",type:"cover" as const,size:"88 KB"}], timeline:[{date:"2025-01-14",event:"Application submitted",type:"applied" as const}]},
// ];
