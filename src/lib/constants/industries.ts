import {
    ShoppingCart,
    User,
    MapPin,
    Cloud,
    Building,
    Stethoscope,
    GraduationCap,
} from "lucide-react";

export const blockClusters = [
    { 
        id: 0, 
        blocks: [[0, 0, 2], [1, 0, 2], [2, 0, 2]], 
        name: "D2C / E-commerce Brands", 
        icon: ShoppingCart, 
        emoji: "🛍️",
        labelPos: { x: -350, y: -220 },
        subNiches: ["Fashion & apparel", "Skincare / beauty", "Supplements", "Jewelry", "Pet products"]
    },
    { 
        id: 1, 
        blocks: [[2, 0, 1], [2, 0, 0]], 
        name: "Personal Brands & Coaches", 
        icon: User, 
        emoji: "🌟",
        labelPos: { x: 350, y: -150 } 
    },
    { 
        id: 2, 
        blocks: [[2, 1, 0], [2, 2, 0]], 
        name: "Local Service Businesses", 
        icon: MapPin, 
        emoji: "📍",
        labelPos: { x: 350, y: 150 } 
    },
    { 
        id: 3, 
        blocks: [[2, 2, 1], [2, 2, 2]], 
        name: "SaaS Companies", 
        icon: Cloud, 
        emoji: "💻",
        labelPos: { x: 50, y: 350 } 
    },
    { 
        id: 4, 
        blocks: [[1, 2, 2], [0, 2, 2]], 
        name: "Real Estate Developers", 
        icon: Building, 
        emoji: "🏢",
        labelPos: { x: -250, y: 330 } 
    },
    { 
        id: 5, 
        blocks: [[0, 2, 1], [0, 2, 0]], 
        name: "Healthcare Clinics", 
        icon: Stethoscope, 
        emoji: "🏥",
        labelPos: { x: -400, y: 120 } 
    },
    { 
        id: 6, 
        blocks: [[0, 1, 0], [0, 0, 0], [0, 0, 1]], 
        name: "High-Ticket Education", 
        icon: GraduationCap, 
        emoji: "🎓",
        labelPos: { x: 200, y: -280 } 
    },
];
