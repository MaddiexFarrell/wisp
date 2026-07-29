export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Maddie has been an incredible creative partner for Arceus. She helped define our brand, presenting our modern approach to legal in a way that feels premium, approachable, and easy to understand. Every detail felt intentional, and the final result elevated how we present ourselves.",
    name: "Mac",
    role: "Founder & CEO",
    company: "Arceus",
  },
  {
    quote:
      "Working with Maddie has been a fantastic experience. She helped us present our platform in a way that feels modern, trustworthy, and easy to understand. The new website gave more confidence in how we present Cara to customers.",
    name: "Vic",
    role: "Co-founder & CEO",
    company: "Cara",
  },
  {
    quote:
      "Maddie was refreshingly honest from the start. She explained that our website felt generic and wasn't helping us stand out in a crowded market. Looking back, she was completely right. The new site has given us far more confidence and has become a much more effective part of our sales process.",
    name: "Brian",
    role: "Founder & CEO",
    company: "Vector",
  },
];
