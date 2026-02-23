import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";

export interface SocialLink {
    icon: IconType;
    href: string;
    label: string;
}

export const socialLinks: SocialLink[] = [
    { icon: FiGithub, href: "https://github.com/ruturaj45", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/ruturaj-barik-083a9425b/", label: "LinkedIn" },
    { icon: FaXTwitter, href: "https://x.com/ruturajbarik45", label: "X (Twitter)" },
    { icon: FiMail, href: "mailto:ruturajxbarik@gmail.com", label: "Email" },
];
