export interface Program {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  goalAmount: number;
  raisedAmount: number;
  imagePlaceholder: string;
  category: string;
}

const initialPrograms: Program[] = [
  {
    id: "clean-water-initiative",
    title: "Clean Water Initiative",
    description: "Providing safe and clean drinking water to remote villages.",
    longDescription: "Our Clean Water Initiative builds sustainable wells and water purification systems in communities that lack access to basic sanitation. By funding this program, you directly contribute to reducing waterborne diseases and improving overall community health.",
    goalAmount: 50000,
    raisedAmount: 32500,
    imagePlaceholder: "/images/clean-water.png",
    category: "Health & Sanitation"
  },
  {
    id: "education-for-all",
    title: "Education for All",
    description: "Supplying books, uniforms, and essential school supplies to underprivileged children.",
    longDescription: "Education for All aims to break the cycle of poverty by providing marginalized children with the tools they need to succeed in school. Your donation pays for textbooks, school uniforms, and teacher training programs in developing regions.",
    goalAmount: 100000,
    raisedAmount: 85000,
    imagePlaceholder: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    category: "Education"
  },
  {
    id: "disaster-relief-fund",
    title: "Global Disaster Relief",
    description: "Immediate response and support for communities affected by natural disasters.",
    longDescription: "When disaster strikes, every second counts. The Global Disaster Relief fund ensures that our emergency response teams can deploy instantly with food, shelter, and medical supplies to areas hit by earthquakes, hurricanes, and floods.",
    goalAmount: 75000,
    raisedAmount: 15000,
    imagePlaceholder: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    category: "Emergency"
  },
  {
    id: "sustainable-agriculture",
    title: "Sustainable Agriculture",
    description: "Empowering local farmers with modern, eco-friendly farming techniques.",
    longDescription: "We partner with local farmers to teach sustainable agricultural practices that increase crop yields while protecting the environment. This program provides seeds, tools, and education to help communities achieve food security.",
    goalAmount: 40000,
    raisedAmount: 28000,
    imagePlaceholder: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    category: "Livelihood"
  },
  {
    id: "healthcare-access",
    title: "Healthcare Access Program",
    description: "Funding mobile clinics and vital medical supplies in rural areas.",
    longDescription: "The Healthcare Access Program operates mobile medical units that travel to isolated communities, offering free check-ups, vaccinations, and essential medicines. We believe healthcare is a human right, not a privilege.",
    goalAmount: 120000,
    raisedAmount: 95000,
    imagePlaceholder: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    category: "Health & Sanitation"
  },
  {
    id: "women-empowerment",
    title: "Women's Empowerment",
    description: "Supporting women-led microbusinesses through training and micro-loans.",
    longDescription: "Our Women's Empowerment initiative provides female entrepreneurs with the capital and business training required to start their own enterprises. Empowering a woman uplifts her entire family and transforms her community.",
    goalAmount: 60000,
    raisedAmount: 42000,
    imagePlaceholder: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    category: "Livelihood"
  }
];

declare global {
  var mockPrograms: Program[] | undefined;
}

if (!global.mockPrograms) {
  global.mockPrograms = initialPrograms;
}

export function getPrograms(): Program[] {
  return global.mockPrograms || [];
}

export function getProgram(id: string): Program | undefined {
  return (global.mockPrograms || []).find((p) => p.id === id);
}

// For compatibility during refactor, we still export mockPrograms as a getter-like fallback,
// but pages should ideally use getPrograms() to ensure they get the freshest reference.
export const mockPrograms = global.mockPrograms;
