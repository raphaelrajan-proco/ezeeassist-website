// Single source of truth for team members used on the About page.
// TODO: Replace /headshots/ paths with actual photos once available.

export interface TeamMember {
  name: string;
  title: string;
  initials: string;
  image: string;
  linkedin: string;
}

export const teamMembers: TeamMember[] = [
  { name: "Moshood Awari-Yusuf", title: "Sr. Software Engineer",  initials: "MA", image: "/headshots/moshood-awari-yusuf.jpg",  linkedin: "#" },
  { name: "Gabe Cadamuro",       title: "Co-founder & CTO",       initials: "GC", image: "/headshots/gabe-cadamuro.jpg",          linkedin: "#" },
  { name: "Samuel Chen",         title: "Software Engineer",       initials: "SC", image: "/headshots/samuel-chen.jpg",            linkedin: "#" },
  { name: "Greg Hatt",           title: "Sr. Software Engineer",  initials: "GH", image: "/headshots/greg-hatt.jpg",              linkedin: "#" },
  { name: "Gurkaran Kahlon",     title: "Sr. Software Engineer",  initials: "GK", image: "/headshots/gurkaran-kahlon.jpg",        linkedin: "#" },
  { name: "Shashwath Krishna",   title: "Sr. ML Engineer",        initials: "SK", image: "/headshots/shashwath-krishna.jpg",      linkedin: "#" },
  { name: "Shray Mehra",         title: "Co-founder & COO",       initials: "SM", image: "/headshots/shray-mehra.jpg",            linkedin: "#" },
  { name: "Bborie Park",         title: "Head of Engineering",    initials: "BP", image: "/headshots/bborie-park.jpg",            linkedin: "#" },
  { name: "Raphael Rajan",       title: "Co-founder & CEO",       initials: "RR", image: "/headshots/raphael-rajan.jpg",          linkedin: "#" },
  { name: "Jolomi Tosanwumi",    title: "ML Engineer",            initials: "JT", image: "/headshots/jolomi-tosanwumi.jpg",       linkedin: "#" },
  // ── Placeholder entries ────────────────────────────────────
  { name: "Team Member 11",      title: "Title TBD",              initials: "TM", image: "/headshots/team-member-11.jpg",         linkedin: "#" },
  { name: "Team Member 12",      title: "Title TBD",              initials: "TM", image: "/headshots/team-member-12.jpg",         linkedin: "#" },
];
