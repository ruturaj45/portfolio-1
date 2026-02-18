import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";

export interface SocialLink {
    icon: IconType;
    href: string;
    label: string;
}

export const socialLinks: SocialLink[] = [
    { icon: FiGithub, href: "https://github.com/vyagh", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/shubham-vy", label: "LinkedIn" },
    { icon: FaXTwitter, href: "https://x.com/vyagh_vy", label: "X (Twitter)" },
    { icon: FiMail, href: "mailto:vyagh.vy@gmail.com", label: "Email" },
];
